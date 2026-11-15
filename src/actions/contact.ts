"use server";

import { headers } from "next/headers";
import { sendContactEmail } from "@/lib/mail";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "success" | "invalid" | "rateLimited" | "verificationFailed" | "error";
  fields: ContactFields;
  submittedAt: number;
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
    email.length <= 254 &&
    emailPattern.test(email) &&
    message.length >= 10 &&
    message.length <= 5000
  );
}

async function getClientIp() {
  return (await headers()).get("x-real-ip") ?? "unknown";
}

export async function sendMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  const fields = readFields(formData);
  const cleared = { name: "", email: "", message: "" };
  const result = (status: ContactState["status"], keep = true): ContactState => ({
    status,
    fields: keep ? fields : cleared,
    submittedAt: Date.now(),
  });

  if (formData.get("company")) return result("success", false);
  if (!isValid(fields)) return result("invalid");

  const ip = await getClientIp();
  if (isRateLimited(ip)) return result("rateLimited");

  const token = String(formData.get("cf-turnstile-response") ?? "");
  if (!(await verifyTurnstile(token, ip === "unknown" ? undefined : ip))) {
    return result("verificationFailed");
  }

  try {
    await sendContactEmail(fields);
    return result("success", false);
  } catch (error) {
    console.error("Failed to send contact email.", error);
    return result("error");
  }
}
