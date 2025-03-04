import React, { forwardRef, memo, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { children, ...props },
    ref
  ) {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  })
);

export default Button;
