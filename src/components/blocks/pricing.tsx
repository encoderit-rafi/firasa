import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableDescription,
  TableFooter,
  TableHead,
  TableHeader,
  TableHeading,
  TablePrice,
  TableRow,
} from "@/components/ui/table";
const IsChecked = (value: boolean) => {
  const bg = value ? "bg-gradient" : "bg-error-container";
  return (
    <div className={cn(bg, "flex-center mx-auto size-6 rounded-full p-0.5")}>
      {value ? (
        <Check className="text-white" />
      ) : (
        <Close className="text-white" />
      )}
    </div>
  );
};
const prices = [
  {
    title: "5-second video analysis",
    plan: {
      free: IsChecked(true),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Big 5 personality scores",
    plan: {
      free: IsChecked(true),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Automatic video deletion",
    plan: {
      free: IsChecked(true),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Deep trait insights",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Scientific reasoning",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Your personality story",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Growth & improvement plan",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Compatibility profile",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(true),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Famous personalities like you",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(false),
        annual: IsChecked(true),
      },
    },
  },
  {
    title: "Shareable social cards",
    plan: {
      free: IsChecked(false),
      pro: {
        monthly: IsChecked(false),
        annual: IsChecked(true),
      },
    },
  },
];

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
// import { Check } from "lucide-react";
import { Check, Close } from "@/assets/icons";
function FreeHeading() {
  return (
    // <TableHead className="w-1/3! bg-amber-600 py-4 pt-8! text-center md:w-full!">
    <div className="flex w-full flex-col items-center justify-between">
      <div className="space-y-3 text-center">
        <TableHeading>Free</TableHeading>
        <TableDescription>
          No sign-up.
          <br />
          No credit card.
        </TableDescription>
      </div>
      <TablePrice variant="muted" className="mt-auto">
        $0
      </TablePrice>
    </div>
    // </TableHead>
  );
}
function ProHeading() {
  return (
    <>
      <TableHeading>Pro</TableHeading>
      <TableDescription>
        Made for sharing.
        <br />
        Built for self-growth.
      </TableDescription>

      <TablePrice variant="default">$79</TablePrice>
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="annual">Annual (Save 10%)</TabsTrigger>
      </TabsList>
    </>
  );
}
export default function Pricing() {
  return (
    <section id="pricing" className="section px-4">
      <h6 className="section-label">Pricing</h6>
      <h2 className="section-title">Start free. Go deeper with pro.</h2>
      <p className="section-description">
        Get your Big 5 score for free — unlock deeper insights when you’re
        ready.
      </p>

      <div className="container-sm mx-auto mt-8 space-y-6 lg:mt-16">
        <Tabs defaultValue="annual">
          <Table className="max-md:hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3!"></TableHead>
                <TableHead className="w-1/3! py-4 pt-8! text-center md:w-full!">
                  <FreeHeading />
                </TableHead>
                <TableHead className="w-1/3! space-y-3 rounded-t-3xl bg-red-50 py-4 pt-8! text-center md:w-full">
                  <ProHeading />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price, index) => (
                <TableRow key={index} className="">
                  <TableCell className="w-1/3!">{price.title}</TableCell>
                  <TableCell className="w-1/3! text-center">
                    {price.plan.free}
                  </TableCell>
                  <TableCell className="w-1/3! bg-red-50 text-center">
                    <TabsContent value="monthly">
                      {price.plan.pro.monthly}
                    </TabsContent>
                    <TabsContent value="annual">
                      {price.plan.pro.annual}
                    </TabsContent>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="border-none bg-transparent">
              <TableRow>
                <TableCell className="w-1/3!"></TableCell>
                <TableCell className="w-1/3! pb-8 text-center">
                  <Button variant="outline">Get free score</Button>
                </TableCell>
                <TableCell
                  className={"w-1/3! rounded-b-3xl bg-red-50 pb-8 text-center"}
                >
                  <Button variant="black">Unlock pro report</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="space-y-6 md:hidden">
            <div className="border-error-container overflow-hidden rounded-3xl border py-8">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center" colSpan={2}>
                      <FreeHeading />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prices.map((price, index) => (
                    <TableRow key={index} className="">
                      <TableCell>{price.title}</TableCell>
                      <TableCell className="">{price.plan.free}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="border-none bg-transparent">
                  <TableRow>
                    <TableCell className="text-center" colSpan={2}>
                      <Button variant="outline">Get free score</Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="rounded-t-3xl bg-red-50 py-4 pt-8! text-center"
                    colSpan={2}
                  >
                    <ProHeading />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((price, index) => (
                  <TableRow key={index} className="">
                    <TableCell className="bg-red-50">{price.title}</TableCell>
                    <TableCell className="bg-red-50 text-center">
                      <TabsContent value="monthly">
                        {price.plan.pro.monthly}
                      </TabsContent>
                      <TabsContent value="annual">
                        {price.plan.pro.annual}
                      </TabsContent>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-none bg-transparent">
                <TableRow>
                  <TableCell
                    className={"rounded-b-3xl bg-red-50 pb-8 text-center"}
                    colSpan={2}
                  >
                    <Button variant="black">Unlock pro report</Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
