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
    <section className="section">
      <h6 className="section-label">Pricing</h6>
      <h2 className="section-title">Start free. Go deeper with pro.</h2>
      <p className="section-description">
        Get your Big 5 score for free — unlock deeper insights when you’re
        ready.
      </p>

      <div className="container-md mt-8 lg:mt-16 space-y-6 mx-auto">
        <Tabs defaultValue="overview">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-center border rounded-t-lg lg:text-end py-4">
                  <p className="headline-small-emphasized">Free</p>
                  <p className="title-small-emphasized text-outline">
                    No sign-up.
                    <br />
                    No credit card.
                  </p>
                  <p className="mt-8 text-center display-large-emphasized text-error-container">
                    $0
                  </p>
                </TableHead>
                <TableHead className="text-center  bg-red-50 rounded-t-lg py-4 max-lg:hidden">
                  <p className="headline-small-emphasized">Pro</p>
                  <p className="text-outline title-small-emphasized">
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
                  <TableCell className="">
                    {/* {invoice.totalAmount} */}
                    <div
                      className={cn(
                        "size-6 rounded-full flex items-center justify-center bg-gradient",
                      )}
                    >
                      <Check className="text-white" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:block text-center bg-red-50">
                    <TabsContent value="overview">
                      {invoice.totalAmount}
                    </TabsContent>
                    <TabsContent value="analytics">
                      {invoice.totalAmount}
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
    </section>
  );
}
