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
