import { ElementType, ReactNode } from "react"
import { Button } from "./Button"

export interface IIconsButonProps {
  Icon: ElementType;
  children?: ReactNode;
  text?: string;
  className?: string;
}

export const IconButton = (props: IIconsButonProps) => {
  const { Icon, children, text, className = "" } = props;

  return (
    <Button className={className}>
      <span className="pr-2">{text || children}</span>
      <Icon />
    </Button>
  )
}
