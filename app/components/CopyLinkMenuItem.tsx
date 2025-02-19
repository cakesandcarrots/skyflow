"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

function CopyLinkMenuItem({ meetingUrl }: { meetingUrl: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("URL has been copied");
    } catch (err) {
      toast.error("Could not copy url");
    }
  };
  return (
    <>
      <DropdownMenuItem onSelect={handleCopy}>
        <Link2 className="mr-2 size-8"/> 
        <span>Copy</span>
      </DropdownMenuItem>
    </>
  );
}

export default CopyLinkMenuItem;
