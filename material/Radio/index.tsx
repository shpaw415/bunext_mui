"use client";

import { type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";
import { createStyle, MuiColors, type CssProps } from "../../style";
import Text from "../Text";
import { useContext, useRef } from "react";
type RadioButtonProps = {
  checked?: boolean;
  label?:
    | {
        display?: "top" | "right" | "bottom" | "left";
        content: string;
      }
    | string;
  disabled?: boolean;
  color?: "error" | "success";
} & MuiElementProps;

function setLabelDirection(label: RadioButtonProps["label"]): CssProps {
  if (typeof label == "string") return {};
  switch (label?.display) {
    case "top":
      return {
        flexDirection: "column-reverse",
      };
    case "right":
    case undefined:
      return {};
    case "bottom":
      return {
        flexDirection: "column",
      };
    case "left":
      return {
        flexDirection: "row-reverse",
      };
  }
}

export default function Radio({
  sx,
  checked,
  label,
  disabled,
  onClick,
  color,
  ...props
}: RadioButtonProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) {
  const Color = useContext(MuiColors);
  const inputRef = useRef<HTMLInputElement>(null);

  if (disabled) checked = false;

  const setColor = (type: RadioButtonProps["color"]) => {
    switch (type) {
      case "success":
        return Color.radio.success;
      case "error":
        return Color.radio.error;
      default:
        return Color.primary;
    }
  };

  const ButtonFrameStyle = createStyle({
    className: "MUI_RadioButton",
    defaultStyle: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      outline: "0px",
      border: "0px",
      margin: "0px",
      cursor: "inherit",
      userSelect: "none",
      verticalAlign: "middle",
      appearance: "none",
      textDecoration: "none",
      padding: "9px",
      borderRadius: "50%",
      ":hover": {
        backgroundColor: "rgba(33, 150, 243, 0.08)",
      },
    },
    currentStyle: {
      ...(disabled
        ? {
            ":hover": {},
          }
        : {}),
      ...sx,
    },
  });

  const frameRadio = createStyle({
    className: "MUI_radio_frame",
    defaultStyle: {
      borderRadius: "50%",
      transition: "ease-in-out 200ms",
      cursor: "inherit",
    },
    currentStyle: {
      border: `2px solid ${setColor(color)}`,
      ...(disabled
        ? {
            border: `2px solid ${Color.disabled}`,
          }
        : {}),
      padding: checked ? "3px" : "8px",
    },
  });

  const innerRadio = createStyle({
    className: "MUI_radio_inner",
    defaultStyle: {
      borderRadius: "50%",
      transition: "ease-in-out 200ms",
      cursor: "inherit",
    },
    currentStyle: {
      ...(checked
        ? { width: "10px", height: "10px" }
        : { width: "0px", height: "0px" }),
      backgroundColor: disabled ? Color.disabled : setColor(color),
    },
  });

  const WrapperStyle = createStyle({
    className: "MUI_Wrapper_RadioBtn",
    defaultStyle: {
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",
      userSelect: "none",
    },
    currentStyle: {
      ...(disabled
        ? {
            borderColor: Color.disabled,
            cursor: "default",
          }
        : {}),
      ...setLabelDirection(label),
    },
  });

  return (
    <MuiBase
      MuiStyle={WrapperStyle}
      onClick={(e) => {
        const data = {
          ...e,
          ...inputRef.current,
        };
        onClick && onClick(data as any);
      }}
    >
      <MuiBase MuiStyle={ButtonFrameStyle} ripple>
        <MuiBase MuiStyle={frameRadio}>
          <MuiBase MuiStyle={innerRadio} />
        </MuiBase>
        <input
          suppressHydrationWarning
          type="checkbox"
          checked={checked}
          ref={inputRef}
          onChange={() => {}}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            opacity: 0,
            cursor: "inherit",
          }}
          disabled={disabled}
          {...props}
        />
      </MuiBase>
      {label && (
        <Text
          sx={{
            ...(disabled
              ? {
                  color: Color.disabled,
                }
              : {
                  color: color == undefined ? "white" : setColor(color),
                }),
            cursor: "inherit",
          }}
        >
          {typeof label == "string" ? label : label.content}
        </Text>
      )}
    </MuiBase>
  );
}
