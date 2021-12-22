import { ApiError, User } from "@supabase/supabase-js";
import { createCookieSessionStorage, json, redirect } from "remix";
import { supabase } from "./supabase";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__famlock",

      // all of these are optional
      domain: "localhost",
      // expires: new Date(Date.now() + 60),
      httpOnly: true,
      // maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true
    }
  });


/**
 * Create a cookie with that stores the provided `accessToken`
 * @param accessToken The user's JWT, stored in the user's session
 * @returns Response that sets cookie
 */
async function createUserSession(accessToken: string) {
  // Get/create a cookie from the cookie store
  let session = await getSession();

  //Set the accessToken property in the cookie
  session.set("accessToken", accessToken);

  // Return the response that sets the cookie in the client
  return json(null, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

/**
 * Gets a session cookie from the passed in request
 */
function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

/**
 * Takes the JWT stored in the passed in session cookie and then fetches and returns the
 * appropriate user details via the supabase api if token is valid, or null otherwise.
 * @returns User for which accessToken is provided
 */
async function getLoggedInUser(request: Request): Promise<User | null> {
  let session = await getUserSession(request);

  let accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  const { user } = await supabase.auth.api.getUser(accessToken);
  return user;
}

/** Destroy the session cookie  */
async function clearCookie(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export {
  getSession,
  commitSession,
  destroySession,

  // new
  createUserSession,
  getUserSession,
  getLoggedInUser,
  clearCookie
};
