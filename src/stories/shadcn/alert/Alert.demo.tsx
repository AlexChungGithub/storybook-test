import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
type AlertProps = React.ComponentProps<typeof Alert>;

export function AlertDemo({
  title,
  description,
  ...alertProps
}: {
  title: string;
  description: string;
} & AlertProps) {
  return (
    <Alert {...alertProps}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
