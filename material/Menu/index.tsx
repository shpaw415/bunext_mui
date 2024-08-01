import Paper from "../Paper";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Typography from "../Typography";
import MuiBase from "../../utils/base";
import { useCallback, useEffect, useState } from "react";
type MenuProps = {
  open?: boolean;
  children: JSX.Element | JSX.Element[];
  anchor?: React.RefObject<HTMLElement>;
  offsetLeft?: number;
  offsetTop?: number;
  position?: "bottom" | "left" | "right" | "over";
} & React.HTMLAttributes<HTMLDivElement>;
type Variant = "default";
type SuffixType = "opened" | "closed";

class Wrapper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpenState();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        width: "fit-content",
        height: "fit-content",
      },
    });
  }
  private makeOpenState() {
    this.makeStyleFor({
      suffix: "closed",
      commonStyle: {
        transform: "scale(0,0) translateX(50%)",
        opacity: 0,
      },
    });
  }
}
class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpenState();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        listStyle: "none",
        margin: "0px",
        padding: "8px 0px",
        position: "relative",
      },
    });
  }

  private makeOpenState() {
    this.makeStyleFor({
      suffix: "closed",
      commonStyle: {
        transform: "scale(0,0)",
        overflow: "hidden",
      },
    });
  }
}

export default function Menu({
  children,
  open,
  anchor,
  style,
  className,
  offsetLeft,
  offsetTop,
  position,
  ...props
}: MenuProps) {
  const _style = useStyle();
  const [_position_, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const currentVariant: Variant = "default";

  const wrapper = new Wrapper({
    ..._style,
    staticClassName: "MUI_Menu_Wrapper",
    currentVariant,
  }).setProps([open ? "opened" : "closed"]);

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Menu_Root",
    currentVariant,
  }).setProps([open ? "opened" : "closed"]);

  const AddPositionOffset = useCallback<(from: "top" | "left") => number>(
    (from) => {
      if (
        (_position_.top == anchor?.current?.offsetTop &&
          _position_.left == anchor?.current?.offsetLeft) ||
        !anchor ||
        !anchor.current ||
        !position ||
        position == "over"
      )
        return 0;

      const el = anchor.current;

      if (from == "top") {
        switch (position) {
          case "bottom":
            return el.offsetHeight * 2;
          case "left":
            return 0;
          case "right":
            return 0;
        }
      } else if (from == "left") {
        switch (position) {
          case "bottom":
            return 0;
          case "left":
            return -el.offsetWidth * 2;
          case "right":
            return el.offsetWidth;
        }
      }
      return 0;
    },
    []
  );

  useEffect(() => {
    if (
      (_position_.top == anchor?.current?.offsetTop &&
        _position_.left == anchor?.current?.offsetLeft) ||
      !anchor ||
      !anchor.current
    )
      return;

    setPosition({
      top: anchor.current.offsetTop,
      left: anchor.current.offsetLeft,
    });
  });

  return (
    <Paper
      className={wrapper.createClassNames() + ` ${className}`}
      style={{
        transition: "250ms ease-in-out",
        position: "absolute",
        margin: 0,
        top: _position_.top + (offsetTop ?? 0) + AddPositionOffset("top"),
        left: _position_.left + (offsetLeft ?? 0) + AddPositionOffset("left"),
        ...style,
      }}
      {...props}
    >
      <ul className={root.createClassNames()} role="menu" tabIndex={-1}>
        {children}
      </ul>
    </Paper>
  );
}

type MenuElementProps = {
  children: string;
  StartElement?: JSX.Element;
  EndElement?: JSX.Element | string;
  /**
   * add space to replace the startElement
   */
  offSet?: boolean;
} & React.HTMLAttributes<HTMLLIElement>;

class ElementRoot extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        "-WebkitTapHighlightColor": "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        borderRadius: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        color: "inherit",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
        display: "flex",
        "-WebkitBoxPack": "start",
        justifyContent: "flex-start",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        position: "relative",
        textDecoration: "none",
        padding: "6px 16px",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "100%",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    });
  }
  public TextThemeColorContent() {
    return this.colorFromTheme({
      light: "rgba(0, 0, 0)",
      dark: "rgb(255,255,255)",
    });
  }
  public TextThemeColorEndElement() {
    return this.colorFromTheme({
      light: "rgba(0, 0, 0, 0.6)",
      dark: "rgba(255,255,255 0.6)",
    });
  }
}

class StartIconElement extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        minWidth: "56px",
        color: "rgba(0, 0, 0, 0.54)",
        flexShrink: "0",
        display: "inline-flex",
      },
    });
  }
}

export function MenuElement({
  children,
  StartElement,
  EndElement,
  offSet,
  ...props
}: MenuElementProps) {
  const _style = useStyle();

  const currentVariant: Variant = "default";

  const root = new ElementRoot({
    ..._style,
    staticClassName: "MUI_Menu_Element_Root",
    currentVariant,
  });

  const startElement = new StartIconElement({
    ..._style,
    staticClassName: "MUI_Menu_Element_StartIcon",
    currentVariant,
  });

  return (
    <li className={root.createClassNames()} {...props}>
      <MuiBase
        ripple
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {StartElement && (
          <div className={startElement.createClassNames()}>{StartElement}</div>
        )}
        {!StartElement && offSet && (
          <div className={startElement.createClassNames()} />
        )}
        <Typography
          style={{
            flex: "1 1 auto",
            minWidth: "0px",
            color: root.TextThemeColorContent(),
          }}
        >
          {children}
        </Typography>
        {typeof EndElement == "string" ? (
          <Typography
            style={{
              fontWeight: "400",
              fontSize: "0.875rem",
              letterSpacing: "0.01071em",
              color: root.TextThemeColorEndElement(),
            }}
          >
            {EndElement}
          </Typography>
        ) : (
          EndElement
        )}
      </MuiBase>
    </li>
  );
}
