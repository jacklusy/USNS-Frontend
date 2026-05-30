"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { indeterminate = false, className = "", disabled, ...props },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);

    function setRefs(node: HTMLInputElement | null) {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <span className="inline-flex h-11 w-11 items-center justify-center">
        <input
          ref={setRefs}
          type="checkbox"
          disabled={disabled}
          className={`h-5 w-5 shrink-0 cursor-pointer rounded border-border text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        />
      </span>
    );
  },
);
