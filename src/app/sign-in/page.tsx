"use client";
// import { Apple, FacebookFilled, Google } from "@/assets/icons";
import OAuth from "@/components/blocks/oauth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group";
import TextSeparator from "@/components/ui/text-separator";
// import { EyeOffIcon } from "lucide-react";
import Link from "next/link";
import FormSignIn from "./_components/form-sign-in";
// import { z } from "zod";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Activity } from "react";
// const SignInSchema = z.object({
//   email: z.email("Email is invalid"),
//   password: z.string().min(1, "Password is required"),
// });
// type SignInSchema = z.infer<typeof SignInSchema>;
export default function SignInPage() {
  // const { control, handleSubmit } = useForm<SignInSchema>({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   resolver: zodResolver(SignInSchema),
  // });
  // const onSubmit = (data: SignInSchema) => {
  //   console.log(data);
  // };
  return (
    <section className="section space-y-8 md:space-y-16">
      <h1>Sign in to Firasa</h1>
      <div className="px-4">
        <div className="container-xs flex flex-col gap-6">
          <OAuth />

          <TextSeparator />
          <FormSignIn />
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Email *</FieldLabel>
                    <Input
                      id={field.name}
                      aria-invalid={invalid}
                      placeholder="mail@domain.com"
                      type="email"
                      {...field}
                    />
                    <Activity mode={Boolean(error) ? "visible" : "hidden"}>
                      <FieldError errors={[error]} />
                    </Activity>
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Password *</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={field.name}
                        aria-invalid={invalid}
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <EyeOffIcon />
                      </InputGroupAddon>
                    </InputGroup>
                    <Activity mode={Boolean(error) ? "visible" : "hidden"}>
                      <FieldError errors={[error]} />
                    </Activity>
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form> */}
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
