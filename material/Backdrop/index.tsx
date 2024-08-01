"use client";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { type HTMLAttributes } from "react";

type MuiBackdropProps = {} & HTMLAttributes<HTMLDivElement>;

type Variant = "default";
type SuffixType = "";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        opacity: "1",
        transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        position: "fixed",
        display: "flex",
        WebkitBoxAlign: "center",
        alignItems: "center",
        "--WebkitBoxPack": "center",
        justifyContent: "center",
        inset: "0px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "--WebkitTapHighlightColor": "transparent",
        zIndex: "-1",
      },
    });
  }
}

function Backdrop(props: HTMLAttributes<HTMLDivElement>) {
  const _style = useStyle();
  const root = new Root({
    ..._style,
    staticClassName: "MUI_Backdrop_Root",
    currentVariant: "default",
  });
  return (
    <div className={root.createClassNames()} aria-hidden="true" {...props} />
  );
}

export default Backdrop;
