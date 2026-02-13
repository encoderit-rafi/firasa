"use client";
import { Apple, FacebookFilled, Google } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import axios from "axios";

const items = [
  {
    icon: Google,
    text: "Continue with Google",
    method: "google",
  },
  {
    icon: Apple,
    text: "Continue with Apple",
    method: "apple",
  },
  {
    icon: FacebookFilled,
    text: "Continue with Facebook",
    method: "facebook",
  },
];
const handleSocialLogin = async (method: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/${method}`
    );

    const redirectUrl = res.data?.data?.url;

    if (!redirectUrl) {
      throw new Error("Redirect URL not found in response");
    }

    // Redirect browser
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Google auth redirect failed:", error);
  }
};
export default function OAuth() {
  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => {
        return (
          <Button onClick={() => handleSocialLogin(item.method)} variant="outline-variant" size="md" key={index}>
            <item.icon />
            {item.text}
          </Button>
        );
      })}
    </div>
  );
}
