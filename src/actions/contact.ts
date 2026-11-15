"use server";

import { headers } from "next/headers";
import { sendContactEmail } from "@/lib/mail";
import { isRateLimited } from "@/lib/rate-limit";

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "success" | "invalid" | "rateLimited" | "error";
  fields: ContactFields;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readFields(formData: FormData): ContactFields {
  const read = (key: string) => String(formData.get(key) ?? "").trim();
  return { name: read("name"), email: read("email"), message: read("message") };
}

function isValid({ name, email, message }: ContactFields) {
  return (
    name.length >= 2 &&
    name.length <= 100 &&
    email.length <= 200 &&
    emailPattern.test(email) &&
    message.length >= 10 &&
    message.length <= 5000
  );
}

async function getClientIp() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function sendMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  const fields = readFields(formData);
  const cleared = { name: "", email: "", message: "" };

  if (formData.get("company")) return { status: "success", fields: cleared };
  if (!isValid(fields)) return { status: "invalid", fields };
  if (isRateLimited(await getClientIp())) return { status: "rateLimited", fields };

  try {
    await sendContactEmail(fields);
    return { status: "success", fields: cleared };
  } catch (error) {
    console.error("Failed to send contact email.", error);
    return { status: "error", fields };
  }
}
