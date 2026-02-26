// SignupForm.tsx
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
import { SignUpSchema, SignUpType } from "../_types/signUpTypes";
import { useMutationSignUp } from "../_api";
import { useTranslation } from "react-i18next";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit } = useForm<SignUpType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate: signUp, isPending } = useMutationSignUp();
  const { t } = useTranslation();

  const onSubmit = (data: SignUpType) => {
    signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Full Name */}
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { invalid, error } }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>
                {t("auth_full_name_label")}
              </FieldLabel>
              <Input
                id={field.name}
                aria-invalid={invalid}
                className="placeholder:body-large-primary placeholder:text-on-surface-variant p-4"
                placeholder={t("auth_name_placeholder")}
                {...field}
              />
              <Activity mode={Boolean(error) ? "visible" : "hidden"}>
                <FieldError errors={[error]} />
              </Activity>
            </Field>
          )}
        />

        {/* Email */}
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
                className="placeholder:body-large-primary placeholder:text-on-surface-variant p-4"
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

        {/* Password */}
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
                  className="placeholder:body-large-primary placeholder:text-on-surface-variant p-4"
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

        {/* Confirm Password */}
        <Controller
          control={control}
          name="password_confirmation"
          render={({ field, fieldState: { invalid, error } }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>
                {t("auth_confirm_password_label")}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  aria-invalid={invalid}
                  className="placeholder:body-large-primary placeholder:text-on-surface-variant p-4"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("auth_confirm_password_placeholder")}
                  {...field}
                />
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                </InputGroupAddon>
              </InputGroup>
              <Activity mode={Boolean(error) ? "visible" : "hidden"}>
                <FieldError errors={[error]} />
              </Activity>
            </Field>
          )}
        />

        <Button type="submit" className="w-full" loading={isPending}>
          {t("auth_sign_up_btn")}
        </Button>
      </FieldGroup>
    </form>
  );
}
