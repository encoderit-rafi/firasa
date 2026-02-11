import { Apple, FacebookFilled, Google } from "@/assets/icons";
import OAuth from "@/components/blocks/oauth";

import TextSeparator from "@/components/ui/text-separator";

import Link from "next/link";
import SignupForm from "./_component/SignupForm";

export default function SignUpPage() {
  return (
    <section className="section space-y-8 md:space-y-16">
      <h1>Sign up to Firasa</h1>
      <div className="px-4">
        <div className="container-xs flex flex-col gap-6">
          <OAuth />

          <TextSeparator />
          <SignupForm />
          <div className="flex-center gap-1 md:gap-3 body-large-primary text-outline mt-16">
            <div className="">
              Already have an account?{" "}
              <Link href="/sign-in" className="hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
