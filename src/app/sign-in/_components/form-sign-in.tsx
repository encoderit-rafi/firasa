"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Activity } from "react";
import { SignInSchema, SignInType } from "../_types";
import { useMutationSignIn } from "../_api";
import { toast } from "sonner";
export default function FormSignIn() {
  const { control, handleSubmit } = useForm<SignInType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });
  const { mutate: signIn, isPending } = useMutationSignIn();
  const onSubmit = (data: SignInType) => {
    // toast.success("Sign In Data", { description: JSON.stringify(data) });
    signIn(data);
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
        <Button type="submit" className="w-full" loading={isPending}>
          Sign In
        </Button>
      </FieldGroup>
    </form>
  );
}
