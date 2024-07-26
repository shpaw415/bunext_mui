"use client";

import TextField from "../TextField";
import React, { forwardRef } from "react";
type SelectProps = {
  variant?: "outlined" | "filled" | "standard";
  startIcon?: () => JSX.Element;
  endIcon?: () => JSX.Element;
  label?: string;
  color?: "error" | "success";
  value?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  helpText?: string;
  readOnly?: boolean;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => (
    <TextField style={{ cursor: "pointer" }} {...(props as any)}>
      <select disabled={props.readOnly || props.disabled}>{children}</select>
    </TextField>
  )
);
Select.displayName = "Select";

export default Select;
