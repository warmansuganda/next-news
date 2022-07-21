import { encode, decode } from 'js-base64';

export function base64Ecode(input: string) {
  return encode(input)
    .replace(/\+/g, '-pLs-')
    .replace(/\//g, '-sLs-')
    .replace(/=+$/g, '-eQl-');
}

export function base64Decode(input: string) {
  return decode(
    input.replace('-pLs-', '+').replace('-sLs-', '/').replace('-eQl-', '=')
  );
}
