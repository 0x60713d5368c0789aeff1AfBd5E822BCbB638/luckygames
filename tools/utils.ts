export function createURL(src: string) {
  const url: any = new URL(`../src/assets/${src}`, import.meta.url);
  return url as string;
}
