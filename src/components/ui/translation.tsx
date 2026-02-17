import { Language } from "@/assets/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function Translation() {
  return (
    <Select defaultValue="english" value="english">
      <SelectTrigger
        className={cn(
          "w-fit max-w-31",
          buttonVariants({
            variant: "outline",
          }),
        )}
      >
        <div className="flex items-center">
          <Language className="mr-2 size-4 text-black" />
          <SelectValue placeholder="Select a fruit" />
        </div>
      </SelectTrigger>
      <SelectContent
        className="border-outline-variant border"
        position="popper"
      >
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
          <SelectItem value="german">German</SelectItem>
          <SelectItem value="french">French</SelectItem>
          <SelectItem value="italian">Italian</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
