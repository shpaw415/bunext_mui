# MUI ( in devloppement )

## to use with @bunpmjs/bunext

## Usage

Set the Dark or Light Theme

```Javascript XML
// /layout.tsx
import {
  MuiStyle,
  SystemTheme,
  ThemeProvider,
  useTheme,
} from "@bunpmjs/bunext_material/style";

export function Layout({children}:{children: JSX.Element}) {
    return <MainLayout>{children}</MainLayout>
}

function MainLayout({children}:{children: JSX.Element}) {
    const theme = useTheme();
    theme.theme = SystemTheme();

    return (
     <ThemeProvider theme={theme}>
        <MuiStyle />
        {children}
     </ThemeProvider>
    );
}

```

# Change Log

## 0.1.6

- Fix Error: "Can't find variable: window" when using SystemTheme();

## 0.1.7

- Add xs to the sx props of Mui Element
- Fix SR not showing the current sx causing hydration error

## 0.1.8

- Fix EndElement from ListItemElement now showing the right color by default

## 0.1.9

- Scrollbar modified
- modified default body,html style
- Fix drawer Width and now respond correctly
- Badge sx is now set to the badge itself
- SpeedDialElement is now theme color receptive and Element is now use has a IconButton using his props
- Fix CSS Variables initialized multiple time

## 0.1.10

- Box is now forwardRef
- Fix Theme propagation
- Button has detailed htmlAttributes
- SnackBar children is typed as any
- TextField new prop: resetValue, will empty the input field (temporary)
- Paper & Menu & MenuElement use forwardRef
- menu icon & menuElement are theme color sensitive

## 0.1.11

- Fix display regression in menuElement & color
- fix listItem header color

## 0.1.12

- fix select dropdown color and Zindex
- fix css variable multiplication

## 0.1.13

- fix Select defaultValue not showing & defaultValue value not initialized correctly
- fix css variable not updating correcly
- Select set value onMouseDown replacing onClick ( more responsive )
- Snackbar is more stable and onOpen prop is supported
