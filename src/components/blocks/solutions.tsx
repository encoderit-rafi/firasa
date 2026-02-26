"use client";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useTranslation } from "react-i18next";

export default function Solutions() {
  const { t } = useTranslation();

  const solutions = [
    {
      title: t("solution_facs_title"),
      description: t("solution_facs_desc"),
    },
    {
      title: t("solution_big5_title"),
      description: t("solution_big5_desc"),
    },
    {
      title: t("solution_ai_title"),
      description: t("solution_ai_desc"),
    },
    {
      title: t("solution_firasa_title"),
      description: t("solution_firasa_desc"),
    },
  ];

  return (
    <section id="solution" className="section bg-error-container/16 px-4">
      <h6 className="section-label">{t("solutions_label")}</h6>
      <h2 className="section-title">{t("solutions_title")}</h2>
      <p className="section-description">{t("solutions_description")}</p>

      <div className="container-md mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-y-16">
        {solutions.map((solution, index) => (
          <Card key={index} className="w-full border-none shadow-none">
            <CardContent>
              <div className="bg-secondary/10 aspect-video rounded-xl"></div>
              <div className="mt-4 space-y-6 lg:mt-8">
                <h3 className="text-left">{solution.title}</h3>
                <p className="text-left">{solution.description}</p>
                <Button
                  variant={"ghost"}
                  className="text-error w-fit p-0 hover:shadow-none"
                >
                  {t("learn_more")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="box-black mx-auto mt-8 flex w-fit flex-col gap-6 p-8 md:flex-row md:justify-center lg:mt-16">
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
          <h3 className="title-large-emphasized text-left text-white">
            {t("trusted_by")}
          </h3>
          <p className="text-outline title-small-emphasized text-left">
            {t("trusted_by")}
          </p>
        </div>
      </div>
    </section>
  );
}
