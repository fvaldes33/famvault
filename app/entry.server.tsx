import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import { ServerStyles, createStylesServer } from '@mantine/ssr';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const stylesServer = createStylesServer();

  let markup = renderToString(
    <RemixServer
      context={remixContext}
      url={request.url}
    />
  );

  markup = renderToString(
    <>
      <RemixServer
        context={remixContext}
        url={request.url}
      />
      <ServerStyles html={markup} server={stylesServer} />
    </>
  );

  //
  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
