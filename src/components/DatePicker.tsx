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
import { es } from 'date-fns/locale'

export function DatePickerReport({
  onDateChange,
  value
}: {
  onDateChange: React.Dispatch<React.SetStateAction<Date | null>>;
  value: Date | null;
}) {
  const [date, setDate] = React.useState<Date | null>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate || null);
    onDateChange?.(newDate || null);
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

          {date ? format(date, "PPP", { locale: es }) : <span>Cuando Inicio <span className="text-red-500">*</span></span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          lang="ES"
          locale={es}
          selected={date as Date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
