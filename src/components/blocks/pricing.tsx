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
        "flex h-6 w-6 items-center justify-center rounded-full",
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
      <div className="px-4">
        <div className="container-sm mx-auto mt-8 space-y-6 lg:mt-16">
          <Tabs defaultValue="overview">
            <Table className="max-md:hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className=""></TableHead>
                  <TableHead className="py-4 pt-8! text-center lg:text-end">
                    <p className="headline-small-emphasized">Free</p>
                    <p className="title-small-emphasized text-outline">
                      No sign-up.
                      <br />
                      No credit card.
                    </p>
                    <p className="display-large-emphasized text-error-container mt-8 text-center">
                      $0
                    </p>
                  </TableHead>
                  <TableHead className="rounded-t-3xl bg-red-50 py-4 pt-8! text-center">
                    <p className="headline-small-emphasized">Pro</p>
                    <p className="text-outline title-small-emphasized">
                      Made for sharing.
                      <br />
                      Built for self-growth.
                    </p>
                    <p className="bg-gradient display-large-emphasized bg-clip-text text-transparent">
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
                      <div
                        className={cn(
                          "bg-gradient mx-auto size-6 rounded-full",
                        )}
                      >
                        <Check className="text-white" />
                      </div>
                    </TableCell>
                    <TableCell className="bg-red-50 text-center">
                      <TabsContent value="overview">
                        <div
                          className={cn(
                            "bg-gradient mx-auto size-6 rounded-full",
                          )}
                        >
                          <Check className="text-white" />
                        </div>
                      </TabsContent>
                      <TabsContent value="analytics">
                        <div
                          className={cn(
                            "bg-gradient mx-auto size-6 rounded-full",
                          )}
                        >
                          <Check className="text-white" />
                        </div>
                      </TabsContent>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-none bg-transparent">
                <TableRow>
                  <TableCell className=""></TableCell>
                  <TableCell className="pb-8 text-center">
                    <Button variant="outline">Get free score</Button>
                  </TableCell>
                  <TableCell
                    className={"rounded-b-3xl bg-red-50 pb-8 text-center"}
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
                      <TableHead className="py-4 text-center" colSpan={2}>
                        <p className="headline-small-emphasized">Free</p>
                        <p className="title-small-emphasized text-outline">
                          No sign-up.
                          <br />
                          No credit card.
                        </p>
                        <p className="display-large-emphasized text-error-container mt-8 text-center">
                          $0
                        </p>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow key={index} className="">
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="">
                          <div
                            className={cn(
                              "bg-gradient ml-auto size-6 rounded-full lg:mx-auto",
                            )}
                          >
                            <Check className="text-white" />
                          </div>
                        </TableCell>
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
                      <p className="headline-small-emphasized">Pro</p>
                      <p className="text-outline title-small-emphasized">
                        Made for sharing.
                        <br />
                        Built for self-growth.
                      </p>
                      <p className="bg-gradient display-large-emphasized bg-clip-text text-transparent">
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
                      <TableCell className="bg-red-50">
                        {invoice.paymentMethod}
                      </TableCell>
                      <TableCell className="bg-red-50 text-center">
                        <TabsContent value="overview">
                          <div
                            className={cn(
                              "bg-gradient ml-auto size-6 rounded-full lg:mx-auto",
                            )}
                          >
                            <Check className="text-white" />
                          </div>
                        </TabsContent>
                        <TabsContent value="analytics">
                          <div
                            className={cn(
                              "bg-gradient ml-auto size-6 rounded-full lg:mx-auto",
                            )}
                          >
                            <Check className="text-white" />
                          </div>
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
      </div>
    </section>
  );
}
