import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export function SelectDemo({
  placeholder,
  group,
}: {
  placeholder?: string;
  group: { label: string; items: string[] };
}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{group.label}</SelectLabel>
          {group.items.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
