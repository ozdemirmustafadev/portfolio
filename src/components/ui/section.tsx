import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Section({ id, title, action, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {action}
        </div>
        {children}
      </Container>
    </section>
  );
}
