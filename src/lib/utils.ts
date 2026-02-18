import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function base64ToBlobUrl(base64:string, ) {
//   const byteCharacters = atob(base64);
//   const byteArray = new Uint8Array(
//     [...byteCharacters].map(char => char.charCodeAt(0))
//   );

//   const blob = new Blob([byteArray], { type: 'image/jpeg' });
//   return URL.createObjectURL(blob);
// }