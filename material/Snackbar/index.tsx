import Button from "../Button";
import {
  MuiBaseStyleUtils,
  useStyle,
  type CssProps,
  type MuiBaseStyleUtilsProps,
  type MuiTheme,
} from "../../style";
import { useClickAwayListener } from "../../utils";
import { useEffect, useState } from "react";
import type { MuiProps } from "../../utils/base";

type MuiSnackBarProps = {
  position:
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  transition?: "fade" | "slide" | "grow";
  /**
   * default onClick event close the SnackBar
   */
  actionButton?: JSX.Element | string;
  /**
   * second before automatic closing
   */
  autoHideDuration?: number;
  /**
   * Hide when a click occure on somewhere else then the SnackBar
   *  ( default: true )
   */
  HideOnClickAway?: boolean;
  opened?: boolean;
  onClose?: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
  children: any;
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;

const backgroundFromTheme = (theme: MuiTheme) => {
  switch (theme.theme) {
    case "light":
      return "rgb(50, 50, 50)";
    case "dark":
      return "rgb(250, 250, 250)";
  }
};

const fontColorsFromTheme = (theme: MuiTheme) => {
  switch (theme.theme) {
    case "light":
      return "rgb(255, 255, 255)";
    case "dark":
      return "rgb(0, 0, 0)";
  }
};

type Variant = MuiSnackBarProps["transition"];
type SuffixType =
  | "closed"
  | "opened"
  | "bottom"
  | "top"
  | MuiSnackBarProps["position"];

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSides();
    this.makeClosed();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        zIndex: "1400",
        position: "fixed",
        display: "none",
        transition: "ease-in-out 200ms",
        animationDuration: "1s",
      },
      fade: {
        ":customStyle": `
          @keyframes SnackBarCloseAnimationFade {
              from {
                  opacity: 1;
                  display: flex;
              }
              to {
                  opacity: 0;
              }
          }
          @keyframes SnackBarOpenAnimationFade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
          }
        `,
      },
      grow: {
        ":customStyle": `
          @keyframes SnackBarCloseAnimationGrow {
              from {
                  transform: scale(1);
                  display: flex;
              }
              to {
                  transform: scale(0);
              }
          }
          @keyframes SnackBarOpenAnimationGrow {
            from {
                transform: scale(0);
            }
            to {
                transform: scale(1);
            }
          }
        `,
      },
      slide: {
        ":customStyle": `
            @keyframes SnackBarCloseAnimationSlideTop {
                from {
                    display: flex;
                }
                to {
                    transform: translateY(-200px);
                }
            }
            @keyframes SnackBarOpenAnimationSlideTop {
              from {
                  transform: translateY(-200px);
              }
              to {}
            }

            @keyframes SnackBarCloseAnimationSlideBottom {
                from {
                    display: flex;
                }
                to {
                    transform: translateY(200px);
                }
            }
            @keyframes SnackBarOpenAnimationSlideBottom {
              from {
                  transform: translateY(200px);
              }
              to {
              }
            }
        `,
      },
    });
  }
  private createMedia(css: CssProps) {
    return `@media (min-width: 600px) {
          .<!ID!> { ${this.styleContext.styleToString(css)}
          }}`;
  }
  private makeClosed() {
    this.makeStyleFor({
      suffix: "closed",
      commonStyle: {
        display: "none",
      },
      variants: {
        fade: {
          animationName: "SnackBarCloseAnimationFade",
        },
        grow: {
          animationName: "SnackBarCloseAnimationGrow",
          animationDuration: "0.3s",
        },
        slide: {
          animationDuration: "0.3",
          ":customStyle": `
          .<!ID!>.MUI_Snackbar_root_bottom {
            animation-name: SnackBarCloseAnimationSlideBottom
          }
          .<!ID!>.MUI_Snackbar_root_top {
            animation-name: SnackBarCloseAnimationSlideTop
          }
          `,
        },
      },
    });
    this.makeStyleFor({
      suffix: "opened",
      commonStyle: {
        display: "flex",
      },
      variants: {
        fade: {
          animationName: "SnackBarOpenAnimationFade",
        },
        grow: {
          animationName: "SnackBarOpenAnimationGrow",
          animationDuration: "0.5s",
        },
        slide: {
          animationDuration: "0.3",
          ":customStyle": `
          .<!ID!>.MUI_Snackbar_root_bottom {
            animation-name: SnackBarOpenAnimationSlideBottom
          }
          .<!ID!>.MUI_Snackbar_root_top {
            animation-name: SnackBarOpenAnimationSlideTop
          }
          `,
        },
      },
    });
  }
  private makeSides() {
    this.makeStyleFor({
      suffix: "top-left",
      commonStyle: {
        left: "8px",
        right: "8px",
        "--WebkitBoxPack": "start",
        justifyContent: "flex-start",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        top: "8px",
        ":customStyle": this.createMedia({
          top: "24px",
          left: "24px",
          right: "auto",
        }),
      },
    });
    this.makeStyleFor({
      suffix: "top-center",
      commonStyle: {
        display: "flex",
        left: "8px",
        right: "8px",
        "--WebkitBoxPack": "center",
        justifyContent: "center",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        top: "8px",
        ":customStyle": `
        @media (min-width: 600px) {
          .<!ID!> { ${this.styleContext.styleToString({
            top: "24px",
            left: "50%",
            right: "auto",
            transform: "translateX(-50%)",
          })}}}`,
      },
    });
    this.makeStyleFor({
      suffix: "top-right",
      commonStyle: {
        left: "8px",
        right: "8px",
        "--WebkitBoxPack": "end",
        justifyContent: "flex-end",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        top: "8px",
        ":customStyle": this.createMedia({
          top: "24px",
          right: "24px",
          left: "auto",
        }),
      },
    });
    this.makeStyleFor({
      suffix: "bottom-left",
      commonStyle: {
        zIndex: "1400",
        position: "fixed",
        display: "flex",
        left: "8px",
        right: "8px",
        "--WebkitBoxPack": "start",
        justifyContent: "flex-start",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        bottom: "8px",
        ":customStyle": this.createMedia({
          bottom: "24px",
          left: "24px",
          right: "auto",
        }),
      },
    });
    this.makeStyleFor({
      suffix: "bottom-center",
      commonStyle: {
        left: "8px",
        right: "8px",
        "--WebkitBoxPack": "center",
        justifyContent: "center",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        bottom: "8px",
        ":customStyle": this.createMedia({
          bottom: "24px",
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
        }),
      },
    });
    this.makeStyleFor({
      suffix: "bottom-right",
      commonStyle: {
        left: "8px",
        right: "8px",
        "--WebkitBoxPack": "end",
        justifyContent: "flex-end",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        bottom: "8px",
        ":customStyle": this.createMedia({
          bottom: "24px",
          right: "24px",
          left: "auto",
        }),
      },
    });

    this.makeStyleFor({
      suffix: "top",
    });
    this.makeStyleFor({
      suffix: "bottom",
    });
  }
}

class Paper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    const minWidth600Style: CssProps = {
      "--WebkitBoxFlex": "initial",
      flexGrow: "initial",
      minWidth: "288px",
    };

    this.makeDefaultStyle({
      commonStyle: {
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "0.875rem",
        lineHeight: "1.43",
        letterSpacing: "0.01071em",
        color: fontColorsFromTheme(this.theme),
        backgroundColor: backgroundFromTheme(this.theme),
        display: "flex",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "6px 16px",
        borderRadius: "4px",
        "--WebkitBoxFlex": "1",
        flexGrow: "1",
        opacity: "1",
        transform: "none",
        ":customStyle": `@media (min-width: 600px) { 
            .<!ID!> { ${this.styleContext.styleToString(minWidth600Style)} } }`,
      },
    });
  }
}

class MessageContainer extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        padding: "8px 0px",
      },
    });
  }
}

class ActionContainer extends MuiBaseStyleUtils<Variant, SuffixType> {
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
        marginLeft: "auto",
        paddingLeft: "16px",
        marginRight: "-8px",
      },
    });
  }
}

export default function SnackBar({
  className,
  sx,
  style,
  children,
  opened,
  color,
  actionButton,
  ...props
}: MuiSnackBarProps) {
  const [isInited, setInited] = useState(false);
  const [isOpen, setOpenState] = useState<boolean>(opened as boolean);
  const ref = useClickAwayListener<HTMLDivElement>(() => {
    if (props.HideOnClickAway === false) return;
    if (isOpen) setOpenState(false);
    if (props.onClose) props.onClose(setOpenState);
  });
  const _style = useStyle();

  useEffect(() => {
    if (!props.autoHideDuration || !isOpen) return;
    setTimeout(() => {
      setOpenState(false);
    }, props.autoHideDuration * 1000);
  }, [isOpen]);

  if (opened && !isOpen && !isInited) {
    setOpenState(true);
    setInited(true);
  } else if (!opened && isInited) {
    setInited(false);
    setOpenState(false);
  }

  const setter: Partial<
    Record<
      Exclude<SuffixType, undefined> | "position" | "topOrBottom",
      SuffixType | undefined
    >
  > = {
    opened: isOpen === true ? "opened" : undefined,
    closed: !isOpen ? "closed" : undefined,
    position: props.position ? props.position : "bottom-left",
    topOrBottom: props.position.startsWith("bottom") ? "bottom" : "top",
  };

  const root = new Root({
    staticClassName: "MUI_Snackbar_root",
    currentVariant: props.transition || "fade",
    ..._style,
  }).setProps([
    setter.opened,
    setter.closed,
    setter.position,
    setter.topOrBottom,
  ]);

  const paper = new Paper({
    staticClassName: "MUI_Snackbar_paper",
    currentVariant: "fade",
    ..._style,
  });

  const messageContainer = new MessageContainer({
    staticClassName: "MUI_Snackbar_Message_Container",
    currentVariant: "fade",
    ..._style,
  });

  const actionContainer = new ActionContainer({
    staticClassName: "MUI_Snackbar_Action_Container",
    currentVariant: "fade",
    ..._style,
  });

  return (
    <div
      ref={ref}
      role="presentation"
      className={root.createClassNames() + ` ${className || ""}`}
      style={_style.styleFromSx}
      {...props}
    >
      <div className={paper.createClassNames()} role="alert">
        <div className={messageContainer.createClassNames()}>{children}</div>
        {actionButton && (
          <div className={actionContainer.createClassNames()}>
            {typeof actionButton == "string" ? (
              <Button
                variant="text"
                onClick={() => setOpenState(false)}
                style={{ color: "rgb(0, 121, 107)" }}
              >
                {actionButton}
              </Button>
            ) : (
              actionButton
            )}
          </div>
        )}
      </div>
    </div>
  );
}
