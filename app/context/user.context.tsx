import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetcher } from "remix";
import { Action, LayoutType } from "~/types";
import { supabase } from "~/utils/supabase";
import { Context } from "./app.context";

type UserContextType = {
  user: User | null;
  session: Session | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactChild }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { dispatch } = useContext(Context);
  const fetcher = useFetcher();

  const fetchSessionCookie = (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    //We only want to create or destroy cookie when session exists and sign in/sign out occurs
    if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
      fetcher.submit(
        { event, session: JSON.stringify(session) },
        { action: "/auth", method: "post" }
      );
      dispatch({
        type: Action.SetLayout,
        payload: {
          layout: session ? LayoutType.Authenticated : LayoutType.Anonymous
        }
      });
    }
  };

  useEffect(() => {
    // On initial load, recover session from local storage and store in state
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    // If session exists by now, set a cookie when app is reloaded, in case session was expired while app wasn't open
    // because session recovering/refreshing now happens on supabase constructor, before any onAuthStateChange events are emitted.
    if (session) fetchSessionCookie("SIGNED_IN", session);

    //If auth state changes while user is in the app, set session/auth to new values
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        fetchSessionCookie(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value: UserContextType = { user, session };
  return <UserContext.Provider value={value} children={children} />;
};
