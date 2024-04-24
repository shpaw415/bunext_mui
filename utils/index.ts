const makeRand = () => Math.random().toString(36).slice(2, -1);

export function randomUUID() {
  return `${makeRand()}-${makeRand()}-${makeRand()}-${makeRand()}`.toUpperCase();
}
export function randomString(len: number) {
  let str = "";
  while (str.length < len) {
    str += makeRand();
  }
  return str.slice(0, len);
}
