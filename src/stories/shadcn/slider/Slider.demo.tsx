import { cn } from "../../../lib/utils";
import { Slider } from "../../../components/ui/slider";
import "./styles.css";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%] SliderRoot", className)}
      {...props}
    />
  );
}
