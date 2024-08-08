import Paper from "../Paper";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";

import ExpendIcon from "@material-design-icons/svg/filled/keyboard_arrow_down.svg";
import { useEffect, useRef } from "react";
import type { MuiProps } from "../../utils/base";

type AccordionProps = {
  children: string | JSX.Element;
  disabled?: boolean;
  summary: string | JSX.Element | JSX.Element[];
  expended?: boolean;
  onChange?: () => void;
  actionButtons?: JSX.Element | JSX.Element[];
  expendIcon?: () => JSX.Element;
} & React.HTMLAttributes<HTMLDivElement> &
  MuiProps;

type Variant = "default";
type SuffixType = "disabled" | "expended";

class PaperMod extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeExpended();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        backgroundColor: this.colorFromTheme({
          light: "rgb(255, 255, 255)",
          dark: "rgb(18, 18, 18)",
        }),
        color: this.colorFromTheme({
          light: "rgba(0, 0, 0, 0.87)",
          dark: "rgb(255, 255, 255)",
        }),
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        position: "relative",
        transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        overflowAnchor: "none",
        borderRadius: "0px",
        ":before": {
          position: "absolute",
          left: "0px",
          top: "-1px",
          right: "0px",
          height: "1px",
          content: '""',
          opacity: "1",
          backgroundColor: "rgba(0, 0, 0, 0.12)",
          transition:
            "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    });
  }
  private makeExpended() {
    this.makeStyleFor({
      suffix: "expended",
      commonStyle: {
        ":before": {
          opacity: "0",
        },
      },
    });
  }
}

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeExpended();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        "--WebkitBoxPack": "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        "--WebkitTapHighlightColor": "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        borderRadius: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        minHeight: "48px",
        padding: "0px 16px",
        transition:
          "min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    });
  }
  private makeExpended() {
    this.makeStyleFor({
      suffix: "expended",
      commonStyle: {
        minHeight: "64px",
      },
    });
  }
}

class Summary extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeExpended();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        "--WebkitBoxFlex": "1",
        flexGrow: "1",
        margin: "12px 0px",
        transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    });
  }
  private makeExpended() {
    this.makeStyleFor({
      suffix: "expended",
      commonStyle: {
        margin: "20px 0px",
      },
    });
  }
}

class ExpendIconWrapper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeExpended();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        color: "rgba(0, 0, 0, 0.54)",
        transform: "rotate(0deg)",
        transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    });
  }
  private makeExpended() {
    this.makeStyleFor({
      suffix: "expended",
      commonStyle: {
        transform: "rotate(180deg)",
      },
    });
  }
}

class ContentRoot extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeExtended();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        minHeight: "0px",
        height: "0px",
        overflowY: "hidden",
        "--WebkitTransition": "height 450ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    });
  }
  private makeExtended() {
    this.makeStyleFor({
      suffix: "expended",
      commonStyle: {
        overflowY: "visible",
        visibility: "visible",
        height: "auto",
      },
    });
  }
}

class ContentWrapper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        width: "100%",
      },
    });
  }
}

class ContentWrapperInner extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        width: "100%",
      },
    });
  }
}

class Content extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        padding: "8px 16px 16px",
      },
    });
  }
}

class Actions extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        padding: "8px",
        "--WebkitBoxPack": "end",
        justifyContent: "flex-end",
      },
    });
  }
}

export default function Accordion({
  summary,
  disabled,
  expended,
  onChange,
  actionButtons,
  onClick,
  className,
  style,
  sx,
  expendIcon,
  children,
  ...props
}: AccordionProps) {
  const _style = useStyle(sx, style);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expended) return;
    else {
      contentRef.current?.setAttribute(
        "style",
        `height: ${actionButtons ? 120 : 78}px; overflow-Y: hidden;`
      );
      setTimeout(() => {
        contentRef.current?.setAttribute("style", "");
      }, 150);
    }
  });

  const currentVariant = "default";

  const setter: Record<SuffixType, SuffixType | undefined> = {
    expended: expended ? "expended" : undefined,
    disabled: disabled ? "disabled" : undefined,
  };

  const paper = new PaperMod({
    ..._style,
    staticClassName: "MUI_Accordion_Paper",
    currentVariant: "default",
  }).setProps([setter.expended]);

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Accordion_Root",
    currentVariant,
  }).setProps([setter.expended]);

  const _summary = new Summary({
    ..._style,
    staticClassName: "MUI_Accordion_Summary",
    currentVariant: "default",
  }).setProps([setter.expended]);

  const extendWrapper = new ExpendIconWrapper({
    ..._style,
    staticClassName: "MUI_Accordion_ExpendWrapper",
    currentVariant: "default",
  }).setProps([setter.expended]);

  const contentRoot = new ContentRoot({
    ..._style,
    staticClassName: "MUI_Accordion_Content_Root",
    currentVariant: "default",
  }).setProps([setter.expended]);

  const contentWrapper = new ContentWrapper({
    ..._style,
    staticClassName: "MUI_Accordion_Content_Wrapper",
    currentVariant: "default",
  });

  const contentWrapperInner = new ContentWrapperInner({
    ..._style,
    staticClassName: "MUI_Accordion_Content_Wrapper_Inner",
    currentVariant: "default",
  });

  const content = new Content({
    ..._style,
    staticClassName: "MUI_Accordion_Content",
    currentVariant: "default",
  });

  const actions = new Actions({
    ..._style,
    staticClassName: "MUI_Accordion_Actions",
    currentVariant: "default",
  });

  return (
    <Paper
      className={paper.createClassNames() + ` ${className || ""}`}
      onClick={(ev) => {
        onChange && onChange();
        onClick && onClick(ev);
      }}
      style={_style.styleFromSx}
      {...props}
    >
      <div className={root.createClassNames()} role="button" tabIndex={0}>
        <div className={_summary.createClassNames()}>{summary}</div>
        <div className={extendWrapper.createClassNames()}>
          {expendIcon ? expendIcon() : <ExpendIcon />}
        </div>
      </div>
      <div className={contentRoot.createClassNames()} ref={contentRef}>
        <div className={contentWrapper.createClassNames()}>
          <div className={contentWrapperInner.createClassNames()}>
            <div>
              <div className={content.createClassNames()}>{children}</div>
              <div className={actions.createClassNames()}>
                {actionButtons && actionButtons}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
