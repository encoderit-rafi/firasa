import {
  Apple,
  Check,
  Close,
  FacebookFilled,
  Google,
  Guard,
} from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import VideoUploader from "@/components/ui/video-uploader";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeOffIcon,
} from "lucide-react";
const steps: {
  // icon: React.FC<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}[] = [
  {
    // icon: One,
    title: "What does Firasa actually do?",
    content:
      "Just look at the camera. Small movements matter. Photos don’t capture personality. Motion does.",
  },
  {
    // icon: Two,
    title: "How long does the analysis take?",
    content:
      "AI analyzes your facial movements to identify patterns and insights. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "Do I have to smile or pose in a special way?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "What happens to my video after analysis?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "Can I re-analyze myself later?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "I’m skeptical; can I get a refund?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
];
export default function UploadPage() {
  return (
    <div>
      <h1>Upload or record video</h1>
      <div className="mt-10 flex flex-col gap-4 max-w-md mx-auto">
        <VideoUploader />
        <div className="">
          <h3 className="text-error title-small-emphasized pb-5 border-b border-b-error-container">
            Do's: Video requirements
          </h3>
          <Accordion
            type="single"
            collapsible
            defaultValue={steps[0].title}
            className="container-sm mx-auto "
          >
            {steps.map((step) => (
              <AccordionItem key={step.title} value={step.title}>
                <AccordionTrigger className="group">
                  <div className="flex items-center justify-between w-full gap-4 headline-small-emphasized ">
                    {/* <step.icon /> */}
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-error flex-center">
                        <Check className="text-on-error size-5" />
                      </div>
                      {step.title}
                    </div>
                    <ChevronRightIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="body-large-primary text-on-surface ">
                    {step.content}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="item-1">
              <AccordionTrigger></AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, it is free to use. You can use it as much as you want.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="">
          <h3 className="text-error title-small-emphasized pb-5 border-b border-b-error-container">
            Don'ts: Video restrictions
          </h3>
          <Accordion
            type="single"
            collapsible
            defaultValue={steps[0].title}
            className="container-sm mx-auto "
          >
            {steps.map((step) => (
              <AccordionItem key={step.title} value={step.title}>
                <AccordionTrigger className="group">
                  <div className="flex items-center justify-between w-full gap-4 headline-small-emphasized ">
                    {/* <step.icon /> */}
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-error-container flex-center">
                        <Close className="text-on-error size-5" />
                      </div>
                      {step.title}
                    </div>
                    <ChevronRightIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="body-large-primary text-on-surface ">
                    {step.content}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="item-1">
              <AccordionTrigger></AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, it is free to use. You can use it as much as you want.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
