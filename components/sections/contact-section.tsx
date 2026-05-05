"use client";

/**
 * Contact band with silk background and a mailto-powered inquiry form (no server submit).
 * Inputs use 44px min height for touch; glass panel falls back to a stronger fill without backdrop-filter.
 */

import { useId } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { SilkBackground } from "@/components/ui/silk-background";
import { contactCopy } from "@/lib/site-content";

export function ContactSection() {
  const formId = useId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(
      name ? `Private inquiry — ${name}` : contactCopy.mailSubjectFallback
    );
    const body = encodeURIComponent(
      [message, "", name ? `Name: ${name}` : null, email ? `Email: ${email}` : null].filter(Boolean).join("\n")
    );
    window.location.href = `mailto:contact@gaiacapital.com?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="relative isolate min-h-[28rem] overflow-hidden border-t border-white/10 bg-graphite/70 py-28 sm:min-h-[32rem] sm:py-32 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 z-0 min-h-full" aria-hidden>
        <SilkBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-night/40" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div className="max-w-[560px]">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">{contactCopy.eyebrow}</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-4xl leading-[1.04] text-ink sm:text-5xl">
              {contactCopy.title}
            </h2>
            <p className="mt-6 max-w-[58ch] text-sm leading-relaxed text-ink/74 sm:text-base">{contactCopy.body}</p>
            <div className="mt-11 flex flex-wrap items-center gap-5">
              <ButtonLink href="mailto:contact@gaiacapital.com" variant="subtle">
                {contactCopy.primaryButton}
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="linkArrow">
                {contactCopy.secondaryLink}
              </ButtonLink>
            </div>
            <p className="mt-8 text-xs text-ink/55">{contactCopy.footnote}</p>
          </div>

          <div className="rounded-sm border border-white/14 bg-night/70 p-7 shadow-hero-soft backdrop-blur-md supports-[backdrop-filter]:bg-night/35 sm:p-9">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink/48">{contactCopy.panelEyebrow}</p>
            <form id={formId} className="mt-8 space-y-7" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor={`${formId}-name`} className="text-[0.68rem] uppercase tracking-[0.14em] text-ink/55">
                  {contactCopy.labels.name}
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="min-h-[44px] w-full rounded-sm border-0 border-b border-white/18 bg-transparent px-0 py-2.5 text-sm text-ink placeholder:text-ink/35 transition-colors duration-200 focus:border-white/40 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-night/0"
                  placeholder={contactCopy.placeholders.name}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`${formId}-email`} className="text-[0.68rem] uppercase tracking-[0.14em] text-ink/55">
                  {contactCopy.labels.email}
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-h-[44px] w-full rounded-sm border-0 border-b border-white/18 bg-transparent px-0 py-2.5 text-sm text-ink placeholder:text-ink/35 transition-colors duration-200 focus:border-white/40 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-night/0"
                  placeholder={contactCopy.placeholders.email}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`${formId}-message`} className="text-[0.68rem] uppercase tracking-[0.14em] text-ink/55">
                  {contactCopy.labels.message}
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  className="min-h-[44px] w-full resize-y rounded-sm border-0 border-b border-white/18 bg-transparent px-0 py-2.5 text-sm leading-relaxed text-ink placeholder:text-ink/35 transition-colors duration-200 focus:border-white/40 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-night/0"
                  placeholder={contactCopy.placeholders.message}
                />
              </div>
              <div className="pt-2">
                <Button type="submit" variant="subtle" className="min-h-[44px] w-full sm:w-auto">
                  {contactCopy.submit}
                </Button>
                <p className="mt-4 text-xs leading-relaxed text-ink/45">{contactCopy.submitHint}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
