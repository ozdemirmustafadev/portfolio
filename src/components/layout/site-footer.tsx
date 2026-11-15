import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { getCurrentYear } from "@/lib/date";
import { SocialLinks } from "./social-links";

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col-reverse gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <SocialLinks className="-ml-2 sm:ml-0" />
      </Container>
    </footer>
  );
}
