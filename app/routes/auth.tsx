import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { ActionFunction, json } from "remix";
import { clearCookie, createUserSession} from "~/utils/sessions";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const authEvent = formData.get("event") as AuthChangeEvent;
  const formSession = formData.get("session");

  if (typeof formSession === "string") {
    const session = JSON.parse(formSession) as Session;
    if (authEvent === "SIGNED_IN") {
      return createUserSession(session.access_token);
    }
    if (authEvent === "SIGNED_OUT") {
      return clearCookie(request);
    }
  }

  return json({})
}
