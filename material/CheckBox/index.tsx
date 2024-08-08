"use client";
import { MuiClass } from "../common";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
  type SxProps,
} from "../../style";
import Check from "@material-design-icons/svg/outlined/check.svg";
import MuiBase, { type MuiProps } from "../../utils/base";
import { useState, type InputHTMLAttributes } from "react";
import Typography from "../Typography";

type MuiCheckBox = {
  label?: string;
  size?: "small" | "medium" | "large";
  disabeled?: boolean;
  checked?: boolean;
  color?: React.CSSProperties["color"];
} & MuiProps &
  React.HTMLAttributes<HTMLInputElement>;

type CheckBoxModes =
  | "size_small"
  | "size_medium"
  | "size_large"
  | "checked"
  | "disabled_checked"
  | "disabled_unchecked";

type CheckBoxVariants = "default";

class CheckBoxManager extends MuiBaseStyleUtils<
  CheckBoxVariants,
  CheckBoxModes
> {
  constructor(props: MuiBaseStyleUtilsProps<CheckBoxVariants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
    this.makeSize();
    this.makeDisabled();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        padding: "9px",
        borderRadius: "50%",
        color: "rgba(255, 255, 255, 0.7)",
        overflow: "hidden",
        ":hover": {
          backgroundColor: "rgba(33, 150, 243, 0.08)",
        },
      },
      default: {},
    });
  }
  private makeSize() {
    // default to medium

    this.makeStyleFor({
      suffix: "size_small",
      commonStyle: {
        scale: 0.75,
      },
      variants: {
        default: {},
      },
    });
    this.makeStyleFor({
      suffix: "size_medium",
      commonStyle: {
        scale: 0.84,
      },
      variants: {
        default: {},
      },
    });
    this.makeStyleFor({
      suffix: "size_large",
      commonStyle: {
        scale: 1,
      },
      variants: {
        default: {},
      },
    });
  }

  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled_checked",
      commonStyle: {
        ":hover": {
          background: "none",
          cursor: "default",
        },
      },
      variants: {
        default: {},
      },
    });
    this.makeStyleFor({
      suffix: "disabled_unchecked",
      commonStyle: {
        ":hover": {
          background: "none",
          cursor: "default",
        },
      },
      variants: {
        default: {},
      },
    });
  }
}

class WrapperStyleManager extends MuiBaseStyleUtils<
  CheckBoxVariants,
  CheckBoxModes
> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);

    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeChecked();
    this.makeDisabledUnchecked();
    this.makeDisabledChecked();
  }

  private makeDefault() {
    const borderColor = () => {
      switch (this.theme.theme) {
        case "light":
          return "#333";
        case "dark":
          return "rgba(255, 255, 255, 0.7)";
      }
    };

    this.makeDefaultStyle({
      commonStyle: {
        border: `2px solid ${borderColor()}`,
        borderRadius: "5px",
        width: "20px",
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ":customStyle": `.<!ID!> > svg { fill: white; }`,
      },
      default: {},
    });
  }

  private makeChecked() {
    this.makeStyleFor({
      suffix: "checked",
      commonStyle: {
        background: this.theme.primary[this.theme.theme],
        borderColor: this.theme.primary[this.theme.theme],
        ":customStyle": `.<!ID!> > svg { fill: white; }`,
      },
      variants: { default: {} },
    });
  }

  private makeDisabledUnchecked() {
    this.makeStyleFor({
      suffix: "disabled_unchecked",
      commonStyle: {
        borderColor: this.theme.disabled[this.theme.theme],
        backgroundColor: "transparent",
        ":customStyle": `.<!ID!> > svg { fill: transparent; }`,
      },
      variants: { default: {} },
    });
  }

  private makeDisabledChecked() {
    this.makeStyleFor({
      suffix: "disabled_checked",
      commonStyle: {
        borderColor: "transparent",
        backgroundColor: this.theme.disabled[this.theme.theme],
        ":customStyle": `.<!ID!> > svg { fill: white; }`,
      },
      variants: { default: {} },
    });
  }
}

export default function CheckBox({
  label,
  disabeled,
  checked,
  size,
  color,
  sx,
  style,
  defaultChecked,
  ...props
}: MuiCheckBox & Omit<InputHTMLAttributes<any>, "style" | "size">) {
  const [_checked, setChecked] = useState(Boolean(defaultChecked));

  if (checked === true && !_checked) setChecked(true);
  else if (checked === false && _checked) setChecked(false);

  const _style = useStyle(sx, style);

  const setDisabled = (): CheckBoxModes | undefined => {
    if (disabeled && _checked) return "disabled_checked";
    if (disabeled && !_checked) return "disabled_unchecked";
    else return undefined;
  };

  const _props = [
    size ? `size_${size}` : `size_medium`,
    setDisabled(),
    _checked ? "checked" : undefined,
  ] as any;

  const MainManager = new CheckBoxManager({
    ..._style,
    staticClassName: MuiClass.CheckBox,
    currentVariant: "default",
  }).setProps(_props);

  const WrapperManager = new WrapperStyleManager({
    staticClassName: "MUI_Checkbox_wrapper",
    currentVariant: "default",
    ..._style,
  }).setProps(_props);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ..._style.styleFromSx,
      }}
      {...props}
    >
      <MuiBase className={MainManager.createClassNames()}>
        <MuiBase
          className={WrapperManager.createClassNames()}
          onClick={(e) => {
            if (disabeled || props.readOnly) return;
            setChecked(!_checked);
          }}
          ripple={disabeled || props.readOnly ? false : true}
        >
          <Check />
          <input
            type="checkbox"
            checked={_checked}
            onChange={props.onChange || (() => {})}
            style={{
              height: "100%",
              width: "100%",
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            {...props}
          />
        </MuiBase>
      </MuiBase>
      {label && (
        <Typography sx={{ marginLeft: "5px" }} id="__MUI_Checkbox_Label__">
          {label + props.required ? "*" : ""}
        </Typography>
      )}
    </div>
  );
}
