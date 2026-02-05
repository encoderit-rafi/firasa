import { Apple, FacebookFilled, Google } from "@/assets/icons";
import OAuth from "@/components/blocks/oauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import TextSeparator from "@/components/ui/text-separator";
import { EyeOffIcon } from "lucide-react";
import Link from "next/link";
export default function SignInPage() {
  return (
    <section className="section space-y-8 md:space-y-16">
      <h1>Sign in to Firasa</h1>
      <div className="px-4">
        <div className="container-xs flex flex-col gap-6">
          <OAuth />

          <TextSeparator />
          <div className="group relative">
            <label
              className="-translate-y-1/2 absolute start-1 top-0 z-10 block bg-background px-2  text-xs group-has-disabled:opacity-50 body-small-primary text-on-surface-variant"
              // htmlFor={id}
            >
              Email *
            </label>
            <Input
              className="p-4 placeholder:body-large-primary placeholder:text-on-surface-variant"
              placeholder="mail@domain.com"
              type="email"
            />
          </div>
          <div className="group relative">
            <label
              className="-translate-y-1/2 absolute start-1 top-0 z-10 block bg-background px-2  text-xs group-has-disabled:opacity-50 body-small-primary text-on-surface-variant"
              // htmlFor={id}
            >
              Password *
            </label>
            <InputGroup>
              <InputGroupInput
                id="inline-end-input"
                className="p-4 placeholder:body-large-primary placeholder:text-on-surface-variant"
                type="password"
                placeholder="Enter password"
              />
              <InputGroupAddon align="inline-end">
                <EyeOffIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Button>Sign In</Button>
          <div className="flex-center gap-1 md:gap-3 body-large-primary text-outline mt-16">
            <div className="">Forgot Password?</div>
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
