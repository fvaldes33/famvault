import { ActionFunction, json } from "remix";
import { AES, enc } from 'crypto-js';

export const action: ActionFunction = async ({ request }) => {
  const { password, token } = await request.json();

  if (password) {
    const encrypt = AES.encrypt(password, (process.env.CRYPTO_SECRET || '')).toString();
    return json({ password: encrypt });
  }

  if (token) {
    const decrypt = AES.decrypt(token, (process.env.CRYPTO_SECRET || '')).toString(enc.Utf8);
    return json({ password: decrypt })
  }

  return json({ error: 'No password or token provided' }, { status: 500 });
}
