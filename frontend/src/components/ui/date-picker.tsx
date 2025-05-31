import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CustomCaption } from "../auth/register/CustomCaption";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "border-2 focus-within:border-zinc-400 border-zinc-700 w-full justify-start text-left font-normal transition-colors bg-transparent hover:bg-transparent",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          components={{
            Caption: (props) => (
              <CustomCaption
                displayMonth={props.displayMonth}
                onChangeMonth={(month: number) => {
                  const newDate = new Date(props.displayMonth);
                  newDate.setMonth(month);
                  props.goToMonth(newDate);
                }}
                onChangeYear={(year) => {
                  const newDate = new Date(props.displayMonth);
                  newDate.setFullYear(year);
                  props.goToMonth(newDate);
                }}
              />
            ),
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
