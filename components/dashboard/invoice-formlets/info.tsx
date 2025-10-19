import { CircleQuestionMark, Repeat } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function InfoPopover({
  description,
  title,
  id,
}: {
  title: string;
  description: string[];
  id: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CircleQuestionMark className="size-4 text-blue-600" />
      </PopoverTrigger>
      <PopoverContent className="max-w-3xs space-y-1.5">
        <p className="leading-none font-medium text-sm!">
          {title}
        </p>

        {id === "discount" && (
          <p className="text-muted-foreground text-sm! text-justify">
            {description[0]} <Repeat className="text-amber-500 size-4 inline" />{" "}
            {description[1]} <Repeat className="text-amber-500 size-4 inline" />{" "}
          </p>
        )}

        {id === "tax" && (
          <p className="text-muted-foreground text-sm! text-justify">
            {description[0]} <Repeat className="text-amber-500 size-4 inline" />{" "}
            {description[1]} <Repeat className="text-amber-500 size-4 inline" />{" "}
            {description[2]}
          </p>
        )}
        {id === "shipping" && (
          <p className="text-muted-foreground text-sm! text-justify">
            {description[0]} <Repeat className="text-amber-500 size-4 inline" />{" "}
            {description[1]}
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
