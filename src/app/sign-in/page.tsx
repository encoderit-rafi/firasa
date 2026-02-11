"use client";
import OAuth from "@/components/blocks/oauth";
import TextSeparator from "@/components/ui/text-separator";
import Link from "next/link";
import FormSignIn from "./_components/form-sign-in";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <section className="section space-y-8 md:space-y-16">
      <h1>Sign in to Firasa</h1>
      <div className="px-4">
        <div className="container-xs flex flex-col gap-6">
          <OAuth />
          <TextSeparator />
          <FormSignIn />
          <div className="flex-center gap-1 md:gap-3 body-large-primary text-outline mt-16">
            <Link href="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
            <div className="w-px h-4 bg-error-container"></div>
            <div className="">
              Don’t have account?{" "}
              <Link href="/sign-up" className="hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
