
import OtpInput from "@/app/verify-otp/_component/OtpInput";
import { Button } from "@/components/ui/button";
import TextSeparator from "@/components/ui/text-separator";
import Link from "next/link";

export default function SignUpPage() {

    return (
        <section className="section space-y-8 md:space-y-16">
            <div className="space-y-4">
                <h1>Verify Your Account</h1>
                <p className="text-sm font-normal">We’ve sent a verification code to your email.</p>
            </div>
            <div className="px-4">
                <div className="container-xs flex flex-col gap-6">

                    <TextSeparator />
                    <OtpInput />

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


