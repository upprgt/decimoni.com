import React, { forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea(props, ref) {
    const { className = "", rows = 4, ...rest } = props;
    return (
      <textarea
        ref={ref}
        rows={rows}
        {...rest}
        className={`w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 ${className}`}
      />
    );
  }
);