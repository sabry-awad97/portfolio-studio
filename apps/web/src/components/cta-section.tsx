import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export function CTASection() {
  return (
    <section id="freelance" className="max-w-7xl mx-auto px-4 py-10 my-10">
      <Card className="rounded-3xl bg-white">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              Looking For Freelancer?
            </h2>
            <p className="text-gray-700 max-w-2xl text-base">
              I have spent enough time with simple and complex full-fledged
              projects. I have created apps, websites, scripts and have also
              coded and deployed admin panels and database/backend on cloud. I
              love to take on new challenges and work on experimental projects.
              <br />
              Let us discuss more about your work.
            </p>
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-white px-10 transition-all hover:px-12"
              asChild
            >
              <a href="mailto:iprincepatel22@gmail.com">Send an Email</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
