import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { useMouseMoveListener, useMouseUpListener } from "../../utils";
import ToolTip from "../ToolTip";
import type { MuiProps } from "../../utils/base";
type Variant = "default";
type SuffixType = "disabled" | "selected";

type SliderProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  "defaultValue" | "onChange"
> & {
  disabled?: boolean;
  readOnly?: boolean;
  min: number;
  max: number;
  step: number;
  onChange?: (values: number[]) => void;
  value?: number | number[];
  defaultValue?: number | number[];
  valueLabelDisplay?: "on" | "auto";
  valueLabelFormat?: (value: number) => number;
  valueLabelPosition?: "top" | "bottom";
} & MuiProps;

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeDisabled();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        borderRadius: "12px",
        boxSizing: "content-box",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        touchAction: "none",
        "-WebkitTapHighlightColor": "transparent",
        color: this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        }),
        height: "4px",
        width: "100%",
        padding: "13px 0px",
      },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        pointerEvents: "none",
        cursor: "default",
        color: "rgb(189, 189, 189)",
      },
    });
  }
}

class Rail extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "block",
        position: "absolute",
        borderRadius: "inherit",
        backgroundColor: "currentcolor",
        opacity: "0.38",
        width: "100%",
        height: "inherit",
        top: "50%",
        transform: "translateY(-50%)",
      },
    });
  }
}

class Track extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "block",
        position: "absolute",
        borderRadius: "inherit",
        border: "1px solid currentcolor",
        backgroundColor: "currentcolor",
        transition:
          "left 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        height: "inherit",
        top: "50%",
        transform: "translateY(-50%)",
      },
    });
  }
}

class Thumb extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        position: "absolute",
        width: "20px",
        height: "20px",
        boxSizing: "border-box",
        borderRadius: "50%",
        outline: "0px",
        backgroundColor: "currentcolor",
        display: "flex",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        "-WebkitBoxPack": "center",
        justifyContent: "center",
        transition:
          "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, cubic-bezier(0.4, 0, 0.2, 1) 0ms, bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        top: "50%",
        transform: "translate(-50%, -50%)",
        ":before": {
          position: "absolute",
          content: '""',
          borderRadius: "inherit",
          width: "100%",
          height: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
        },
        ":after": {
          position: "absolute",
          content: '""',
          borderRadius: "50%",
          width: "42px",
          height: "42px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        ":hover": {
          boxShadow: `rgba(${this.colorFromTheme({
            light: this.extractColorToRGB(this.theme.primary.light).join(", "),
            dark: this.extractColorToRGB(this.theme.primary.dark).join(","),
          })}, 0.16) 0px 0px 0px 8px`,
        },
        ":active": {
          boxShadow: `rgba(${this.colorFromTheme({
            light: this.extractColorToRGB(this.theme.primary.light).join(", "),
            dark: this.extractColorToRGB(this.theme.primary.dark).join(","),
          })}, 0.16) 0px 0px 0px 12px`,
        },
      },
    });
  }
}

class Input extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        border: "0px",
        clip: "rect(0px, 0px, 0px, 0px)",
        height: "100%",
        margin: "-1px",
        overflow: "hidden",
        padding: "0px",
        position: "absolute",
        whiteSpace: "nowrap",
        width: "100%",
        direction: "ltr",
      },
    });
  }
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      readOnly,
      min,
      max,
      step,
      onChange,
      style,
      sx,
      value,
      defaultValue,
      valueLabelDisplay,
      valueLabelFormat,
      valueLabelPosition,
      ...props
    },
    ref
  ) => {
    if (value != undefined && !Array.isArray(value)) value = [value];
    if (defaultValue != undefined && !Array.isArray(defaultValue))
      defaultValue = [defaultValue];

    const _style = useStyle(sx, style);
    const rootRef = useRef<HTMLSpanElement>(null);
    const totalLength = useMemo(
      () => Math.abs(min) + Math.abs(max),
      [min, max]
    );
    const toPercent = useCallback<(value: number) => number>((val) => {
      return (Math.abs(min - val) * 100) / totalLength;
    }, []);
    const fromPercent = useCallback<(value: number) => number>((val) => {
      const valFromPercent = (val * totalLength) / 100 + min;
      return valFromPercent;
    }, []);

    const [selected, setSelected] = useState([false, false]);
    const [_value_, setValue] = useState(() => {
      if (value) {
        return value.map((e) => toPercent(e));
      }
      if (defaultValue) {
        return defaultValue.map((e) => toPercent(e));
      }
      return [toPercent(defaultValue ?? min)];
    });

    const valuesToUse =
      (value as number[] | undefined)?.map((e) => toPercent(e)) ?? _value_;

    useMouseUpListener(() => {
      if (props.disabled) return;
      setSelected([false, false]);
    });
    let cumulativeMovement = [0, 0];
    let followUpValues = _value_;
    useEffect(() => {
      valuesToUse.map((val, index) => {
        setTimeout(() => {
          cumulativeMovement[index] =
            (val * (rootRef.current?.offsetWidth || 0)) / 100;
        }, 150);
      });
    }, []);
    useMouseMoveListener((e) => {
      if (e.buttons == 0 || props.disabled) return;
      let hasSelect = false;
      setSelected((current) => {
        if (!current.includes(true)) return current;
        else if (e.buttons == 0) return [false, false];
        const indexOfSelected = current.indexOf(true);
        hasSelect = true;
        const rootWidth = rootRef.current?.offsetWidth || 0;

        if (cumulativeMovement[indexOfSelected] + e.movementX < 0)
          cumulativeMovement[indexOfSelected] = 0;
        else if (cumulativeMovement[indexOfSelected] + e.movementX > rootWidth)
          cumulativeMovement[indexOfSelected] = rootWidth;
        else if (
          indexOfSelected == 0 &&
          followUpValues.filter((e) => e != undefined).length > 1 &&
          cumulativeMovement[0] + e.movementX > cumulativeMovement[1]
        ) {
        } else if (
          indexOfSelected == 1 &&
          followUpValues.filter((e) => e != undefined).length > 1 &&
          cumulativeMovement[1] + e.movementX < cumulativeMovement[0]
        ) {
        } else cumulativeMovement[indexOfSelected] += e.movementX;

        followUpValues = current.map((val, index) => {
          if (val == false) return followUpValues[index];
          return Math.round(
            (cumulativeMovement[indexOfSelected] * 100) / rootWidth
          );
        });

        if (!value) setValue(followUpValues);
        return current;
      });
      hasSelect &&
        onChange &&
        onChange(
          followUpValues
            .filter((e) => Number.isInteger(e))
            .map((e) => fromPercent(e))
        );
    });

    const root = new Root({
      ..._style,
      currentVariant: "default",
      staticClassName: "MUI_Slider_Root",
    }).setProps([props.disabled ? "disabled" : undefined]);
    const rail = new Rail({
      ..._style,
      currentVariant: "default",
      staticClassName: "MUI_Slider_Rail",
    });
    const track = new Track({
      ..._style,
      currentVariant: "default",
      staticClassName: "MUI_Slider_Track",
    });
    const thumb = new Thumb({
      ..._style,
      currentVariant: "default",
      staticClassName: "MUI_Slider_Thumb",
    });
    const input = new Input({
      ..._style,
      currentVariant: "default",
      staticClassName: "MUI_Slider_Input",
    });

    let styleForTrack: React.CSSProperties = {};
    if (!value && defaultValue && (defaultValue as number[]).length > 1) {
      styleForTrack.width = `${_value_[1] - _value_[0]}%`;
      styleForTrack.left = `${_value_[0]}%`;
    } else if (!value) {
      styleForTrack.width = `${_value_[0]}%`;
    } else if (Array.isArray(value) && value.length == 2) {
      styleForTrack.width = `${toPercent(value[1]) - toPercent(value[0])}%`;
      styleForTrack.left = `${toPercent(value[0])}%`;
    } else styleForTrack.width = `${toPercent(value[0])}%`;

    return (
      <span
        className={root.createClassNames() + ` ${className || ""}`}
        style={_style.styleFromSx}
        ref={rootRef}
      >
        <span className={rail.createClassNames()} />
        <span className={track.createClassNames()} style={styleForTrack} />

        {valuesToUse
          .filter((e) => e != undefined)
          .map((value, index) => (
            <ToolTip
              position={`${valueLabelPosition ?? "top"}-left`}
              title={(
                (valueLabelFormat && valueLabelFormat(fromPercent(value))) ??
                fromPercent(value)
              ).toString()}
              trigger="onMouseDown"
              style={{
                top: valueLabelPosition == "bottom" ? "35px" : "-25px",
              }}
              key={index}
            >
              <span
                className={thumb.createClassNames()}
                style={{ left: `${value}%` }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setSelected(
                    selected.map((e, _index_) =>
                      index == _index_ ? true : false
                    )
                  );
                }}
              >
                <input
                  {...props}
                  type="range"
                  className={input.createClassNames()}
                  readOnly={readOnly}
                  min={min}
                  max={max}
                  step={step}
                  value={fromPercent(value)}
                  onChange={() => {}}
                  ref={index == 0 ? ref : undefined}
                />
              </span>
            </ToolTip>
          ))}
      </span>
    );
  }
);

Slider.displayName = "Slider";
export default Slider;
