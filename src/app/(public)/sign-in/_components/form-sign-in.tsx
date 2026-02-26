"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

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
import { useTranslation } from "react-i18next";

export default function FormSignIn() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
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
              <FieldLabel htmlFor={field.name}>
                {t("auth_email_label")}
              </FieldLabel>
              <Input
                id={field.name}
                aria-invalid={invalid}
                placeholder={t("auth_email_placeholder")}
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
              <FieldLabel htmlFor={field.name}>
                {t("auth_password_label")}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  aria-invalid={invalid}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth_password_placeholder")}
                  {...field}
                />
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </InputGroupAddon>
              </InputGroup>
              <Activity mode={Boolean(error) ? "visible" : "hidden"}>
                <FieldError errors={[error]} />
              </Activity>
            </Field>
          )}
        />
        <Button type="submit" className="w-full" loading={isPending}>
          {t("auth_sign_in_btn")}
        </Button>
      </FieldGroup>
    </form>
  );
}
