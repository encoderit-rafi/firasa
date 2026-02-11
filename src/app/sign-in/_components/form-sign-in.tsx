"use client";
// import { Apple, FacebookFilled, Google } from "@/assets/icons";
// import OAuth from "@/components/blocks/oauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
// import TextSeparator from "@/components/ui/text-separator";
import { EyeOffIcon } from "lucide-react";
// import Link from "next/link";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Activity } from "react";
const SignInSchema = z.object({
  email: z.email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});
type SignInSchema = z.infer<typeof SignInSchema>;
export default function FormSignIn() {
  const { control, handleSubmit } = useForm<SignInSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });
  const onSubmit = (data: SignInSchema) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </FieldGroup>
    </form>
  );
}
