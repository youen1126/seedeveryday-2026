export function getTokenFromCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("myToken="))
    ?.split("=")[1];
}
