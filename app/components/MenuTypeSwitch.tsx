"use client";

import { Switch } from "@/components/ui/switch";
import { UpdateEventTypeStatusAction } from "../actions";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

export default function MenuTypeSwitch({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(
    UpdateEventTypeStatusAction,
    undefined
  );

  useEffect(() => {
    if (state?.status == "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <>
      <Switch
        disabled={isPending}
        defaultChecked={initialChecked}
        onCheckedChange={(isChecked) => {
          startTransition(() => {
            action({
              eventTypeId: eventTypeId,
              isChecked: isChecked,
            });
          });
        }}
      />
    </>
  );
}
