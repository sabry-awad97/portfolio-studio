import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  sectionVariants,
  typographyVariants,
  paddingVariants,
} from "@/lib/responsive-classes";

export function CTASection() {
  return (
    <section
      id="freelance"
      className={cn(
        sectionVariants({ spacing: "lg", container: "constrained" }),
      )}
    >
      <Card className="rounded-3xl bg-white">
        <CardContent className={cn(paddingVariants({ size: "xl" }))}>
          <div className="flex flex-col items-center text-center space-y-6">
            <h2
              className={cn(
                typographyVariants({ variant: "h1", weight: "extrabold" }),
                "text-primary",
              )}
            >
              Looking For Freelancer?
            </h2>
            <p
              className={cn(
                typographyVariants({ variant: "body" }),
                "text-gray-800 max-w-2xl",
              )}
            >
              I have spent enough time with simple and complex full-fledged
              projects. I have created apps, websites, scripts and have also
              coded and deployed admin panels and database/backend on cloud. I
              love to take on new challenges and work on experimental projects.
              <br />
              Let us discuss more about your work.
            </p>
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 transition-all hover:px-12 min-h-[48px]"
              asChild
            >
              <a
                href="mailto:iprincepatel22@gmail.com"
                aria-label="Send email to discuss freelance work"
              >
                Send an Email
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
