import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  children: ReactNode;
  tone?: "default" | "sand" | "forest";
};

export function Card({ as: Component = "article", children, className, tone = "default", ...props }: CardProps) {
  return (
    <Component className={["ui-card", `ui-card--${tone}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </Component>
  );
}
