var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toModule(require("react"));
  }
});

// node_modules/remix/client.js
var require_client = __commonJS({
  "node_modules/remix/client.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function() {
        return react.Form;
      }
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function() {
        return react.Link;
      }
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function() {
        return react.Links;
      }
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function() {
        return react.LiveReload;
      }
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function() {
        return react.Meta;
      }
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function() {
        return react.NavLink;
      }
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function() {
        return react.Outlet;
      }
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function() {
        return react.PrefetchPageLinks;
      }
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function() {
        return react.RemixBrowser;
      }
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function() {
        return react.RemixServer;
      }
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function() {
        return react.Scripts;
      }
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function() {
        return react.ScrollRestoration;
      }
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function() {
        return react.useActionData;
      }
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function() {
        return react.useBeforeUnload;
      }
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function() {
        return react.useCatch;
      }
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function() {
        return react.useFetcher;
      }
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function() {
        return react.useFetchers;
      }
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function() {
        return react.useFormAction;
      }
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function() {
        return react.useHref;
      }
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function() {
        return react.useLoaderData;
      }
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function() {
        return react.useLocation;
      }
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function() {
        return react.useMatches;
      }
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function() {
        return react.useNavigate;
      }
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function() {
        return react.useNavigationType;
      }
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function() {
        return react.useOutlet;
      }
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function() {
        return react.useOutletContext;
      }
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function() {
        return react.useParams;
      }
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function() {
        return react.useResolvedPath;
      }
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function() {
        return react.useSearchParams;
      }
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function() {
        return react.useSubmit;
      }
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function() {
        return react.useTransition;
      }
    });
  }
});

// node_modules/remix/server.js
var require_server = __commonJS({
  "node_modules/remix/server.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookie;
      }
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookieSessionStorage;
      }
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createMemorySessionStorage;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSessionStorage;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
  }
});

// node_modules/remix/platform.js
var require_platform = __commonJS({
  "node_modules/remix/platform.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createFileSessionStorage;
      }
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createFileUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return node.unstable_parseMultipartFormData;
      }
    });
  }
});

// node_modules/remix/index.js
var require_remix = __commonJS({
  "node_modules/remix/index.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var client2 = require_client();
    var server = require_server();
    var platform = require_platform();
    Object.keys(client2).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return client2[k];
          }
        });
    });
    Object.keys(server).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return server[k];
          }
        });
    });
    Object.keys(platform).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return platform[k];
          }
        });
    });
  }
});

// <stdin>
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require_remix());
var import_ssr = __toModule(require("@mantine/ssr"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const stylesServer = (0, import_ssr.createStylesServer)();
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }), /* @__PURE__ */ React.createElement(import_ssr.ServerStyles, {
    html: markup,
    server: stylesServer
  })));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
init_react();
var import_remix7 = __toModule(require_remix());
var import_react_query2 = __toModule(require("react-query"));

// app/styles/global.css
var global_default = "/build/_assets/global-6ERIYNWR.css";

// app/utils/sessions.ts
init_react();
var import_remix2 = __toModule(require_remix());

// app/utils/supabase.ts
init_react();
var import_supabase_js = __toModule(require("@supabase/supabase-js"));
var isServer = typeof window === "undefined";
function createSupabase() {
  if (isServer) {
    return (0, import_supabase_js.createClient)(process.env.PUBLIC_SUPABASE_URL || "", process.env.PRIVATE_SUPABASE_SECRET_KEY || "");
  }
  return (0, import_supabase_js.createClient)(window.ENV.PUBLIC_SUPABASE_URL, window.ENV.PUBLIC_SUPABASE_ANON_KEY);
}
var supabase = createSupabase();

// app/utils/sessions.ts
var { getSession, commitSession, destroySession } = (0, import_remix2.createCookieSessionStorage)({
  cookie: {
    name: "__famlock",
    domain: "localhost",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret1"],
    secure: true
  }
});
async function createUserSession(accessToken) {
  let session = await getSession();
  session.set("accessToken", accessToken);
  return (0, import_remix2.json)(null, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}
function getUserSession(request) {
  return getSession(request.headers.get("Cookie"));
}
async function getLoggedInUser(request) {
  let session = await getUserSession(request);
  let accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string")
    return null;
  const { user } = await supabase.auth.api.getUser(accessToken);
  return user;
}
async function clearCookie(request) {
  let session = await getSession(request.headers.get("Cookie"));
  return (0, import_remix2.redirect)("/", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}

// app/context/user.context.tsx
init_react();
var import_react2 = __toModule(require("react"));
var import_remix3 = __toModule(require_remix());

// app/types.ts
init_react();
var LayoutType;
(function(LayoutType2) {
  LayoutType2["Authenticated"] = "authenticated";
  LayoutType2["Anonymous"] = "anonymous";
})(LayoutType || (LayoutType = {}));
var Action;
(function(Action2) {
  Action2["SetReady"] = "set-ready";
  Action2["SetLayout"] = "set-layout";
})(Action || (Action = {}));

// app/context/app.context.tsx
init_react();
var import_react = __toModule(require("react"));

// app/context/app.reducers.ts
init_react();
function reducer(state, action4) {
  switch (action4.type) {
    case Action.SetReady:
      return __spreadProps(__spreadValues({}, state), {
        ready: true
      });
    case Action.SetLayout:
      const { layout } = action4.payload;
      return __spreadProps(__spreadValues({}, state), {
        layout
      });
    default:
      return __spreadValues({}, state);
  }
}

// app/context/app.context.tsx
var defaultState = {
  ready: false,
  layout: LayoutType.Anonymous
};
var Context = (0, import_react.createContext)({
  state: defaultState,
  dispatch: () => void 0
});
var { Consumer, Provider } = Context;
var AppContextProvider = ({ initialState, children }) => {
  const [state, dispatch] = (0, import_react.useReducer)(reducer, __spreadValues(__spreadValues({}, defaultState), initialState));
  const value = { state, dispatch };
  return /* @__PURE__ */ import_react.default.createElement(Provider, {
    value
  }, children);
};

// app/context/user.context.tsx
var UserContext = (0, import_react2.createContext)(void 0);
var UserContextProvider = ({ children }) => {
  const [session, setSession] = (0, import_react2.useState)(null);
  const [user, setUser] = (0, import_react2.useState)(null);
  const { dispatch } = (0, import_react2.useContext)(Context);
  const fetcher = (0, import_remix3.useFetcher)();
  const fetchSessionCookie = (event, session2) => {
    if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
      fetcher.submit({ event, session: JSON.stringify(session2) }, { action: "/auth", method: "post" });
      dispatch({
        type: Action.SetLayout,
        payload: {
          layout: session2 ? LayoutType.Authenticated : LayoutType.Anonymous
        }
      });
    }
  };
  (0, import_react2.useEffect)(() => {
    const session2 = supabase.auth.session();
    setSession(session2);
    setUser((session2 == null ? void 0 : session2.user) ?? null);
    if (session2)
      fetchSessionCookie("SIGNED_IN", session2);
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session3) => {
      setSession(session3);
      setUser((session3 == null ? void 0 : session3.user) ?? null);
      fetchSessionCookie(event, session3);
    });
    return () => {
      authListener == null ? void 0 : authListener.unsubscribe();
    };
  }, []);
  const value = { user, session };
  return /* @__PURE__ */ React.createElement(UserContext.Provider, {
    value,
    children
  });
};

// app/layout.tsx
init_react();
var import_core3 = __toModule(require("@mantine/core"));
var import_notifications = __toModule(require("@mantine/notifications"));

// app/components/NavHeader/index.tsx
init_react();
var import_core = __toModule(require("@mantine/core"));
var import_radix_icons = __toModule(require("@modulz/radix-icons"));
var import_remix4 = __toModule(require_remix());
var useStyles = (0, import_core.createStyles)((theme) => ({
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start"
  },
  avatar: {
    alignItems: "center",
    display: "flex",
    gap: "8px",
    marginLeft: "auto"
  }
}));
var NavHeader = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = (0, import_core.useMantineColorScheme)();
  const dark = colorScheme === "dark";
  return /* @__PURE__ */ React.createElement(import_core.Header, {
    className: classes.header,
    height: 80,
    padding: "xs"
  }, /* @__PURE__ */ React.createElement("form", {
    style: { width: "100%" }
  }, /* @__PURE__ */ React.createElement(import_core.TextInput, {
    type: "search",
    "aria-label": "Search",
    placeholder: "Search my vault",
    variant: "unstyled",
    size: "md",
    icon: /* @__PURE__ */ React.createElement(import_radix_icons.MagnifyingGlassIcon, null)
  })), /* @__PURE__ */ React.createElement("div", {
    className: classes.avatar
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_core.Switch, {
    checked: dark,
    "aria-label": "Toggle dark mode",
    onChange: () => toggleColorScheme()
  })), dark ? /* @__PURE__ */ React.createElement(import_radix_icons.MoonIcon, {
    style: { width: 18, height: 18 }
  }) : /* @__PURE__ */ React.createElement(import_radix_icons.SunIcon, {
    style: { width: 18, height: 18 }
  }), /* @__PURE__ */ React.createElement(import_remix4.Link, {
    to: "/profile"
  }, /* @__PURE__ */ React.createElement(import_core.Avatar, {
    radius: "xl"
  }))));
};

// app/components/Navbar/index.tsx
init_react();
var import_core2 = __toModule(require("@mantine/core"));
var import_radix_icons2 = __toModule(require("@modulz/radix-icons"));
var import_react3 = __toModule(require("react"));
var import_remix5 = __toModule(require_remix());
var useStyles2 = (0, import_core2.createStyles)((theme) => ({
  logo: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "80px"
  },
  nav: {
    padding: "5rem 0"
  },
  items: {
    alignItems: "center",
    color: theme.colors.green[4],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "80px",
    textDecoration: "none"
  },
  icon: {
    height: "1.5rem",
    marginBottom: "0.25rem",
    width: "1.5rem"
  }
}));
var FullNavbar = () => {
  const [opened, setOpened] = (0, import_react3.useState)(false);
  const { classes } = useStyles2();
  const navigate = (0, import_remix5.useNavigate)();
  const logout = async () => {
    try {
      const { error: signUpError } = await supabase.auth.signOut();
      if (signUpError)
        throw signUpError;
      navigate("/login");
    } catch (error) {
    }
  };
  return /* @__PURE__ */ React.createElement(import_core2.Navbar, {
    width: { base: 80 },
    fixed: true,
    position: { top: 0, left: 0 },
    hiddenBreakpoint: "sm",
    hidden: !opened
  }, /* @__PURE__ */ React.createElement(import_core2.Navbar.Section, {
    className: classes.logo
  }, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    className: classes.items,
    to: "/",
    title: "home"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.LockClosedIcon, {
    className: classes.icon
  }))), /* @__PURE__ */ React.createElement(import_core2.Navbar.Section, null, /* @__PURE__ */ React.createElement("nav", {
    className: classes.nav
  }, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    className: classes.items,
    to: "/",
    title: "home"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.DashboardIcon, {
    className: classes.icon
  }), /* @__PURE__ */ React.createElement(import_core2.Text, {
    size: "xs"
  }, "Dashboard")), /* @__PURE__ */ React.createElement(import_remix5.Link, {
    className: classes.items,
    to: "/passwords",
    title: "passwords"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.DotsHorizontalIcon, {
    className: classes.icon
  }), /* @__PURE__ */ React.createElement(import_core2.Text, {
    size: "xs"
  }, "Passwords")), /* @__PURE__ */ React.createElement(import_remix5.Link, {
    className: classes.items,
    to: "/files",
    title: "files"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.ArchiveIcon, {
    className: classes.icon
  }), /* @__PURE__ */ React.createElement(import_core2.Text, {
    size: "xs"
  }, "Files")), /* @__PURE__ */ React.createElement(import_remix5.Link, {
    className: classes.items,
    to: "/family",
    title: "family"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.LightningBoltIcon, {
    className: classes.icon
  }), /* @__PURE__ */ React.createElement(import_core2.Text, {
    size: "xs"
  }, "Family")), /* @__PURE__ */ React.createElement(import_remix5.Link, {
    className: classes.items,
    to: "/settings",
    title: "setttings"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.GearIcon, {
    className: classes.icon
  }), /* @__PURE__ */ React.createElement(import_core2.Text, {
    size: "xs"
  }, "Settings")))), /* @__PURE__ */ React.createElement(import_core2.Navbar.Section, {
    style: { marginTop: "auto" }
  }, /* @__PURE__ */ React.createElement("span", {
    className: classes.items,
    onClick: () => logout(),
    title: "logout"
  }, /* @__PURE__ */ React.createElement(import_radix_icons2.ExitIcon, {
    className: classes.icon
  }), /* @__PURE__ */ React.createElement(import_core2.Text, {
    size: "xs"
  }, "Logout"))));
};

// app/layout.tsx
var import_remix6 = __toModule(require_remix());
var import_react4 = __toModule(require("react"));
var import_hooks = __toModule(require("@mantine/hooks"));
function Layout({ children }) {
  const { pathname } = (0, import_remix6.useLocation)();
  const { state: { layout } } = (0, import_react4.useContext)(Context);
  const [colorScheme, setColorScheme] = (0, import_hooks.useLocalStorageValue)({
    key: "mantine-color-scheme",
    defaultValue: "light"
  });
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  (0, import_hooks.useHotkeys)([["mod+J", () => toggleColorScheme()]]);
  const isOnboarding = pathname === "/onboarding";
  return /* @__PURE__ */ React.createElement(import_core3.ColorSchemeProvider, {
    colorScheme,
    toggleColorScheme
  }, /* @__PURE__ */ React.createElement(import_core3.MantineProvider, {
    theme: {
      colorScheme,
      fontFamily: "Source Code Pro, monospace",
      headings: {
        fontFamily: "Source Code Pro, monospace",
        sizes: {
          h1: { fontSize: "5.653rem", lineHeight: 1.3 },
          h2: { fontSize: "3.998rem", lineHeight: 1.35 },
          h3: { fontSize: "2.827rem", lineHeight: 1.4 },
          h4: { fontSize: "1.999rem", lineHeight: 1.45 },
          h5: { fontSize: "1.414rem", lineHeight: 1.5 },
          h6: { fontSize: "0.707rem", lineHeight: 1.5 }
        }
      }
    }
  }, /* @__PURE__ */ React.createElement(import_notifications.NotificationsProvider, null, /* @__PURE__ */ React.createElement(import_core3.NormalizeCSS, null), /* @__PURE__ */ React.createElement(import_core3.GlobalStyles, null), layout === LayoutType.Authenticated && !isOnboarding ? /* @__PURE__ */ React.createElement(import_core3.AppShell, {
    navbar: /* @__PURE__ */ React.createElement(FullNavbar, null),
    styles: (theme) => ({
      root: {
        paddingLeft: 0,
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          paddingLeft: 80
        }
      },
      main: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : "white",
        minHeight: "100vh",
        padding: 0
      }
    })
  }, /* @__PURE__ */ React.createElement(NavHeader, null), children) : /* @__PURE__ */ React.createElement("main", null, children))));
}

// app/utils/client.ts
init_react();
var import_react_query = __toModule(require("react-query"));
var client = new import_react_query.QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/root.tsx
var links = () => {
  return [
    { rel: "stylesheet", href: global_default }
  ];
};
var publicPaths = ["/login", "/verify"];
var loader = async ({ request }) => {
  const { pathname } = new URL(request.url);
  const user = await getLoggedInUser(request);
  if (!user && !publicPaths.includes(pathname)) {
    return (0, import_remix7.redirect)(`/login`);
  }
  const ENV = {
    PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY,
    PROJECT_URL: process.env.PROJECT_URL
  };
  return (0, import_remix7.json)({
    ENV,
    session: !!user
  });
};
function App() {
  const { ENV, session } = (0, import_remix7.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(import_react_query2.QueryClientProvider, {
    client
  }, /* @__PURE__ */ React.createElement(AppContextProvider, {
    initialState: {
      ready: true,
      layout: session ? LayoutType.Authenticated : LayoutType.Anonymous
    }
  }, /* @__PURE__ */ React.createElement(UserContextProvider, null, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(import_remix7.Outlet, null))))), /* @__PURE__ */ React.createElement(EnvironmentSetter, {
    env: ENV
  }));
}
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement("link", {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: ""
  }), /* @__PURE__ */ React.createElement("link", {
    href: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;700&display=swap",
    rel: "stylesheet"
  }), /* @__PURE__ */ React.createElement(import_remix7.Meta, null), /* @__PURE__ */ React.createElement(import_remix7.Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_remix7.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix7.Scripts, null), false));
}
function EnvironmentSetter({ env }) {
  return /* @__PURE__ */ React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `window.ENV = ${JSON.stringify(env)}`
    }
  });
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/$passwordId.edit.tsx
var passwordId_edit_exports = {};
__export(passwordId_edit_exports, {
  default: () => PasswordEditRoute,
  loader: () => loader2,
  meta: () => meta
});
init_react();
var import_core7 = __toModule(require("@mantine/core"));
var import_remix9 = __toModule(require_remix());
var import_remix10 = __toModule(require_remix());

// app/components/EntryForm/index.tsx
init_react();
var import_core6 = __toModule(require("@mantine/core"));
var import_hooks3 = __toModule(require("@mantine/hooks"));
var import_radix_icons4 = __toModule(require("@modulz/radix-icons"));
var import_react7 = __toModule(require("react"));
var import_remix8 = __toModule(require_remix());

// app/api/secrets/hooks.ts
init_react();
var import_react_query3 = __toModule(require("react-query"));

// app/api/secrets/request.ts
init_react();
var getSecrets = async () => {
  const { data, error } = await supabase.from("secrets").select("*").order("title");
  if (error)
    throw error;
  return data ?? [];
};
var getSecret = async (uid) => {
  const { data, error } = await supabase.from("secrets").select("*").eq("uid", uid).single();
  if (error)
    throw error;
  if (data) {
    const hash = await fetch("/hash", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: data.pass
      })
    });
    const { password } = await hash.json();
    return __spreadProps(__spreadValues({}, data), {
      pass: password
    });
  }
  return data;
};
var deleteSecret = async (id) => {
  const { error } = await supabase.from("secrets").delete().match({ id });
  if (error)
    throw error;
  return null;
};
var createSecret = async (secret) => {
  const hash = await fetch("/hash", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: secret.pass
    })
  });
  const { password } = await hash.json();
  const { data, error } = await supabase.from("secrets").upsert(__spreadProps(__spreadValues({}, secret), {
    pass: password
  })).single();
  if (error)
    throw error;
  return data;
};

// app/api/secrets/hooks.ts
function useSecrets() {
  return (0, import_react_query3.useQuery)(["get-secret"], () => getSecrets());
}
function useSecret(uid) {
  return (0, import_react_query3.useQuery)(["get-secret", uid], () => getSecret(uid), {
    enabled: Boolean(uid),
    onSuccess: () => {
      client.invalidateQueries(["get-secrets", "get-secret"]);
    }
  });
}
function useDeleteSecret() {
  return (0, import_react_query3.useMutation)(async (id) => await deleteSecret(id));
}
function useMakeSecret() {
  return (0, import_react_query3.useMutation)(async (secret) => await createSecret(__spreadValues({}, secret)));
}

// app/components/Generator/index.tsx
init_react();
var import_core4 = __toModule(require("@mantine/core"));
var import_hooks2 = __toModule(require("@mantine/hooks"));
var import_react5 = __toModule(require("react"));
var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alphaLower = alpha.toLowerCase();
var numeric = "0123456789";
var symbols = "!@#$%^&*()_+-=[]{}|;':,./<>?`~";
function Generator({ onChange }) {
  const [opened, setOpened] = (0, import_react5.useState)(false);
  const [pass, setPass] = (0, import_react5.useState)("");
  const { getInputProps, values } = (0, import_hooks2.useForm)({
    initialValues: {
      char: 32,
      useSymbols: true,
      useNumbers: true
    }
  });
  (0, import_react5.useEffect)(() => {
    if (!opened) {
      return;
    }
    const { char: length, useSymbols, useNumbers } = values;
    const availableChars = alpha + alphaLower + (useSymbols ? symbols : "") + (useNumbers ? numeric : "");
    let pass2 = "";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * availableChars.length + 1);
      pass2 += availableChars.charAt(char);
    }
    setPass(pass2);
    onChange(pass2);
  }, [opened, values]);
  return /* @__PURE__ */ React.createElement(import_core4.Popover, {
    opened,
    onClose: () => setOpened(false),
    target: /* @__PURE__ */ React.createElement(import_core4.Button, {
      onClick: () => setOpened((o) => !o),
      color: "green",
      size: "md"
    }, "Generator"),
    width: 260,
    position: "left",
    withArrow: true
  }, /* @__PURE__ */ React.createElement(import_core4.Box, null, /* @__PURE__ */ React.createElement(import_core4.Box, null, /* @__PURE__ */ React.createElement(import_core4.Text, {
    size: "xs",
    transform: "uppercase",
    color: "dark"
  }, "Length"), /* @__PURE__ */ React.createElement(import_core4.Slider, __spreadValues({
    defaultValue: 32,
    min: 8,
    max: 64,
    labelTransition: "skew-down",
    labelTransitionDuration: 150,
    labelTransitionTimingFunction: "ease"
  }, getInputProps("char")))), /* @__PURE__ */ React.createElement(import_core4.Box, {
    style: { display: "flex", gap: "8px", margin: "24px 0" }
  }, /* @__PURE__ */ React.createElement("div", {
    style: { width: "50%" }
  }, /* @__PURE__ */ React.createElement(import_core4.Checkbox, __spreadValues({
    label: /* @__PURE__ */ React.createElement(import_core4.Text, {
      size: "xs",
      transform: "uppercase",
      color: "dark"
    }, "Numbers")
  }, getInputProps("useNumbers", { type: "checkbox" })))), /* @__PURE__ */ React.createElement("div", {
    style: { width: "50%" }
  }, /* @__PURE__ */ React.createElement(import_core4.Checkbox, __spreadValues({
    label: /* @__PURE__ */ React.createElement(import_core4.Text, {
      size: "xs",
      transform: "uppercase",
      color: "dark"
    }, "Symbols")
  }, getInputProps("useSymbols", { type: "checkbox" }))))), /* @__PURE__ */ React.createElement(import_core4.Code, {
    block: true,
    sx: (theme) => ({
      padding: "1rem"
    })
  }, pass)));
}

// app/components/PasswordStrength/index.tsx
init_react();
var import_react6 = __toModule(require("react"));
var import_radix_icons3 = __toModule(require("@modulz/radix-icons"));
var import_core5 = __toModule(require("@mantine/core"));

// app/utils/helpers.ts
init_react();
var passwordRules = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" }
];
function calculatePasswordStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;
  passwordRules.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });
  return Math.max(100 - 100 / (passwordRules.length + 1) * multiplier, 10);
}

// app/components/PasswordStrength/index.tsx
function PasswordRequirement({ meets, label }) {
  return /* @__PURE__ */ import_react6.default.createElement(import_core5.Text, {
    color: meets ? "teal" : "red",
    style: { display: "flex", alignItems: "center", marginTop: 7 },
    size: "sm"
  }, meets ? /* @__PURE__ */ import_react6.default.createElement(import_radix_icons3.CheckIcon, null) : /* @__PURE__ */ import_react6.default.createElement(import_radix_icons3.Cross1Icon, null), " ", /* @__PURE__ */ import_react6.default.createElement("span", {
    style: { marginLeft: 10 }
  }, label));
}
function PasswordStrength({ value, target, style, onStrengthChange }) {
  const [popoverOpened, setPopoverOpened] = (0, import_react6.useState)(false);
  const strength = calculatePasswordStrength(value);
  const checks = passwordRules.map((rule, index) => /* @__PURE__ */ import_react6.default.createElement(PasswordRequirement, {
    key: index,
    label: rule.label,
    meets: rule.re.test(value)
  }));
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  return /* @__PURE__ */ import_react6.default.createElement(import_core5.Popover, {
    opened: popoverOpened,
    position: "bottom",
    placement: "start",
    withArrow: true,
    style,
    styles: { popover: { width: "100%" } },
    noFocusTrap: true,
    transition: "pop-top-left",
    onFocusCapture: () => setPopoverOpened(true),
    onBlurCapture: () => {
      if (onStrengthChange) {
        onStrengthChange(strength);
      }
      setPopoverOpened(false);
    },
    target
  }, /* @__PURE__ */ import_react6.default.createElement(import_core5.Progress, {
    color,
    value: strength,
    size: 5,
    style: { marginBottom: 10 }
  }), /* @__PURE__ */ import_react6.default.createElement(PasswordRequirement, {
    label: "Includes at least 6 characters",
    meets: value.length > 5
  }), checks);
}

// app/components/EntryForm/index.tsx
var useStyles3 = (0, import_core6.createStyles)((theme) => ({
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%"
  },
  logo: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0"
  },
  icon: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 64,
    width: 64,
    borderRadius: 999,
    border: `5px solid ${theme.colors.green[2]}`,
    color: theme.colors.dark[4],
    margin: "0 0.5rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%"
  }
}));
function EntryForm({ family, secret }) {
  const navigate = (0, import_remix8.useNavigate)();
  const makeEntry = useMakeSecret();
  const { classes } = useStyles3();
  const [opened, setOpened] = (0, import_react7.useState)(false);
  const [char, setChar] = (0, import_react7.useState)(8);
  const [useSymbols, setUseSymbols] = (0, import_react7.useState)(true);
  const [useNumbers, setUseNumbers] = (0, import_react7.useState)(true);
  const { onSubmit, getInputProps, validate, setFieldValue, values, errors } = (0, import_hooks3.useForm)({
    initialValues: secret ? __spreadValues({}, secret) : {
      title: "",
      username: "",
      pass: "",
      website: "",
      strength: 0
    },
    validationRules: {
      title: (value) => !!value,
      username: (value) => !!value,
      pass: (value) => !!value
    },
    errorMessages: {
      title: "Title is required",
      username: "Username is required",
      pass: "Password is required"
    }
  });
  const handleSubmit = async ({ title, username, pass, website, strength }) => {
    if (!validate()) {
      return;
    }
    const res = await makeEntry.mutateAsync({
      title,
      username,
      pass,
      website,
      strength,
      family_id: family.id,
      id: secret == null ? void 0 : secret.id
    });
    if (res) {
      navigate("/passwords");
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper
  }, /* @__PURE__ */ React.createElement(import_remix8.Form, {
    className: classes.form,
    onSubmit: onSubmit(handleSubmit)
  }, /* @__PURE__ */ React.createElement(import_core6.TextInput, __spreadValues({
    icon: /* @__PURE__ */ React.createElement(import_radix_icons4.PersonIcon, null),
    label: /* @__PURE__ */ React.createElement(import_core6.Text, {
      size: "xs",
      transform: "uppercase",
      color: "dark"
    }, "Title"),
    placeholder: "Title",
    type: "text",
    name: "title",
    size: "md",
    style: {
      marginBottom: "1rem"
    }
  }, getInputProps("title"))), /* @__PURE__ */ React.createElement(import_core6.TextInput, __spreadValues({
    icon: /* @__PURE__ */ React.createElement(import_radix_icons4.PersonIcon, null),
    label: /* @__PURE__ */ React.createElement(import_core6.Text, {
      size: "xs",
      transform: "uppercase",
      color: "dark"
    }, "Username"),
    placeholder: "Username or email",
    type: "text",
    name: "username",
    size: "md",
    style: {
      marginBottom: "1rem"
    }
  }, getInputProps("username"))), /* @__PURE__ */ React.createElement(import_core6.Box, {
    style: { display: "flex", alignItems: "flex-end", gap: "1rem", marginBottom: "1rem", width: "100%" }
  }, /* @__PURE__ */ React.createElement(PasswordStrength, {
    style: { width: "100%" },
    value: values.pass,
    onStrengthChange: (strength) => setFieldValue("strength", strength),
    target: /* @__PURE__ */ React.createElement(import_core6.PasswordInput, __spreadValues({
      icon: /* @__PURE__ */ React.createElement(import_radix_icons4.LockClosedIcon, null),
      label: /* @__PURE__ */ React.createElement(import_core6.Text, {
        size: "xs",
        transform: "uppercase",
        color: "dark"
      }, "Password"),
      placeholder: "********",
      autoComplete: "new-password",
      autoCapitalize: "off",
      name: "pass",
      size: "md",
      style: {
        width: "100%"
      }
    }, getInputProps("pass")))
  }), /* @__PURE__ */ React.createElement(Generator, {
    onChange: (value) => setFieldValue("pass", value)
  })), /* @__PURE__ */ React.createElement(import_core6.TextInput, __spreadValues({
    icon: /* @__PURE__ */ React.createElement(import_radix_icons4.GlobeIcon, null),
    label: /* @__PURE__ */ React.createElement(import_core6.Text, {
      size: "xs",
      transform: "uppercase",
      color: "dark"
    }, "Website"),
    placeholder: "https://",
    type: "text",
    name: "website",
    size: "md",
    style: {
      marginBottom: "1rem"
    }
  }, getInputProps("website"))), /* @__PURE__ */ React.createElement(import_core6.Button, {
    loading: makeEntry.isLoading,
    type: "submit",
    color: "green"
  }, "Save Password")));
}

// app/api/families/hooks.ts
init_react();
var import_react_query4 = __toModule(require("react-query"));

// app/api/families/request.ts
init_react();
var getFamily = async () => {
  const { data, error } = await supabase.from("families").select("*, members (user_id, profiles(name, email))").limit(1).single();
  if (error)
    throw error;
  return data;
};

// app/api/families/hooks.ts
function useFamily() {
  return (0, import_react_query4.useQuery)(["get-family"], () => getFamily());
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/$passwordId.edit.tsx
var loader2 = async ({ request }) => {
  return (0, import_remix10.json)({});
};
var meta = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function PasswordEditRoute() {
  const { data: family } = useFamily();
  const params = (0, import_remix9.useParams)();
  const { data: secret, isLoading } = useSecret(params.passwordId ? params.passwordId : "");
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(import_core7.LoadingOverlay, {
      visible: true
    });
  }
  return /* @__PURE__ */ React.createElement(import_core7.Container, {
    size: "sm"
  }, /* @__PURE__ */ React.createElement(import_core7.Box, {
    sx: (theme) => ({
      padding: "40px 0"
    })
  }, /* @__PURE__ */ React.createElement(import_core7.Title, {
    sx: (theme) => ({
      fontSize: "40px",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        fontSize: "60px"
      }
    })
  }, "Edit Password")), /* @__PURE__ */ React.createElement(EntryForm, {
    family,
    secret
  }));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/$passwordId.tsx
var passwordId_exports = {};
__export(passwordId_exports, {
  default: () => PasswordRoute,
  loader: () => loader3
});
init_react();
var import_core9 = __toModule(require("@mantine/core"));
var import_radix_icons6 = __toModule(require("@modulz/radix-icons"));
var import_react8 = __toModule(require("react"));
var import_remix11 = __toModule(require_remix());

// app/components/Clipboardable/index.tsx
init_react();
var import_core8 = __toModule(require("@mantine/core"));
var import_hooks4 = __toModule(require("@mantine/hooks"));
var import_notifications2 = __toModule(require("@mantine/notifications"));
var import_radix_icons5 = __toModule(require("@modulz/radix-icons"));
var useStyles4 = (0, import_core8.createStyles)((theme) => ({
  wrapper: {
    alignItems: "center",
    border: `1px solid ${theme.colors.green[3]}`,
    borderRadius: "4px",
    display: "flex",
    padding: `${theme.spacing.md}px`,
    marginBottom: `${theme.spacing.sm}px`,
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows.md
    }
  },
  main: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: `${theme.spacing.md}px`
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginLeft: "auto"
  }
}));
function Clipboardable({ label, value }) {
  const { classes } = useStyles4();
  const clipboard = (0, import_hooks4.useClipboard)({ timeout: 1e3 });
  const notifications = (0, import_notifications2.useNotifications)();
  const isLink = value.startsWith("http");
  const isPass = label.toLowerCase() === "password";
  return /* @__PURE__ */ React.createElement(import_core8.Box, {
    className: classes.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.main
  }, /* @__PURE__ */ React.createElement(import_core8.Title, {
    order: 4
  }, label), /* @__PURE__ */ React.createElement(import_core8.Text, null, isPass ? "**********" : value)), /* @__PURE__ */ React.createElement("div", {
    className: classes.actions
  }, isLink && /* @__PURE__ */ React.createElement(import_core8.ActionIcon, {
    component: "a",
    href: value,
    target: "_blank",
    rel: "noopener nofollow",
    variant: "light",
    color: "green",
    size: "lg"
  }, /* @__PURE__ */ React.createElement(import_radix_icons5.Share1Icon, null)), /* @__PURE__ */ React.createElement(import_core8.ActionIcon, {
    onClick: () => {
      clipboard.copy(value);
      notifications.showNotification({
        color: "green",
        autoClose: 2e3,
        title: "Success",
        message: `${label} copied`
      });
    },
    variant: "light",
    color: clipboard.copied ? "teal" : "green",
    size: "lg"
  }, clipboard.copied ? /* @__PURE__ */ React.createElement(import_radix_icons5.CheckIcon, null) : /* @__PURE__ */ React.createElement(import_radix_icons5.ClipboardCopyIcon, null))));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/$passwordId.tsx
var loader3 = async ({ params }) => {
  return (0, import_remix11.json)({});
};
function PasswordRoute() {
  const params = (0, import_remix11.useParams)();
  const theme = (0, import_core9.useMantineTheme)();
  const navigate = (0, import_remix11.useNavigate)();
  const [opened, setOpened] = (0, import_react8.useState)(false);
  const { data: secret, isLoading } = useSecret(params.passwordId ? params.passwordId : "");
  const deleteSecret2 = useDeleteSecret();
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(import_core9.LoadingOverlay, {
      visible: true
    });
  }
  if (!secret) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, "Whoops");
  }
  return /* @__PURE__ */ React.createElement(import_core9.Container, {
    size: "sm"
  }, /* @__PURE__ */ React.createElement(import_core9.Box, {
    sx: (theme2) => ({
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      padding: "40px 0"
    })
  }, /* @__PURE__ */ React.createElement(import_core9.Title, {
    sx: (theme2) => ({
      fontSize: "40px",
      [`@media (min-width: ${theme2.breakpoints.sm}px)`]: {
        fontSize: "60px"
      }
    })
  }, secret.title)), /* @__PURE__ */ React.createElement(import_core9.Box, null, /* @__PURE__ */ React.createElement(Clipboardable, {
    label: "Username",
    value: secret.username
  }), /* @__PURE__ */ React.createElement(Clipboardable, {
    label: "Password",
    value: secret.pass
  }), secret.website && /* @__PURE__ */ React.createElement(Clipboardable, {
    label: "Website",
    value: secret.website
  }), /* @__PURE__ */ React.createElement(import_core9.Box, {
    style: { display: "flex", justifyContent: "space-between" }
  }, /* @__PURE__ */ React.createElement(import_core9.Button, {
    component: import_remix11.Link,
    to: `/passwords/${secret.uid}/edit`,
    color: "green"
  }, "Edit"), /* @__PURE__ */ React.createElement(import_core9.Button, {
    onClick: () => setOpened(true),
    color: "dark",
    leftIcon: /* @__PURE__ */ React.createElement(import_radix_icons6.TrashIcon, null)
  }, "Delete"))), /* @__PURE__ */ React.createElement(import_core9.Modal, {
    centered: true,
    opened,
    onClose: () => setOpened(false),
    overlayColor: theme.colors.red[2],
    overlayOpacity: 0.95
  }, /* @__PURE__ */ React.createElement(import_core9.Box, {
    sx: (theme2) => ({
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    })
  }, /* @__PURE__ */ React.createElement(import_core9.Title, {
    order: 3
  }, "Are you sure?"), /* @__PURE__ */ React.createElement(import_core9.Text, null, "You cannot undo this action."), /* @__PURE__ */ React.createElement(import_core9.Box, {
    style: { display: "flex", gap: "1rem", margin: "2rem 0" }
  }, /* @__PURE__ */ React.createElement(import_core9.Button, {
    onClick: () => setOpened(false),
    color: "green"
  }, "Cancel"), /* @__PURE__ */ React.createElement(import_core9.Button, {
    onClick: async () => {
      await deleteSecret2.mutateAsync(secret.id);
      setOpened(false);
      navigate("/passwords");
    },
    color: "red",
    loading: deleteSecret2.isLoading
  }, "I am sure")))));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/index.tsx
var passwords_exports = {};
__export(passwords_exports, {
  default: () => PasswordsIndexRoute,
  loader: () => loader4,
  meta: () => meta2
});
init_react();
var import_core11 = __toModule(require("@mantine/core"));
var import_remix13 = __toModule(require_remix());
var import_react9 = __toModule(require("react"));

// app/components/PasswordItem/index.tsx
init_react();
var import_core10 = __toModule(require("@mantine/core"));
var import_radix_icons7 = __toModule(require("@modulz/radix-icons"));
var import_remix12 = __toModule(require_remix());
var useStyles5 = (0, import_core10.createStyles)((theme) => ({
  wrapper: {
    alignItems: "center",
    border: `1px solid ${theme.colors.green[3]}`,
    borderRadius: "4px",
    display: "flex",
    padding: `${theme.spacing.md}px`,
    marginBottom: `${theme.spacing.sm}px`,
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows.md
    }
  },
  main: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: `${theme.spacing.md}px`
  },
  badge: {
    marginLeft: "auto"
  }
}));
function PasswordItem({ secret }) {
  const { classes } = useStyles5();
  return /* @__PURE__ */ React.createElement(import_remix12.Link, {
    className: classes.wrapper,
    to: `/passwords/${secret.uid}`
  }, /* @__PURE__ */ React.createElement(import_core10.Avatar, {
    alt: "it's me"
  }, /* @__PURE__ */ React.createElement(import_radix_icons7.LockClosedIcon, null)), /* @__PURE__ */ React.createElement("div", {
    className: classes.main
  }, /* @__PURE__ */ React.createElement(import_core10.Title, {
    style: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", width: "250px" },
    order: 5
  }, secret.title), /* @__PURE__ */ React.createElement(import_core10.Text, null, secret.username)), /* @__PURE__ */ React.createElement("div", {
    className: classes.badge
  }, /* @__PURE__ */ React.createElement(import_core10.Badge, {
    variant: "dot",
    color: (secret.strength || 0) > 80 ? "green" : "red"
  }, secret.strength || 0, "%")));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/index.tsx
var import_radix_icons8 = __toModule(require("@modulz/radix-icons"));
var loader4 = async ({ request }) => {
  return (0, import_remix13.json)({});
};
var meta2 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function PasswordsIndexRoute() {
  const { data: secrets, isLoading, isError, error } = useSecrets();
  const navigate = (0, import_remix13.useNavigate)();
  const params = (0, import_remix13.useParams)();
  const [opened, setOpened] = (0, import_react9.useState)(params && params.passwordId ? true : false);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(import_core11.LoadingOverlay, {
      visible: true
    });
  }
  if (isError) {
    return /* @__PURE__ */ React.createElement("div", null, "Whoops! ", error == null ? void 0 : error.message, ".");
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_core11.Box, {
    sx: (theme) => ({
      background: theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[0]
    })
  }, /* @__PURE__ */ React.createElement(import_core11.Container, {
    size: "xl",
    sx: (theme) => ({
      position: "relative",
      paddingTop: "2rem",
      paddingBottom: "2rem",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        paddingTop: "4rem",
        paddingBottom: "4rem"
      }
    })
  }, /* @__PURE__ */ React.createElement(import_core11.Grid, {
    justify: "space-between",
    align: "center"
  }, /* @__PURE__ */ React.createElement(import_core11.Col, {
    span: 12,
    md: 6
  }, /* @__PURE__ */ React.createElement(import_core11.Title, null, "Passwords"), /* @__PURE__ */ React.createElement(import_core11.Text, null, "A collection of website passwords, password generator and security checks.")), /* @__PURE__ */ React.createElement(import_core11.Col, {
    span: 12,
    md: 6,
    sx: (theme) => ({
      display: "flex",
      justifyContent: "flex-start",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        justifyContent: "flex-end"
      }
    })
  }, /* @__PURE__ */ React.createElement(import_remix13.Link, {
    to: "/passwords/new"
  }, /* @__PURE__ */ React.createElement(import_core11.Button, {
    color: "green",
    leftIcon: /* @__PURE__ */ React.createElement(import_radix_icons8.PlusIcon, null)
  }, "New")))))), /* @__PURE__ */ React.createElement(import_core11.Container, {
    size: "xl",
    sx: (theme) => ({
      paddingTop: "2rem",
      paddingBottom: "2rem"
    })
  }, /* @__PURE__ */ React.createElement(import_core11.Grid, null, secrets && secrets.map((secret) => /* @__PURE__ */ React.createElement(import_core11.Col, {
    span: 12,
    md: 6,
    lg: 4,
    key: secret.id
  }, /* @__PURE__ */ React.createElement(PasswordItem, {
    secret
  }))))), /* @__PURE__ */ React.createElement(import_core11.Drawer, {
    opened,
    position: "right",
    onClose: () => {
      setOpened(false);
      navigate("/passwords");
    },
    padding: "xl",
    size: "xl"
  }, "drawer"));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/passwords/new.tsx
var new_exports = {};
__export(new_exports, {
  default: () => PasswordNewRoute,
  loader: () => loader5,
  meta: () => meta3
});
init_react();
var import_core12 = __toModule(require("@mantine/core"));
var import_remix14 = __toModule(require_remix());
var loader5 = async ({ request }) => {
  return (0, import_remix14.json)({});
};
var meta3 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function PasswordNewRoute() {
  const { data: family } = useFamily();
  return /* @__PURE__ */ React.createElement(import_core12.Container, {
    size: "sm"
  }, /* @__PURE__ */ React.createElement(import_core12.Box, {
    sx: (theme) => ({
      padding: "40px 0"
    })
  }, /* @__PURE__ */ React.createElement(import_core12.Title, {
    sx: (theme) => ({
      fontSize: "40px",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        fontSize: "60px"
      }
    })
  }, "New Password")), /* @__PURE__ */ React.createElement(EntryForm, {
    family
  }));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/family/index.tsx
var family_exports = {};
__export(family_exports, {
  default: () => Index,
  loader: () => loader6,
  meta: () => meta4
});
init_react();
var import_core13 = __toModule(require("@mantine/core"));
var import_radix_icons9 = __toModule(require("@modulz/radix-icons"));
var import_remix15 = __toModule(require_remix());
var import_remix16 = __toModule(require_remix());
var loader6 = async ({ request }) => {
  return (0, import_remix16.json)({});
};
var meta4 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function Index() {
  var _a;
  const { data: family, isLoading, isError, error } = useFamily();
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(import_core13.LoadingOverlay, {
      visible: true
    });
  }
  if (isError) {
    return /* @__PURE__ */ React.createElement("div", null, "Whoops! ", error == null ? void 0 : error.message, ".");
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_core13.Box, {
    sx: (theme) => ({
      background: theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[0]
    })
  }, /* @__PURE__ */ React.createElement(import_core13.Container, {
    size: "xl",
    sx: (theme) => ({
      position: "relative",
      paddingTop: "2rem",
      paddingBottom: "2rem",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        paddingTop: "4rem",
        paddingBottom: "4rem"
      }
    })
  }, /* @__PURE__ */ React.createElement(import_core13.Grid, {
    justify: "space-between",
    align: "center"
  }, /* @__PURE__ */ React.createElement(import_core13.Col, {
    span: 12,
    md: 6
  }, /* @__PURE__ */ React.createElement(import_core13.Title, null, family.name), /* @__PURE__ */ React.createElement(import_core13.Text, null, "Members: ", ((_a = family.members) == null ? void 0 : _a.length) ?? 1)), /* @__PURE__ */ React.createElement(import_core13.Col, {
    span: 12,
    md: 6,
    sx: (theme) => ({
      display: "flex",
      justifyContent: "flex-start",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        justifyContent: "flex-end"
      }
    })
  }, /* @__PURE__ */ React.createElement(import_remix15.Link, {
    to: "/family/new"
  }, /* @__PURE__ */ React.createElement(import_core13.Button, {
    color: "green",
    leftIcon: /* @__PURE__ */ React.createElement(import_radix_icons9.PlusIcon, null)
  }, "Invite")))))), /* @__PURE__ */ React.createElement("pre", null, JSON.stringify(family, null, 2)));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/onboarding.tsx
var onboarding_exports = {};
__export(onboarding_exports, {
  action: () => action,
  default: () => OnboardingRoute,
  loader: () => loader7,
  meta: () => meta5
});
init_react();
var import_core16 = __toModule(require("@mantine/core"));
var import_remix18 = __toModule(require_remix());

// app/components/FullScreenCenter/index.tsx
init_react();
var import_core14 = __toModule(require("@mantine/core"));
var useStyles6 = (0, import_core14.createStyles)((theme) => ({
  wrapper: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100vw"
  }
}));
function FullScreenCenter({ children }) {
  const { classes } = useStyles6();
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper
  }, children);
}

// app/components/OnboardingForm/index.tsx
init_react();
var import_core15 = __toModule(require("@mantine/core"));
var import_hooks5 = __toModule(require("@mantine/hooks"));
var import_radix_icons10 = __toModule(require("@modulz/radix-icons"));
var import_react10 = __toModule(require("react"));
var import_remix17 = __toModule(require_remix());
var useStyles7 = (0, import_core15.createStyles)((theme) => ({
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxWidth: theme.breakpoints.xs
  },
  logo: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0"
  },
  icon: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 64,
    width: 64,
    borderRadius: 999,
    border: `5px solid ${theme.colors.green[2]}`,
    color: theme.colors.dark[4],
    margin: "0 0.5rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 2rem",
    width: "100%",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      padding: "0 4rem"
    }
  }
}));
var OnboardingForm = ({
  user
}) => {
  const { classes } = useStyles7();
  const [error, setError] = (0, import_react10.useState)("");
  const [loading, setLoading] = (0, import_react10.useState)(false);
  const navigate = (0, import_remix17.useNavigate)();
  const { onSubmit, validate, getInputProps, errors } = (0, import_hooks5.useForm)({
    initialValues: {
      fullName: "",
      familyName: ""
    },
    validationRules: {
      fullName: (value) => !!value,
      familyName: (value) => !!value
    },
    errorMessages: {
      fullName: "Full name is required",
      familyName: "Family name is required"
    }
  });
  const handleFormSubmit = async ({ fullName, familyName }) => {
    setError("");
    setLoading(true);
    if (!validate()) {
      setError(Object.values(errors).join(", "));
      return;
    }
    try {
      const { error: e } = await supabase.auth.update({
        data: {
          fullName
        }
      });
      if (e)
        throw e;
      const { data: profile, error: p } = await supabase.from("profiles").update({
        name: fullName
      }).single();
      const { data: family, error: f } = await supabase.from("families").insert([{
        name: familyName
      }]).single();
      if (f)
        throw f;
      const { error: m } = await supabase.from("members").insert([{
        user_id: user.id,
        family_id: family.id
      }]).single();
      if (m)
        throw m;
      navigate("/");
    } catch (error2) {
      setError(error2.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.logo
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, /* @__PURE__ */ React.createElement(import_radix_icons10.LockClosedIcon, {
    height: 24,
    width: 24
  })), /* @__PURE__ */ React.createElement(import_core15.Text, {
    transform: "uppercase",
    size: "lg",
    weight: 700
  }, "Welcome,", /* @__PURE__ */ React.createElement("br", null), user.email)), /* @__PURE__ */ React.createElement(import_remix17.Form, {
    className: classes.form,
    onSubmit: onSubmit(handleFormSubmit)
  }, /* @__PURE__ */ React.createElement(import_core15.Text, {
    style: { paddingBottom: "1rem" },
    align: "center"
  }, "To get started, finish your profile and create a family."), /* @__PURE__ */ React.createElement(import_core15.TextInput, __spreadValues({
    icon: /* @__PURE__ */ React.createElement(import_radix_icons10.PersonIcon, null),
    placeholder: "John Doe",
    type: "text",
    name: "fullName",
    size: "lg",
    style: {
      marginBottom: "1rem"
    }
  }, getInputProps("fullName"))), /* @__PURE__ */ React.createElement(import_core15.TextInput, __spreadValues({
    icon: /* @__PURE__ */ React.createElement(import_radix_icons10.HomeIcon, null),
    placeholder: "Family Name",
    type: "text",
    name: "familyName",
    size: "lg",
    style: {
      marginBottom: "1rem"
    }
  }, getInputProps("familyName"))), /* @__PURE__ */ React.createElement(import_core15.Button, {
    loading,
    type: "submit",
    color: "green"
  }, "Complete Profile"), error && /* @__PURE__ */ React.createElement("p", null, error)));
};

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/onboarding.tsx
var loader7 = async ({ request }) => {
  const user = await getLoggedInUser(request);
  if (!user) {
    return (0, import_remix18.redirect)("/login");
  }
  return (0, import_remix18.json)({
    user
  });
};
var meta5 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
var action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const fullName = form.get("fullName");
  const familyName = form.get("familyName");
  if (!fullName) {
    return (0, import_remix18.json)({
      error: "Please provide a full name"
    }, { status: 422 });
  }
  if (!familyName) {
    return (0, import_remix18.json)({
      error: "Please provide a family name"
    }, { status: 422 });
  }
  const { user, error } = await supabase.auth.api.updateUser(session.get("accessToken"), {
    data: { fullName }
  });
  if (error) {
    return (0, import_remix18.json)({
      error: error.message
    }, { status: 422 });
  }
  const { data: family, error: familyError } = await supabase.from("families").insert([
    { name: familyName }
  ]);
  if (familyError) {
    return (0, import_remix18.json)({
      error: familyError.message
    }, { status: 422 });
  }
  return (0, import_remix18.json)({
    user,
    family,
    message: "Success"
  });
};
function OnboardingRoute() {
  const { user } = (0, import_remix18.useLoaderData)();
  return /* @__PURE__ */ React.createElement(FullScreenCenter, null, /* @__PURE__ */ React.createElement(import_core16.Center, null, /* @__PURE__ */ React.createElement(OnboardingForm, {
    user
  })));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  loader: () => loader8,
  meta: () => meta6
});
init_react();
var import_core17 = __toModule(require("@mantine/core"));
var import_remix19 = __toModule(require_remix());
var import_remix20 = __toModule(require_remix());
var loader8 = async ({ request }) => {
  const user = await getLoggedInUser(request);
  if (!user) {
    return (0, import_remix19.redirect)("/login");
  }
  const { data: family, error } = await supabase.from("families").select("*, members!inner(*)").eq("members.user_id", user.id).single();
  if (!family) {
    return (0, import_remix19.redirect)("/onboarding");
  }
  return (0, import_remix20.json)({
    user
  });
};
var meta6 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function Index2() {
  const { user } = (0, import_remix20.useLoaderData)() || {};
  const { data: family, isLoading, isError, error } = useFamily();
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(import_core17.LoadingOverlay, {
      visible: true
    });
  }
  if (isError) {
    return /* @__PURE__ */ React.createElement("div", null, "Whoops! ", error == null ? void 0 : error.message, ".");
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("pre", null, JSON.stringify({ user, family }, null, 2)));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => Login,
  loader: () => loader9,
  meta: () => meta7
});
init_react();
var import_core19 = __toModule(require("@mantine/core"));
var import_remix22 = __toModule(require_remix());

// app/components/LoginForm/index.tsx
init_react();
var import_core18 = __toModule(require("@mantine/core"));
var import_hooks6 = __toModule(require("@mantine/hooks"));
var import_radix_icons11 = __toModule(require("@modulz/radix-icons"));
var import_react11 = __toModule(require("react"));
var import_remix21 = __toModule(require_remix());
var useStyles8 = (0, import_core18.createStyles)((theme) => ({
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxWidth: theme.breakpoints.xs
  },
  logo: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0"
  },
  icon: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 64,
    width: 64,
    borderRadius: 999,
    border: `5px solid ${theme.colors.green[2]}`,
    color: theme.colors.dark[4],
    margin: "0 0.5rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 2rem",
    width: "100%",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      padding: "0 4rem"
    }
  }
}));
var LoginForm = () => {
  const { classes } = useStyles8();
  const [error, setError] = (0, import_react11.useState)("");
  const [loading, setLoading] = (0, import_react11.useState)(false);
  const { onSubmit, getInputProps, validate, errors } = (0, import_hooks6.useForm)({
    initialValues: {
      email: ""
    },
    validationRules: {
      email: (value) => !!value
    },
    errorMessages: {
      email: "Must be a valid email"
    }
  });
  const handleLoginForm = async ({ email }) => {
    setError("");
    setLoading(true);
    if (!validate()) {
      setError(errors.email);
      return;
    }
    try {
      const { error: signUpError } = await supabase.auth.signIn({
        email
      }, {
        redirectTo: window.ENV.PROJECT_URL
      });
      if (signUpError)
        throw signUpError;
    } catch (error2) {
      setError(error2.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.logo
  }, /* @__PURE__ */ React.createElement(import_core18.Text, {
    transform: "uppercase",
    size: "lg",
    weight: 700
  }, "Fam"), /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, /* @__PURE__ */ React.createElement(import_radix_icons11.LockClosedIcon, {
    height: 24,
    width: 24
  })), /* @__PURE__ */ React.createElement(import_core18.Text, {
    transform: "uppercase",
    size: "lg",
    weight: 700
  }, "Vault")), /* @__PURE__ */ React.createElement(import_remix21.Form, {
    className: classes.form,
    onSubmit: onSubmit(handleLoginForm)
  }, /* @__PURE__ */ React.createElement(import_core18.Text, {
    style: { paddingBottom: "1rem" },
    align: "center"
  }, "Why would a password keeper ask for a password?", /* @__PURE__ */ React.createElement("br", null), "Login with a Magic Link."), /* @__PURE__ */ React.createElement(import_core18.TextInput, __spreadValues({
    icon: /* @__PURE__ */ React.createElement(import_radix_icons11.EnvelopeClosedIcon, null),
    placeholder: "Enter your email address",
    type: "email",
    name: "email",
    size: "lg",
    style: {
      marginBottom: "1rem"
    }
  }, getInputProps("email"))), /* @__PURE__ */ React.createElement(import_core18.Button, {
    loading,
    type: "submit",
    color: "green"
  }, "Login with Magic Link"), error && /* @__PURE__ */ React.createElement("p", null, error)));
};

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/login.tsx
var loader9 = async ({ request }) => {
  const user = await getLoggedInUser(request);
  if (user) {
    return (0, import_remix22.redirect)("/");
  }
  return (0, import_remix22.json)({});
};
var meta7 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function Login() {
  return /* @__PURE__ */ React.createElement(FullScreenCenter, null, /* @__PURE__ */ React.createElement(import_core19.Center, {
    style: { width: "100%" }
  }, /* @__PURE__ */ React.createElement(LoginForm, null)));
}

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/auth.tsx
var auth_exports = {};
__export(auth_exports, {
  action: () => action2
});
init_react();
var action2 = async ({ request }) => {
  const formData = await request.formData();
  const authEvent = formData.get("event");
  const formSession = formData.get("session");
  if (typeof formSession === "string") {
    const session = JSON.parse(formSession);
    if (authEvent === "SIGNED_IN") {
      return createUserSession(session.access_token);
    }
    if (authEvent === "SIGNED_OUT") {
      return clearCookie(request);
    }
  }
};

// route-module:/Users/franco/Web/Personal/Sandbox/remixin/app/routes/hash.tsx
var hash_exports = {};
__export(hash_exports, {
  action: () => action3
});
init_react();
var import_remix23 = __toModule(require_remix());
var import_crypto_js = __toModule(require("crypto-js"));
var action3 = async ({ request }) => {
  const { password, token } = await request.json();
  if (password) {
    const encrypt = import_crypto_js.AES.encrypt(password, process.env.CRYPTO_SECRET || "").toString();
    return (0, import_remix23.json)({ password: encrypt });
  }
  if (token) {
    const decrypt = import_crypto_js.AES.decrypt(token, process.env.CRYPTO_SECRET || "").toString(import_crypto_js.enc.Utf8);
    return (0, import_remix23.json)({ password: decrypt });
  }
  return (0, import_remix23.json)({ error: "No password or token provided" }, { status: 500 });
};

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/passwords/$passwordId.edit": {
    id: "routes/passwords/$passwordId.edit",
    parentId: "root",
    path: "passwords/:passwordId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: passwordId_edit_exports
  },
  "routes/passwords/$passwordId": {
    id: "routes/passwords/$passwordId",
    parentId: "root",
    path: "passwords/:passwordId",
    index: void 0,
    caseSensitive: void 0,
    module: passwordId_exports
  },
  "routes/passwords/index": {
    id: "routes/passwords/index",
    parentId: "root",
    path: "passwords",
    index: true,
    caseSensitive: void 0,
    module: passwords_exports
  },
  "routes/passwords/new": {
    id: "routes/passwords/new",
    parentId: "root",
    path: "passwords/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/family/index": {
    id: "routes/family/index",
    parentId: "root",
    path: "family",
    index: true,
    caseSensitive: void 0,
    module: family_exports
  },
  "routes/onboarding": {
    id: "routes/onboarding",
    parentId: "root",
    path: "onboarding",
    index: void 0,
    caseSensitive: void 0,
    module: onboarding_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/auth": {
    id: "routes/auth",
    parentId: "root",
    path: "auth",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/hash": {
    id: "routes/hash",
    parentId: "root",
    path: "hash",
    index: void 0,
    caseSensitive: void 0,
    module: hash_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
/**
 * @remix-run/node v1.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * remix v1.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
