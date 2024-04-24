"use client";

import { randomString } from "../utils";

export type CssProps = Partial<React.CSSProperties> &
  Partial<{
    "&hover": React.CSSProperties;
}>;

const _styleContext:string[] = [];

/** return id has a className and the JSX function to add to the element  */
export function createStyle({className, defaultStyle, currentStyle}: {className:string, defaultStyle:string, currentStyle:string}) {
    const styleContext = _styleContext;

    const id = `${randomString(10)}_${className}`;

    const style = MuiStyle({
        defaultStyle: `.${className} { ${defaultStyle} }`,
        currentStyle: `.${id} { ${currentStyle} }`
    });
    
    return {
        id: id,
        MuiStyle: style,
    }
}

function MuiStyle({defaultStyle, currentStyle}:{defaultStyle?: string, currentStyle: string}) {
    return () => <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: [defaultStyle,currentStyle].filter((e) => (typeof e != "undefined")).join("\n")}} />
}