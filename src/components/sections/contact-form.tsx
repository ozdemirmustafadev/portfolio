"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/actions/contact";
import { buttonClass } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { Turnstile } from "./turnstile";

const initialState: ContactState = {
  status: "idle",
  fields: { name: "", email: "", message: "" },
  submittedAt: 0,
};

const fieldClass =
  "w-full rounded-md border border-border bg-background px-3 text-sm transition-colors placeholder:text-muted hover:border-foreground/20 focus:border-foreground/40 focus:outline-none";

type ContactFormProps = {
  labels: Dictionary["contact"]["form"];
  turnstileSiteKey: string;
  language: string;
};

export function ContactForm({ labels, turnstileSiteKey, language }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const feedback = state.status === "idle" ? null : labels[state.status];

  return (
    <form action={formAction} className="relative grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          {labels.name}
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            defaultValue={state.fields.name}
            className={cn(fieldClass, "h-10")}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          {labels.email}
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            defaultValue={state.fields.email}
            className={cn(fieldClass, "h-10")}
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        {labels.message}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          defaultValue={state.fields.message}
          className={cn(fieldClass, "resize-y py-2")}
        />
      </label>

      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileSiteKey && (
        <Turnstile siteKey={turnstileSiteKey} language={language} resetKey={state.submittedAt} />
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={buttonClass("primary")}>
          {pending ? labels.sending : labels.submit}
        </button>
        <p
          role="status"
          className={cn(
            "text-sm",
            state.status === "success" ? "text-foreground" : "text-red-600 dark:text-red-400",
          )}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
