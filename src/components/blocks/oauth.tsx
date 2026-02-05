import { Apple, FacebookFilled, Google } from "@/assets/icons";
import { Button } from "@/components/ui/button";

const items = [
  {
    icon: Google,
    text: "Continue with Google",
  },
  {
    icon: Apple,
    text: "Continue with Apple",
  },
  {
    icon: FacebookFilled,
    text: "Continue with Facebook",
  },
];
export default function OAuth() {
  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => {
        return (
          <Button variant="outline-variant" size="md" key={index}>
            <item.icon />
            {item.text}
          </Button>
        );
      })}
    </div>
  );
}
