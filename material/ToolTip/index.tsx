import {
  cloneElement,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Typography from "../Typography";
import { useClickAwayListener, useMouseUpListener } from "../../utils";
import type { MuiProps } from "../../utils/base";

type triggers = "onClick" | "onMouseEnter" | "onFocus" | "onMouseDown";

type ToolTipProps = {
  position?:
    | "top-left"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left";
  children: JSX.Element;
  title: string | JSX.Element;
  trigger?: triggers | Array<triggers>;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  /**
   * auto close after X milliseconde
   */
  autoClose?: number;
} & React.HTMLAttributes<HTMLParagraphElement> &
  MuiProps;
type Variant = "default";
type SuffixType = ToolTipProps["position"] | "diplay";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  public makeColor = this.colorFromTheme({
    light: "rgb(255,255,255)",
    dark: "rgb(0,0,0)",
  });
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();

    this.makeDisaplayed();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        transition: "opacity ease-in-out",
        transitionDuration: "250ms",
        transitionDelay: "100ms",
        opacity: 0,
        display: "none",
        position: "absolute",
        color: this.colorFromTheme({
          light: "rgb(255,255,255)",
          dark: "rgb(0,0,0)",
        }),
        justifyContent: "center",
        backgroundColor: "rgba(97, 97, 97, 0.92)",
        borderRadius: "4px",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        padding: "4px 8px",
        fontSize: "0.6875rem",
        maxWidth: "300px",
        margin: "2px",
        wordWrap: "break-word",
        fontWeight: "500",
      },
    });
  }
  private makeDisaplayed() {
    this.makeStyleFor({
      suffix: "diplay",
      commonStyle: {
        opacity: 1,
        display: "flex",
      },
    });
  }
}

type StyleProp = {
  top: number;
  left: number;
  transform?: string;
};

export default function ToolTip({
  children,
  position,
  title,
  trigger,
  open,
  autoClose,
  onClose,
  onOpen,
  style,
  sx,
  className,
  ...props
}: ToolTipProps) {
  const [displayed, setDisplay] = useState(false);
  const [coordinate, setCoordinate] = useState<StyleProp>({
    top: 100,
    left: 100,
  });
  const _style = useStyle(sx, style);
  const ref = useClickAwayListener<HTMLDivElement>(() => {
    if (typeof open != "undefined" && onClose) onClose();
    if (!trigger) return;
    if (Array.isArray(trigger) && !trigger.includes("onClick")) return;
    if (trigger != "onClick") return;
    setDisplay(false);
  }, [trigger]);

  const toolTipRef = createRef<HTMLParagraphElement>();

  useMouseUpListener(() => {
    if (
      trigger == "onMouseDown" ||
      (Array.isArray(trigger) && trigger.includes("onMouseDown"))
    )
      setDisplay(false);
  });

  const [timer, _setTimer] = useState<Timer>();
  const setTimer = useCallback(() => {
    _setTimer((timer) => {
      clearTimeout(timer);
      return setTimeout(() => {
        onClose && onClose();
        if (open == undefined) setDisplay(false);
      }, autoClose || 0);
    });
  }, [timer]);

  const makeCoordinateStyle = useCallback<(t: HTMLDivElement) => StyleProp>(
    (t: HTMLDivElement) => {
      if (!t) return {} as StyleProp;

      const basePosition: StyleProp = {
        top: t.offsetTop + t.offsetHeight,
        left: t.offsetLeft + t.offsetWidth,
      };
      switch (position) {
        case "top-left":
          basePosition.top -=
            t.offsetHeight + (toolTipRef.current?.offsetHeight || 0) + 5;
          basePosition.left -= t.offsetWidth;
          basePosition.transform = "translateX(-100%)";
          break;
        case "top":
          basePosition.top -=
            t.offsetHeight + (toolTipRef.current?.offsetHeight || 0) + 5;
          basePosition.left -= t.offsetWidth / 2;
          basePosition.transform = "translate(-50%, -100%)";
          break;
        case "top-right":
          basePosition.top -=
            t.offsetHeight + (toolTipRef.current?.offsetHeight || 0) + 5;
          basePosition.transform = "translateX(-100%)";
          break;
        case "right":
          basePosition.transform = "translateY(-50%)";
          basePosition.top -= t.offsetHeight / 2;
          basePosition.left += 5;
          break;
        case "bottom-right":
          break;
        case "bottom":
          basePosition.left -= t.offsetWidth / 2;
          basePosition.transform = "translateX(-50%)";
          basePosition.top += 5;
          break;
        case "bottom-left":
          basePosition.left -= t.offsetWidth;
          basePosition.transform = "translateX(-100%)";
          basePosition.top += 5;
          break;
        case "left":
          basePosition.left -=
            t.offsetWidth + (toolTipRef.current?.offsetWidth || 0) + 5;
          basePosition.top -= t.offsetHeight / 2;
          basePosition.transform = "translate(-100%,-50%)";
          break;
      }

      return basePosition;
    },
    [(ref as React.RefObject<HTMLDivElement>).current]
  );
  const triggerFunction = useCallback((t: HTMLDivElement) => {
    setDisplay(true);
    if (!t) return;

    if (autoClose && open == undefined) setTimer();
    setCoordinate(
      makeCoordinateStyle(
        (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
      )
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    triggerFunction(
      (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
    );
  }, []);

  useEffect(() => {
    if (open == undefined) return;
    if (autoClose && open) setTimer();
    if (!open) setDisplay(false);
  }, [open]);

  if (
    JSON.stringify(
      makeCoordinateStyle(
        (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
      )
    ) != JSON.stringify(coordinate)
  )
    setCoordinate(
      makeCoordinateStyle(
        (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
      )
    );

  useEffect(() => {
    if (open)
      triggerFunction(
        (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
      );
  }, [open]);

  const root = useMemo(
    () =>
      new Root({
        ..._style,
        currentVariant: "default",
        staticClassName: "MUI_ToolTip_Root",
      }).setProps([displayed || open ? "diplay" : undefined]),
    [displayed, open]
  );

  const formatedTrigger: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = useMemo(() => {
    let formatedTrigger: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > = {};
    if (trigger && open == undefined) {
      if (!Array.isArray(trigger)) trigger = [trigger];
      for (const t of trigger) {
        switch (t) {
          case "onClick":
            formatedTrigger.onClick = (e) => {
              if (children.props.onClick) children.props.onClick(e);
              if (!e.isPropagationStopped())
                triggerFunction(
                  (ref as React.RefObject<HTMLDivElement>)
                    .current as HTMLDivElement
                );
            };
            break;
          case "onFocus":
            formatedTrigger.onFocus = (e) => {
              if (children.props.onFocus) children.props.onFocus(e);
              if (!e.isPropagationStopped())
                triggerFunction(
                  (ref as React.RefObject<HTMLDivElement>)
                    .current as HTMLDivElement
                );
            };
            break;
          case "onMouseEnter":
            formatedTrigger.onMouseEnter = (e) => {
              if (children.props.onMouseEnter) children.props.onMouseEnter(e);
              if (!e.isPropagationStopped())
                triggerFunction(
                  (ref as React.RefObject<HTMLDivElement>)
                    .current as HTMLDivElement
                );
            };
            formatedTrigger.onMouseLeave = (e) => {
              if (children.props.onMouseLeave) children.props.onMouseLeave(e);
              if (!e.isPropagationStopped()) setDisplay(false);
            };
            break;
          case "onMouseDown":
            formatedTrigger.onMouseDown = (e) => {
              if (children.props.onMouseDown) children.props.onMouseDown(e);
              if (!e.isPropagationStopped())
                triggerFunction(
                  (ref as React.RefObject<HTMLDivElement>)
                    .current as HTMLDivElement
                );
            };
            break;
        }
      }
    } else if (open == undefined) {
      formatedTrigger.onMouseEnter = (e) => {
        triggerFunction(
          (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
        );
        if (children.props.onMouseEnter) children.props.onMouseEnter(e);
      };
      formatedTrigger.onMouseLeave = (e) => {
        triggerFunction(
          (ref as React.RefObject<HTMLDivElement>).current as HTMLDivElement
        );
        if (children.props.onMouseLeave) children.props.onMouseLeave(e);
      };
    }

    return formatedTrigger;
  }, [trigger, ref]);

  const _children = useMemo(
    () =>
      cloneElement<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >
      >(children, {
        ...formatedTrigger,
        ref: ref,
      }),
    [ref, formatedTrigger, children]
  );

  return (
    <>
      {_children}
      <Typography
        className={root.createClassNames() + ` ${className || ""}`}
        style={{
          ...coordinate,
          color: root.makeColor,
          ..._style.styleFromSx,
        }}
        {...(props as any)}
        ref={toolTipRef}
      >
        {title}
      </Typography>
    </>
  );
}
