import { ComponentProps } from "react";

import { cn } from "../../lib/utils";

const Icon = ({ className, ...rest }: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth="1"
      stroke="currentColor"
      className={cn("absolute size-6 text-black dark:text-white", className)}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const Card = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "relative border border-dashed border-zinc-400 dark:border-zinc-700",
        className,
      )}
      {...props}
    >
      <Icon className="-left-3 -top-3" />
      <Icon className="-right-3 -top-3" />
      <Icon className="-bottom-3 -left-3" />
      <Icon className="-bottom-3 -right-3" />

      {children}
    </div>
  );
};
