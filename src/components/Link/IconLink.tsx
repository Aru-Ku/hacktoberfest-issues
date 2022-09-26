import { ElementType, ReactNode } from "react"
import { ILinkProps, Link } from "./Link"

export interface IconLinkProps extends ILinkProps {
  Icon: ElementType;
  text?: string;
  href: string;
  isExternal?: boolean;
  className?: string;
}

export const IconLink = (props: IconLinkProps) => {
  const { Icon, children, text } = props;

  return (
    <Link {...props}>
      <span className="pr-2">{text || children}</span>
      <Icon />
    </Link>
  )
}
