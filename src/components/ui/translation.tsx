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
          <Language className="text-black mr-2 size-4" />
          <SelectValue placeholder="Select a fruit" />
        </div>
      </SelectTrigger>
      <SelectContent
        className="border border-outline-variant"
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
