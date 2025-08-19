export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function stripBasePath(pathname: string) {
  return basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;
}
export function withBasePath(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${p}`;
}
