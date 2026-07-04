"use client";

import * as React from "react";

/**
 * Minimal Slot implementation (Radix-free).
 * Merges the component's props onto its single child element so that
 * `asChild` patterns work without pulling in @radix-ui/react-slot.
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<Record<string, unknown>> & {
      ref?: React.Ref<HTMLElement>;
    };

    const childProps = child.props;
    const merged = mergeProps(props as Record<string, unknown>, childProps);
    merged.ref = mergeRefs(ref, child.ref);

    return React.cloneElement(
      child,
      merged as unknown as Partial<Record<string, unknown>> & React.Attributes
    );
  }
);
Slot.displayName = "Slot";

function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...childProps };

  for (const key in slotProps) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    if (/^on[A-Z]/.test(key) && typeof slotValue === "function") {
      // Compose event handlers: child first, then slot.
      merged[key] = (...args: unknown[]) => {
        (childValue as ((...a: unknown[]) => void) | undefined)?.(...args);
        (slotValue as (...a: unknown[]) => void)(...args);
      };
    } else if (key === "className") {
      merged[key] = [slotValue, childValue].filter(Boolean).join(" ");
    } else if (key === "style") {
      merged[key] = {
        ...(slotValue as object),
        ...(childValue as object),
      };
    } else {
      merged[key] = slotValue !== undefined ? slotValue : childValue;
    }
  }

  return merged;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}
