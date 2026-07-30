import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonButtonProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonLinkProps = CommonButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function getButtonClassName({
  className,
  size = "md",
  variant = "primary"
}: Pick<CommonButtonProps, "className" | "size" | "variant">) {
  return ["ui-button", `ui-button--${variant}`, `ui-button--${size}`, className].filter(Boolean).join(" ");
}

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function Button(props: ButtonLinkProps | NativeButtonProps) {
  const buttonClassName = getButtonClassName({
    className: props.className,
    size: props.size,
    variant: props.variant
  });

  if ("href" in props && props.href) {
    const { children, className, href, size, variant, ...anchorProps } = props;

    if (isInternalHref(href)) {
      return (
        <Link className={buttonClassName} href={href} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a className={buttonClassName} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const { children, className, size, type = "button", variant, ...buttonProps } = nativeProps;

  return (
    <button className={buttonClassName} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
