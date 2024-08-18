# bunext_mui ( in devloppement )

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
