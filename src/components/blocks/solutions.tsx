import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const solutions = [
  {
    title: "Facial action coding system (FACS)",
    description:
      "A globally used system that breaks facial movement into measurable action units.",
  },
  {
    title: "Big 5 personality mapping",
    description:
      "The most trusted personality framework in psychology and behavioral science.",
  },
  {
    title: "AI-powered facial motion analysis",
    description:
      "Our AI reads timing, intensity, and patterns in natural facial movement from video.",
  },
  {
    title: "Firasa (Arabic heritage)",
    description:
      "An ancient discipline that studied personality through facial expressions and behavior.",
  },
];
export default function Solutions() {
  return (
    <section className="section bg-error-container/16">
      <h6 className="section-label">Solutions</h6>
      <h2 className="section-title">
        {" "}
        Built on real psychology. Powered by AI.
      </h2>
      <p className="section-description">
        We combine proven personality science with modern AI — no guesswork.
      </p>
      <div className="px-4">
        <div className="container-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-16">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-none shadow-none w-full">
              <CardContent>
                <div className="aspect-video bg-secondary/10 rounded-xl"></div>
                <div className="space-y-6 mt-4 lg:mt-8">
                  <h3 className="text-left">{solution.title}</h3>
                  <p className="text-left">{solution.description}</p>
                  <Button
                    variant={"ghost"}
                    className="w-fit p-0 hover:shadow-none text-error"
                  >
                    Learn more
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-on-surface p-8 w-fit mt-8 lg:mt-16 rounded-xl mx-auto flex flex-col lg:justify-center lg:flex-row gap-6">
          {/* <div className="flex flex-col lg:justify-center lg:flex-row gap-6">
          </div> */}
          <AvatarGroup>
            <Avatar size="xl">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar size="xl">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <div className="">
            <h3 className="text-white title-large-emphasized text-left">
              Trusted by 12,000+ users exploring their personality.
            </h3>
            <p className="text-outline title-small-emphasized text-left">
              Trusted by 12,000+ users exploring their personality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
