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
