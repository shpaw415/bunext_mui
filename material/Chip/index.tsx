import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { createRef } from "react";
import CloseSvgImage from "@material-design-icons/svg/filled/close.svg";
import type { MuiProps } from "../../utils/base";

type MuiChipProps = {
  label: string;
  variant?: "filled" | "outlined";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * @param el the chip element reference
   */
  onDelete?: (el: React.RefObject<HTMLDivElement>) => void;
  deleteIcon?: () => JSX.Element;
  Icon?: () => JSX.Element;
  avatar?: JSX.Element;
  color?: "success" | "error" | "primary" | "default" | "secondary";
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;
type Variant = Exclude<MuiChipProps["variant"], undefined>;
type SuffixType = "clickable" | MuiChipProps["color"];

function makeFill(color: string) {
  return `.<!ID!> > svg { fill: ${color}; }`;
}

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeClickable();
    this.makeColors();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        maxWidth: "100%",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.8125rem",
        display: "inline-flex",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        "-WebkitBoxPack": "center",
        justifyContent: "center",
        height: "32px",
        color: this.colorFromTheme({
          light: "rgba(0,0,0, 0.87)",
          dark: "rgb(255,255,255)",
        }),
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "16px",
        cursor: "unset",
        whiteSpace: "nowrap",
        outline: "0px",
        textDecoration: "none",
        padding: "0px",
        boxSizing: "border-box",
        verticalAlign: "middle",
      },
      outlined: {
        backgroundColor: "transparent",
        border: "1px solid rgb(97, 97, 97)",
      },
      filled: {
        backgroundColor: this.colorFromTheme({
          dark: "rgba(255, 255, 255, 0.16)",
          light: "rgba(0,0,0, 0.08)",
        }),
        border: "0px",
      },
    });
  }
  private makeClickable() {
    this.makeStyleFor({
      suffix: "clickable",
      commonStyle: {
        cursor: "pointer",
      },
      variants: {
        filled: {
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          },
        },
        outlined: {
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "primary",
      commonStyle: {
        borderColor: this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        }),
      },
      variants: {
        filled: {
          backgroundColor: this.colorFromTheme({
            light: this.theme.primary.light,
            dark: this.theme.primary.dark,
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "secondary",
      commonStyle: {
        borderColor: this.colorFromTheme({
          light: this.theme.secondary.light,
          dark: this.theme.secondary.dark,
        }),
      },
      variants: {
        filled: {
          backgroundColor: this.colorFromTheme({
            light: this.theme.secondary.light,
            dark: this.theme.secondary.dark,
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "error",
      commonStyle: {
        borderColor: this.colorFromTheme({
          light: this.theme.error.light,
          dark: this.theme.error.dark,
        }),
      },
      variants: {
        filled: {
          backgroundColor: this.colorFromTheme({
            light: this.theme.error.light,
            dark: this.theme.error.dark,
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "success",
      commonStyle: {
        borderColor: this.colorFromTheme({
          light: this.theme.success.light,
          dark: this.theme.success.dark,
        }),
      },
      variants: {
        filled: {
          backgroundColor: this.colorFromTheme({
            light: this.theme.success.light,
            dark: this.theme.success.dark,
          }),
        },
      },
    });
  }
}

class Label extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColors();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        paddingLeft: "12px",
        paddingRight: "12px",
        whiteSpace: "nowrap",
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "primary",
      variants: {
        filled: {
          color: "white",
        },
        outlined: {
          color: this.colorFromTheme({
            light: this.theme.primary.light,
            dark: this.theme.primary.dark,
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "secondary",
      variants: {
        filled: {
          color: "white",
        },
        outlined: {
          color: this.colorFromTheme({
            light: this.theme.secondary.light,
            dark: this.theme.secondary.dark,
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "error",
      variants: {
        filled: {
          color: this.colorFromTheme({
            light: "rgb(255,255,255)",
            dark: "rgb(0,0,0)",
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "success",
      variants: {
        filled: {
          color: this.colorFromTheme({
            light: "rgb(255,255,255)",
            dark: "rgb(0,0,0)",
          }),
        },
      },
    });
  }
}

class SvgClose extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColors();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        borderRadius: "50%",
        color: "rgba(0, 0, 0, 0.4)",
        margin: "0 4px 0 4px",
        scale: "0.76",
        cursor: "pointer",
        ":customStyle": makeFill(
          this.colorFromTheme({
            light: "rgb(255, 255, 255)",
            dark: "rgba(0,0,0, 0.4)",
          })
        ),
        backgroundColor: "rgba(0,0,0, 0.26)",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "primary",
      variants: {
        filled: {
          ":customStyle": makeFill(
            this.colorFromTheme({
              light: this.theme.primary.light,
              dark: this.theme.primary.dark,
            })
          ),
          backgroundColor: this.colorFromTheme({
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(0, 0, 0, 0.7)",
          }),
        },

        outlined: {
          ":customStyle": makeFill(
            this.colorFromTheme({
              light: "rgb(255,255,255)",
              dark: "rgb(0,0,0)",
            })
          ),
          backgroundColor: this.colorFromTheme({
            light: this.theme.primary.light,
            dark: this.theme.primary.dark,
          }),
        },
      },
    });

    this.makeStyleFor({
      suffix: "secondary",
      variants: {
        filled: {
          ":customStyle": makeFill(
            this.colorFromTheme({
              light: this.theme.secondary.light,
              dark: this.theme.secondary.dark,
            })
          ),
          backgroundColor: this.colorFromTheme({
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(0, 0, 0, 0.7)",
          }),
        },

        outlined: {
          ":customStyle": makeFill(
            this.colorFromTheme({
              light: "rgb(255,255,255)",
              dark: "rgb(0,0,0)",
            })
          ),
          backgroundColor: this.colorFromTheme({
            light: `rgba(${this.extractColorToRGB(
              this.theme.secondary.light
            ).join(", ")}, 0.7)`,
            dark: `rgba(${this.extractColorToRGB(
              this.theme.secondary.dark
            ).join(", ")}, 0.7)`,
          }),
          ":hover": {
            backgroundColor: this.colorFromTheme({
              light: this.theme.secondary.light,
              dark: this.theme.secondary.dark,
            }),
          },
        },
      },
    });

    this.makeStyleFor({
      suffix: "error",
      commonStyle: {
        ":customStyle": makeFill(
          this.colorFromTheme({
            light: this.theme.error.light,
            dark: this.theme.error.dark,
          })
        ),
      },
      variants: {
        filled: {
          backgroundColor: this.colorFromTheme({
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(0, 0, 0, 0.7)",
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "success",
      commonStyle: {
        ":customStyle": makeFill(
          this.colorFromTheme({
            light: this.theme.success.light,
            dark: this.theme.success.dark,
          })
        ),
      },
      variants: {
        filled: {
          backgroundColor: this.colorFromTheme({
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(0, 0, 0, 0.7)",
          }),
          ":hover": {
            backgroundColor: this.colorFromTheme({
              light: "rgba(255, 255, 255, 0.87)",
              dark: "rgba(0, 0, 0, 0.87)",
            }),
          },
        },
      },
    });
  }
}

class SvgIcon extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColors();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        borderRadius: "50%",
        color: "rgba(0, 0, 0, 0.4)",
        scale: "0.6",
        transform: "translateX(-6px)",
        ":customStyle": `.<!ID!> > svg { fill: white; }`,
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "primary",
      commonStyle: {
        ":customStyle": `.<!ID!> > svg { fill: ${this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        })}; }`,
      },
    });
    this.makeStyleFor({
      suffix: "error",
      commonStyle: {
        ":customStyle": `.<!ID!> > svg { fill: ${this.colorFromTheme({
          light: this.theme.error.light,
          dark: this.theme.error.dark,
        })}; }`,
      },
    });
    this.makeStyleFor({
      suffix: "success",
      commonStyle: {
        ":customStyle": `.<!ID!> > svg { fill: ${this.colorFromTheme({
          light: this.theme.success.light,
          dark: this.theme.success.dark,
        })}; }`,
      },
    });
  }
}

export default function Chip({
  sx,
  style,
  className,
  children,
  onDelete,
  deleteIcon,
  ...props
}: MuiChipProps) {
  const _style = useStyle(sx, style);
  const ref = createRef<HTMLDivElement>();
  const currentVariant = props.variant || "filled";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Chip_Root",
    currentVariant,
  }).setProps([props.onClick ? "clickable" : undefined, props.color]);

  const label = new Label({
    ..._style,
    staticClassName: "MUI_Chip_Label",
    currentVariant,
  }).setProps([props.color]);

  const svgClose = new SvgClose({
    ..._style,
    staticClassName: "MUI_Chip_Close_Svg_Wrapper",
    currentVariant,
  }).setProps([props.color]);

  const svgIcon = new SvgIcon({
    ..._style,
    staticClassName: "MUI_Chip_Icon_Svg_Wrapper",
    currentVariant,
  }).setProps([props.color]);

  const Icon: JSX.Element | undefined =
    props.avatar || (props.Icon && props.Icon());

  return (
    <div
      className={root.createClassNames() + ` ${className || ""}`}
      ref={ref}
      style={_style.styleFromSx}
      {...props}
    >
      {Icon && <div className={svgIcon.createClassNames()}>{Icon}</div>}
      <span className={label.createClassNames()}>{props.label}</span>
      {onDelete && (
        <div
          className={svgClose.createClassNames()}
          onClick={() => {
            onDelete && onDelete(ref);
          }}
        >
          {deleteIcon ? deleteIcon() : <CloseSvgImage />}
        </div>
      )}
    </div>
  );
}
