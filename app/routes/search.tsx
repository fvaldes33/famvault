import { ActionFunction, json } from "remix";
import { AES, enc } from 'crypto-js';
import { Secret } from "~/types";
import { getUserSession } from "~/utils/sessions";
import { clientSupabase } from "~/utils/supabase";

export const action: ActionFunction = async ({ request }) => {
  const session = await getUserSession(request);
  const accessToken = session.get("accessToken");
  clientSupabase.auth.setAuth(accessToken);

  const { q } = await request.json();
  const { data, error } = await clientSupabase
    .from<Secret>('secrets')
    .select('*')
    .textSearch('title', `${q.replace(' ', ' | ')}`)
    .order('title');

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json({
    secrets: data?.map((secret: Secret) => ({
      ...secret,
      pass: AES.decrypt(secret.pass, (process.env.CRYPTO_SECRET || '')).toString(enc.Utf8)
    }))
  })
}
