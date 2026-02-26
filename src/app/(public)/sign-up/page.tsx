"use client";
import { Apple, FacebookFilled, Google } from "@/assets/icons";
import OAuth from "@/components/blocks/oauth";

import TextSeparator from "@/components/ui/text-separator";

import Link from "next/link";
import SignupForm from "./_component/SignupForm";
import { useTranslation } from "react-i18next";

export default function SignUpPage() {
  const { t } = useTranslation();
  return (
    <section className="section space-y-8 md:space-y-16">
      <h1>{t("auth_sign_up_title")}</h1>
      <div className="px-4">
        <div className="container-xs flex flex-col gap-6">
          <OAuth />

          <TextSeparator />
          <SignupForm />
          <div className="flex-center body-large-primary text-outline mt-16 gap-1 md:gap-3">
            <div className="">
              {t("auth_already_account")}{" "}
              <Link href="/sign-in" className="hover:underline">
                {t("auth_sign_in_link")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
