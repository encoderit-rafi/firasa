"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type AccountFormData = {
  completeName: string;
  emailAddress: string;
  signInMethod: string;
  subscribeToNewsletter: boolean;
};

export default function AccountSettings() {
  const { register, handleSubmit, setValue, watch } = useForm<AccountFormData>({
    defaultValues: {
      completeName: "John doe ",
      emailAddress: "john.doe@gmail.com",
      signInMethod: "Google",
      subscribeToNewsletter: false,
    },
  });

  const subscribeToNewsletter = watch("subscribeToNewsletter");

  const onSubmit = (data: AccountFormData) => {
    console.log(data);
  };

  return (
    <div className="space-y-8 py-16">
      <div className="flex-between font-inter font-bold">
        <h6 className="font-inter text-xl font-bold">My account</h6>
        <Button variant={"ghost"} className="text-danger font-inter font-bold">
          Delete account
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="rounded-lg border border-[#F2F2F2] px-3 py-2">
          <label className="font-inter text-start text-[10px] font-normal">
            Complete name
          </label>
          <Input
            {...register("completeName")}
            className="border-0 p-0 font-inter text-base font-bold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="rounded-lg border border-[#F2F2F2] px-3 py-2">
          <label className="font-inter text-start text-[10px] font-normal">
            Email address
          </label>
          <Input
            {...register("emailAddress")}
            type="email"
            className="border-0 p-0 font-inter text-base font-bold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="rounded-lg border border-[#F2F2F2] bg-[#F9F9F9] px-3 py-2">
          <label className="font-inter text-start text-[10px] font-normal">
            Sign in method
          </label>
          <Input
            {...register("signInMethod")}
            disabled
            className="border-0 bg-transparent p-0 font-inter text-base font-bold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#F2F2F2] px-3 py-2">
          <div>
            <p className="font-inter text-start text-[10px] font-normal">
              Subscribe to newsletter?
            </p>
            <p className="font-blod font-inter text-start text-base">
              {subscribeToNewsletter ? "Yes" : "No"}
            </p>
          </div>
          <Switch
            checked={subscribeToNewsletter}
            onCheckedChange={(checked) =>
              setValue("subscribeToNewsletter", checked)
            }
          />
        </div>
        <Button
          type="submit"
          variant={"secondary"}
          className="w-fit bg-blue font-inter font-bold text-white"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}