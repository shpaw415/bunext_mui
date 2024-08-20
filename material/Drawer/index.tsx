import Backdrop from "../Backdrop";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Paper from "../Paper";
import React, { useState } from "react";
import type { MuiProps } from "../../utils/base";

type DrawerProps = {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  position?: "top" | "right" | "bottom" | "left";
  children: JSX.Element | JSX.Element[];
  width?: React.CSSProperties["width"];
} & React.HTMLAttributes<HTMLDivElement> &
  MuiProps;

type Variant = DrawerProps["position"];
type SuffixType = "opened" | "closed" | "restrained";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        position: "fixed",
        zIndex: 1200,
        inset: "0px",
        transition: "transform 1000ms",
        display: "flex",
      },
    });
  }
}

class DrawerBox extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpenstate();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        transform: "none",
        transition: "transform 700ms cubic-bezier(0, 0, 0.2, 1)",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        width: "fit-content",
        maxWidth: 250,
      },
    });
  }
  private makeOpenstate() {
    this.makeStyleFor({
      suffix: "closed",
      variants: {
        left: {
          transform: "translateX(-200%)",
        },
      },
    });
  }
}
export default function Drawer({
  open,
  position,
  children,
  onClose,
  onOpen,
  style,
  sx,
  className,
  width,
  ...props
}: DrawerProps) {
  const _style = useStyle(sx, style);
  const [displayed, setDisplayed] = useState<"hidden" | "visible">("hidden");
  const currentVariant = position ?? "left";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Drawer_Root",
    currentVariant,
  });

  const drawerBox = new DrawerBox({
    ..._style,
    staticClassName: "MUI_Drawer_Box",
    currentVariant,
  }).setProps([open ? "opened" : "closed"]);

  if (!open && displayed == "visible")
    setTimeout(() => setDisplayed("hidden"), 500);
  else if (open && displayed == "hidden") setDisplayed("visible");
  return (
    <div
      className={root.createClassNames()}
      style={{
        visibility: open ? "visible" : displayed,
      }}
    >
      <Backdrop
        onClick={onClose}
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 250ms",
        }}
      />
      <div
        className={`${className || ""} ` + drawerBox.createClassNames()}
        style={{
          minWidth: width,
          width: width,
        }}
      >
        <Paper
          style={{
            margin: 0,
            paddingTop: 0,
            minHeight: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            borderRadius: "0",
            minWidth: width || 250,
            ..._style.styleFromSx,
          }}
          {...props}
        >
          {children}
        </Paper>
      </div>
    </div>
  );
}
