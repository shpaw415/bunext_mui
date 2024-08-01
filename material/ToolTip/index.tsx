import {
  cloneElement,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Typography from "../Typography";
import { useClickAwayListener, useMouseUpListener } from "../../utils";

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
} & React.HTMLAttributes<HTMLParagraphElement>;
type Variant = "default";
type SuffixType = ToolTipProps["position"] | "diplay";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
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
        position: "absolute",
        color: this.colorFromTheme({
          light: "rgb(255,255,255)",
          dark: "rgb(0,0,0)",
        }),
        display: "flex",
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
      },
    });
  }
  public makeColor() {
    return this.colorFromTheme({
      light: "rgb(255,255,255)",
      dark: "rgb(0,0,0)",
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
  style,
  ...props
}: ToolTipProps) {
  const [displayed, setDisplay] = useState(false);
  const [coordinate, setCoordinate] = useState<StyleProp>({
    top: 100,
    left: 100,
  });
  const _style = useStyle();
  const ref = useClickAwayListener<HTMLDivElement>(() => {
    if (!trigger) return;
    if (Array.isArray(trigger) && !trigger.includes("onClick")) return;
    if (trigger != "onClick") return;
    setDisplay(false);
  });

  const toolTipRef = createRef<HTMLParagraphElement>();

  useMouseUpListener(() => {
    if (
      trigger == "onMouseDown" ||
      (Array.isArray(trigger) && trigger.includes("onMouseDown"))
    )
      setDisplay(false);
  });

  const unTriggerFunction = useCallback(() => setDisplay(false), []);
  const makeCoordinateStyle = useCallback<() => StyleProp>(() => {
    const t = (ref as React.RefObject<HTMLDivElement>).current;
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
        basePosition.transform = "translateX(-100%)";
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
  }, []);
  const triggerFunction = useCallback(() => {
    const t = (ref as React.RefObject<HTMLDivElement>).current;
    setDisplay(true);
    if (!t) return;

    if (autoClose) {
      setTimeout(() => unTriggerFunction, autoClose);
    }
    setCoordinate(makeCoordinateStyle());
  }, [(ref as React.RefObject<HTMLDivElement>).current]);

  useEffect(() => {
    if (!open) return;
    triggerFunction();
  }, []);

  if (JSON.stringify(makeCoordinateStyle()) != JSON.stringify(coordinate))
    setCoordinate(makeCoordinateStyle());

  if (open != undefined && open != displayed) {
    setDisplay(open);
    triggerFunction();
  }

  const root = new Root({
    ..._style,
    currentVariant: "default",
    staticClassName: "MUI_ToolTip_Root",
  }).setProps([displayed || open ? "diplay" : undefined]);

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
            triggerFunction();
            if (children.props.onClick) children.props.onClick(e);
          };
          break;
        case "onFocus":
          formatedTrigger.onFocus = (e) => {
            triggerFunction();
            if (children.props.onFocus) children.props.onFocus(e);
          };
          break;
        case "onMouseEnter":
          formatedTrigger.onMouseEnter = (e) => {
            triggerFunction();
            if (children.props.onMouseEnter) children.props.onMouseEnter(e);
          };
          formatedTrigger.onMouseLeave = (e) => {
            unTriggerFunction();
            if (children.props.onMouseLeave) children.props.onMouseLeave(e);
          };
          break;
        case "onMouseDown":
          formatedTrigger.onMouseDown = (e) => {
            triggerFunction();
            if (children.props.onMouseDown) children.props.onMouseDown(e);
          };
          break;
      }
    }
  } else if (open == undefined) {
    formatedTrigger.onMouseEnter = (e) => {
      triggerFunction();
      if (children.props.onMouseEnter) children.props.onMouseEnter(e);
    };
    formatedTrigger.onMouseLeave = (e) => {
      triggerFunction();
      if (children.props.onMouseLeave) children.props.onMouseLeave(e);
    };
  }

  return (
    <>
      {cloneElement<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >
      >(children, {
        ...formatedTrigger,
        ref: ref,
      })}
      <Typography
        className={root.createClassNames()}
        style={{
          ...coordinate,
          color: root.makeColor(),
          ...(style ? style : {}),
        }}
        {...(props as any)}
        ref={toolTipRef}
      >
        {title}
      </Typography>
    </>
  );
}
