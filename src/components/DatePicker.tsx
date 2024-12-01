"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerReport({ 
  onDateChange,
  value 
}: {
  onDateChange: (date: Date | null) => void;
  value: Date | null;
}) {
  const [date, setDate] = React.useState<Date | null>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[400px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Cuando Inicio <span className="text-red-500">*</span></span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          lang="ES"
          selected={date as Date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
