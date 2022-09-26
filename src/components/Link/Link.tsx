import { ReactNode } from "react";

export interface ILinkProps {
  children?: ReactNode;
  href: string;
  isExternal?: boolean;
  className?: string;
}

const DEFAULT_CLASSES =
  `flex flex-row items-center justify-between p-2 focus:outline-none focus:ring-1 
focus:ring-blue-600 hover:text-blue-600 hover:underline`

export const Link = (props: ILinkProps) => {

  const { className = "", children, href, isExternal = true } = props;
  const target = isExternal ? `_blank noreferrer noopener` : `_self`

  return (
    <a href={href} className={DEFAULT_CLASSES + className} target={target}>
      {children}
    </a>
  )
}
