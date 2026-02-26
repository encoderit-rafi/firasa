"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableDescription,
  TableFooter,
  TableHead,
  TableHeader,
  TableHeading,
  TablePrice,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, Close } from "@/assets/icons";
import { useTranslation, Trans } from "react-i18next";

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

function FreeHeading() {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="space-y-3 text-center">
        <TableHeading>{t("pricing_free_title")}</TableHeading>
        <TableDescription>
          <Trans i18nKey="pricing_free_desc">
            No sign-up.
            <br />
            No credit card.
          </Trans>
        </TableDescription>
      </div>
      <TablePrice variant="muted" className="mt-auto">
        $0
      </TablePrice>
    </div>
  );
}

function ProHeading() {
  const { t } = useTranslation();
  return (
    <>
      <TableHeading>{t("pricing_pro_title")}</TableHeading>
      <TableDescription>
        <Trans i18nKey="pricing_pro_desc">
          Made for sharing.
          <br />
          Built for self-growth.
        </Trans>
      </TableDescription>

      <TablePrice variant="default">$79</TablePrice>
      <TabsList>
        <TabsTrigger value="monthly">{t("pricing_monthly")}</TabsTrigger>
        <TabsTrigger value="annual">{t("pricing_annual")}</TabsTrigger>
      </TabsList>
    </>
  );
}

export default function Pricing() {
  const { t } = useTranslation();

  const prices = [
    {
      title: t("pricing_feature_video_analysis"),
      plan: {
        free: IsChecked(true),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_big5_scores"),
      plan: {
        free: IsChecked(true),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_auto_deletion"),
      plan: {
        free: IsChecked(true),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_trait_insights"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_scientific_reasoning"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_personality_story"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_growth_plan"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_compatibility"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(true),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_famous_personalities"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(false),
          annual: IsChecked(true),
        },
      },
    },
    {
      title: t("pricing_feature_social_cards"),
      plan: {
        free: IsChecked(false),
        pro: {
          monthly: IsChecked(false),
          annual: IsChecked(true),
        },
      },
    },
  ];

  return (
    <section id="pricing" className="section px-4">
      <h6 className="section-label">{t("pricing_label")}</h6>
      <h2 className="section-title">{t("pricing_title")}</h2>
      <p className="section-description">{t("pricing_desc")}</p>

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
                  <Button variant="outline">
                    {t("pricing_get_free_score")}
                  </Button>
                </TableCell>
                <TableCell
                  className={"w-1/3! rounded-b-3xl bg-red-50 pb-8 text-center"}
                >
                  <Button variant="black">{t("pricing_unlock_pro")}</Button>
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
                      <Button variant="outline">
                        {t("pricing_get_free_score")}
                      </Button>
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
                    <Button variant="black">{t("pricing_unlock_pro")}</Button>
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
