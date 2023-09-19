import { Bold } from "lucide-react";

import { Toggle } from "../../../components/ui/toggle";
type Props = React.ComponentProps<typeof Toggle>;

export function ToggleDemo({ ...props }: Props) {
  return (
    <Toggle {...props}>
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
