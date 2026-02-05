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
        <div className="container-md mt-8 lg:mt-16 space-y-6 mx-auto">
          <Tabs defaultValue="overview">
            <Table className="max-md:hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className=""></TableHead>
                  <TableHead className="text-center pt-8! lg:text-end py-4">
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
                  <TableHead className="text-center  bg-red-50 pt-8! rounded-t-3xl py-4">
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
                      <div
                        className={cn(
                          "size-6 rounded-full mx-auto bg-gradient",
                        )}
                      >
                        <Check className="text-white" />
                      </div>
                    </TableCell>
                    <TableCell className=" text-center bg-red-50">
                      <TabsContent value="overview">
                        <div
                          className={cn(
                            "size-6 rounded-full mx-auto bg-gradient",
                          )}
                        >
                          <Check className="text-white" />
                        </div>
                      </TabsContent>
                      <TabsContent value="analytics">
                        <div
                          className={cn(
                            "size-6 rounded-full mx-auto bg-gradient",
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
                  <TableCell className="text-center pb-8">
                    <Button variant="outline">Get free score</Button>
                  </TableCell>
                  <TableCell
                    className={" text-center pb-8 rounded-b-3xl bg-red-50"}
                  >
                    <Button variant="black">Unlock pro report</Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="md:hidden space-y-6">
              <div className="border border-error-container py-8 rounded-3xl overflow-hidden">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center py-4" colSpan={2}>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow key={index} className="">
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="">
                          <div
                            className={cn(
                              "size-6 rounded-full ml-auto lg:mx-auto bg-gradient",
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
                      className="text-center bg-red-50 pt-8! rounded-t-3xl py-4"
                      colSpan={2}
                    >
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
                      <TableCell className="bg-red-50">
                        {invoice.paymentMethod}
                      </TableCell>
                      <TableCell className="text-center bg-red-50">
                        <TabsContent value="overview">
                          <div
                            className={cn(
                              "size-6 rounded-full ml-auto lg:mx-auto bg-gradient",
                            )}
                          >
                            <Check className="text-white" />
                          </div>
                        </TabsContent>
                        <TabsContent value="analytics">
                          <div
                            className={cn(
                              "size-6 rounded-full ml-auto lg:mx-auto bg-gradient",
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
                      className={"text-center rounded-b-3xl pb-8 bg-red-50"}
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
