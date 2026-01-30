import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Section,
  SectionDescription,
  SectionLabel,
  SectionTitle,
} from "../ui/section";
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
    <Section className="space-y-6 bg-error-container/16">
      <div className="text-center">
        <SectionLabel>Solutions</SectionLabel>
        <SectionTitle className="mt-6">
          Built on real psychology. Powered by AI.
        </SectionTitle>
        <SectionDescription>
          We combine proven personality science with modern AI — no guesswork.
        </SectionDescription>
      </div>
      <div className="container-md space-y-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-8 itc">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-none shadow-none">
              <CardContent className="flex flex-col gap-2">
                <div className="aspect-video bg-secondary/10 rounded-xl"></div>
                <CardTitle className="headline-small-emphasized mt-6 text-on-surface">
                  {solution.title}
                </CardTitle>
                <CardDescription>{solution.description}</CardDescription>
                <Button
                  variant={"ghost"}
                  className="w-fit p-0 hover:shadow-none text-error"
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-on-surface p-3 container-sm mx-auto rounded-md m-1">
          <div className="flex flex-col lg:justify-center lg:flex-row gap-4">
            <AvatarGroup className="">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <div className="">
              <h3 className="text-white title-large-emphasized">
                Trusted by 12,000+ users exploring their personality.
              </h3>
              <p className="text-outline title-small-emphasized">
                Trusted by 12,000+ users exploring their personality.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
