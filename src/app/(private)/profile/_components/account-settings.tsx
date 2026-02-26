"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type AccountFormData = {
  completeName: string;
  emailAddress: string;
  signInMethod: string;
  subscribeToNewsletter: boolean;
};

export default function AccountSettings() {
  const { t } = useTranslation();
  const session = useSession();
  const queryClient = useQueryClient();
  const userId = session.data?.user?.id;

  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await api.get(`/auth/profile`);
      return response.data;
    },
    enabled: !!userId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<AccountFormData>({
    defaultValues: {
      completeName: data?.data?.name || "",
      emailAddress: data?.data?.email || "",
      signInMethod: session.data?.user.method || "not found",
      subscribeToNewsletter: data?.data?.is_subscribe_to_newsletter === 1,
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        completeName: data.data.name || "",
        emailAddress: data.data.email || "",
        signInMethod: session.data?.user.method || "not found",
        subscribeToNewsletter: data.data.is_subscribe_to_newsletter === 1,
      });
    }
  }, [data, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: AccountFormData) => {
      const response = await api.put(`/profile/update`, {
        name: formData.completeName,
        email: formData.emailAddress,
        is_subscribe_to_newsletter: formData.subscribeToNewsletter ? 1 : 0,
      });
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || t("profile_update_success"));
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        toast.error(
          axiosError.response?.data?.message ||
            axiosError.message ||
            t("profile_update_error"),
        );
      } else {
        toast.error(t("profile_update_error"));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  const { mutate: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/profile/delete-account`);
      return response.data;
    },
    onSuccess: () => {
      signOut({ callbackUrl: "/sign-in" });
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        toast.error(
          axiosError.response?.data?.message ||
            axiosError.message ||
            t("profile_delete_error"),
        );
      } else {
        toast.error(t("profile_delete_error"));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      signOut({ callbackUrl: "/sign-in" });
    },
  });

  const subscribeToNewsletter = watch("subscribeToNewsletter");

  const onSubmit = (formData: AccountFormData) => {
    mutate(formData);
  };

  return (
    <div className="space-y-8 py-16">
      <div className="flex-between font-inter font-bold">
        <h6 className="font-inter text-xl font-bold">
          {t("profile_my_account")}
        </h6>
        <Button
          type="button"
          variant={"ghost"}
          disabled={isDeleting}
          onClick={() => deleteAccount()}
          className="text-danger font-inter font-bold"
        >
          {isDeleting ? t("profile_deleting") : t("profile_delete_account")}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="rounded-lg border border-[#F2F2F2] px-3 py-2">
          <label className="font-inter text-start text-[10px] font-normal">
            {t("profile_complete_name")}
          </label>
          <Input
            {...register("completeName")}
            className="font-inter border-0 p-0 text-base font-bold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="rounded-lg border border-[#F2F2F2] px-3 py-2">
          <label className="font-inter text-start text-[10px] font-normal">
            {t("profile_email_address")}
          </label>
          <Input
            {...register("emailAddress")}
            type="email"
            className="font-inter border-0 p-0 text-base font-bold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="rounded-lg border border-[#F2F2F2] bg-[#F9F9F9] px-3 py-2">
          <label className="font-inter text-start text-[10px] font-normal">
            {t("profile_sign_in_method")}
          </label>
          <Input
            {...register("signInMethod")}
            disabled
            className="font-inter border-0 bg-transparent p-0 text-base font-bold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#F2F2F2] px-3 py-2">
          <div>
            <p className="font-inter text-start text-[10px] font-normal">
              {t("profile_subscribe_newsletter")}
            </p>
            <p className="font-blod font-inter text-start text-base">
              {subscribeToNewsletter ? t("profile_yes") : t("profile_no")}
            </p>
          </div>
          <Switch
            className="h-6! w-9!"
            checked={subscribeToNewsletter}
            onCheckedChange={(checked) =>
              setValue("subscribeToNewsletter", checked, { shouldDirty: true })
            }
          />
        </div>
        <Button
          type="submit"
          variant={"secondary"}
          disabled={!isDirty || isPending}
          className="bg-blue font-inter w-fit font-bold text-white"
        >
          {isPending ? t("profile_saving") : t("profile_save_changes")}
        </Button>
      </form>
    </div>
  );
}
