import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const IsChecked = (value: boolean) => {
  const bg = value ? "bg-gradient" : "bg-error-container";
  return (
    <div
      className={cn(
        bg,
        "w-6 h-6 rounded-full flex items-center justify-center",
      )}
    >
      {value ? (
        <Check className="text-white" />
      ) : (
        <Close className="text-white" />
      )}
    </div>
  );
};
const invoices = [
  {
    totalAmount: IsChecked(true),
    paymentMethod: "Credit Card",
  },
  {
    totalAmount: IsChecked(false),
    paymentMethod: "PayPal",
  },
  {
    totalAmount: IsChecked(true),
    paymentMethod: "Bank Transfer",
  },
  {
    totalAmount: IsChecked(false),
    paymentMethod: "Credit Card",
  },
  {
    totalAmount: IsChecked(true),
    paymentMethod: "PayPal",
  },
  {
    totalAmount: IsChecked(false),
    paymentMethod: "Bank Transfer",
  },
  {
    totalAmount: IsChecked(true),
    paymentMethod: "Credit Card",
  },
];

import {
  Section,
  SectionDescription,
  SectionLabel,
  SectionTitle,
} from "../ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
// import { Check } from "lucide-react";
import { Check, Close } from "@/assets/icons";

export default function Pricing() {
  return (
    <Section className="space-y-6">
      <div className="text-center">
        <SectionLabel>Pricing</SectionLabel>
        <SectionTitle className="mt-6">
          Start free. Go deeper with pro.{" "}
        </SectionTitle>
        <SectionDescription>
          Get your Big 5 score for free — unlock deeper insights when you’re
          ready.{" "}
        </SectionDescription>
      </div>
      <div className="container-md space-y-6 mx-auto">
        <Tabs defaultValue="overview">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden lg:block"></TableHead>
                <TableHead className="text-center lg:text-end py-4">
                  <p className="text-center headline-small-emphasized">Free</p>
                  <p className="text-center text-outline title-small-emphasized">
                    No sign-up.
                    <br />
                    No credit card.
                  </p>
                  <p className="text-tertiary-container mt-8 text-center display-large-emphasized">
                    $0
                  </p>
                </TableHead>
                <TableHead className="text-center bg-red-50 rounded-t-lg py-4 max-lg:hidden">
                  <p className="text-center headline-small-emphasized">Pro</p>
                  <p className="text-center text-outline title-small-emphasized">
                    Made for sharing.
                    <br />
                    Built for self-growth.
                  </p>
                  <p className="text-transparent bg-clip-text bg-gradient display-large-emphasized">
                    $79
                  </p>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={index} className="">
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-center">
                    {invoice.totalAmount}
                  </TableCell>
                  <TableCell className="hidden lg:block text-center bg-red-50">
                    <TabsContent value="overview">
                      {invoice.totalAmount}
                    </TabsContent>
                    <TabsContent value="analytics">
                      {invoice.totalAmount}aa
                    </TabsContent>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="border-none bg-transparent">
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="text-center">
                  <Button variant="outline">Get free score</Button>
                </TableCell>
                <TableCell
                  className={
                    "hidden lg:block text-center bg-red-50 rounded-b-lg"
                  }
                >
                  <Button variant="black">Unlock pro report</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Tabs>
      </div>
    </Section>
  );
}
