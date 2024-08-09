import {
  useEffect,
  useRef,
  useState,
  type LegacyRef,
  type MutableRefObject,
} from "react";
import { MediaQueryValues, type MediaQueryType } from "../style";

const makeRand = () => Math.random().toString(36).slice(2, -1);

export function randomUUID() {
  return `${makeRand()}-${makeRand()}-${makeRand()}-${makeRand()}`.toUpperCase();
}
export function randomString(len: number, unauthorized: string[] = []) {
  let str = "";
  while (str.length < len) {
    str += Array.from(makeRand())
      .filter((e) => !unauthorized.includes(e))
      .join("");
  }
  return str.slice(0, len);
}
/** Test for a typeof React Element type */
export function Expect(
  Element: React.ReactNode,
  TestingElements: React.ReactNode | React.ReactNode[]
) {
  if (Array.isArray(TestingElements)) {
    for (const i of TestingElements) {
      if ((i as any).type != (Element as any).type) return false;
    }
    return true;
  }
  return (TestingElements as any).type == (Element as any).type;
}

export function specialCharToUnderScore(str: string) {
  const replace = Array.from("~!@#$%^&*()=+/*`,.;'[]{}:\"?><|\\");
  let newStr = `${str}`;
  for (const r of replace) {
    newStr = newStr.replaceAll(r, "_");
  }
  return newStr;
}
/**
 *
 * @param callback the function that will be called when a click occure
 * @returns the ref object to set to the element that do not trigger the callback
 */
export function useClickAwayListener<RefType>(
  callback: (ev: MouseEvent) => void
) {
  const ref = useRef<RefType & HTMLDivElement>(null);

  useEffect(() => {
    let currentClick = false;

    const onElementClick = (ev: MouseEvent) => {
      currentClick = true;
    };

    const onDocumentClick = (ev: MouseEvent) => {
      if (currentClick) {
        currentClick = false;
      } else callback(ev);
    };

    ref.current?.addEventListener("click", onElementClick);
    document.addEventListener("click", onDocumentClick);

    return () => {
      ref.current?.removeEventListener("click", onElementClick);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return ref as LegacyRef<RefType> | undefined;
}

/**
 * @param callback the function that will be called when a mouseUp occure
 */
export function useMouseUpListener(callback: (ev: MouseEvent) => void) {
  useEffect(() => {
    document.addEventListener("mouseup", callback);
    return () => {
      document.removeEventListener("mouseup", callback);
    };
  }, []);
}

/**
 * @param callback the function that will be called when a mouseUp occure
 */
export function useMouseMoveListener(callback: (ev: MouseEvent) => void) {
  useEffect(() => {
    document.addEventListener("mousemove", callback);
    return () => {
      document.removeEventListener("mousemove", callback);
    };
  }, []);
}

/**
 * @param callback the function that will be called when a window resize occure
 */
export function useMediaQuery() {
  const [currentSx, setSxType] = useState<keyof MediaQueryType>(() => {
    if (typeof window == "undefined") return "md";
    for (const query of Object.keys(MediaQueryValues).reverse() as Array<
      keyof MediaQueryType
    >) {
      if (window.innerWidth >= MediaQueryValues[query]) return query;
    }
    return "md";
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      for (const query of Object.keys(MediaQueryValues).reverse() as Array<
        keyof MediaQueryType
      >) {
        if (w >= MediaQueryValues[query]) return setSxType(query);
      }
    });
  }, []);

  return currentSx;
}
