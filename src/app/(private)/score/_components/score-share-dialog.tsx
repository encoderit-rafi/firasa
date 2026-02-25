import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Button, buttonVariants } from "@/components/ui/button";
import { Copy, FacebookFilled, X } from "@/assets/icons";
import { LinkedinFilled } from "@/assets/icons/LinkedinFilled";
import { cn, handleCopyLink } from "@/lib/utils";

interface ScoreShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareData: string;
  sharePath: string;
}

export const ScoreShareDialog = ({
  open,
  onOpenChange,
  shareData,
  sharePath,
}: ScoreShareDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-136 space-y-6">
        <DialogHeader>
          <DialogTitle>Make it a post</DialogTitle>
        </DialogHeader>
        <div className="border-error-container max-h-100 overflow-y-auto rounded-lg border bg-white p-6 text-wrap whitespace-pre-line">
          {shareData}
        </div>

        <div className="flex-center mb-0 gap-3">
          <TwitterShareButton
            url={sharePath}
            title={shareData}
            className={cn(buttonVariants({ variant: "icon-muted" }))}
          >
            {/* <Button variant={"icon-muted"}> */}
            <X />
            {/* </Button> */}
          </TwitterShareButton>
          <LinkedinShareButton
            url={sharePath}
            title={shareData}
            className={cn(buttonVariants({ variant: "icon-muted" }))}
          >
            {/* <Button variant={"icon-muted"}> */}
            <LinkedinFilled />
            {/* </Button> */}
          </LinkedinShareButton>
          <FacebookShareButton
            url={sharePath}
            className={cn(buttonVariants({ variant: "icon-muted" }))}
          >
            {/* <Button variant={"icon-muted"}> */}
            <FacebookFilled />
            {/* </Button> */}
          </FacebookShareButton>
          <Button
            variant={"icon-muted"}
            onClick={() => handleCopyLink(shareData)}
          >
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
