import { Select } from "@/components/ui/select";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type CustomCaptionProps = {
  displayMonth: Date;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
};

export const CustomCaption = ({
  displayMonth,
  onChangeMonth,
  onChangeYear,
}: CustomCaptionProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  ); // últimos 100 anos

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(value) => onChangeMonth(Number(value))}
        defaultValue={String(displayMonth.getMonth())}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, idx) => (
            <SelectItem key={idx} value={String(idx)}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => onChangeYear(Number(value))}
        defaultValue={String(displayMonth.getFullYear())}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
