import { Apple, FacebookFilled, Google } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon } from "lucide-react";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign in to Firasa</h1>
      <div className="mt-10 flex flex-col gap-4 max-w-md mx-auto">
        <Button variant="outline-variant" size="md">
          <Google />
          Continue with Google
        </Button>
        <Button variant="outline-variant" size="md">
          <Apple />
          Continue with Apple
        </Button>
        <Button variant="outline-variant" size="md">
          <FacebookFilled />
          Continue with Facebook
        </Button>
        <div
          className="relative flex items-center text-sm text-gray-500
            before:content-[''] before:flex-1 before:border-t before:border-error-container
            after:content-[''] after:flex-1 after:border-t after:border-error-container"
        >
          <span className="px-3">OR</span>
        </div>
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
        <div className="flex-center gap-3 body-large-primary text-outline">
          <div className="">Forgot Password?</div>
          <div className="w-px h-4 bg-error-container"></div>
          <div className="">Don’t have account? Sign up</div>
        </div>
      </div>
    </div>
  );
}
