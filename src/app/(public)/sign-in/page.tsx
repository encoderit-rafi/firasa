"use client";
import OAuth from "@/components/blocks/oauth";
import TextSeparator from "@/components/ui/text-separator";
import Link from "next/link";
import FormSignIn from "./_components/form-sign-in";
import { useTranslation } from "react-i18next";

export default function SignInPage() {
  const { t } = useTranslation();
  return (
    <section className="section space-y-8 md:space-y-16">
      <h1>{t("auth_sign_in_title")}</h1>
      <div className="px-4">
        <div className="container-xs flex flex-col gap-6">
          <OAuth />
          <TextSeparator />
          <FormSignIn />
          <div className="flex-center body-large-primary text-outline mt-16 gap-1 md:gap-3">
            <div className="">
              {t("auth_no_account")}{" "}
              <Link href="/sign-up" className="hover:underline">
                {t("auth_sign_up_link")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
