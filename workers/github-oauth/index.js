const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

/**
 * /api/auth — redirect the user to GitHub to authorise.
 */
function handleAuth(request, env) {
  const url = new URL(request.url);
  const allowedHost = env.ALLOWED_HOST;

  // Build the GitHub OAuth authorisation URL
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/api/callback`,
    scope: 'repo,user',
    state: crypto.randomUUID(),
  });

  return Response.redirect(`${GITHUB_AUTHORIZE_URL}?${params}`, 302);
}

/**
 * /api/callback — exchange the code for a token, then post it back to
 * the Decap CMS parent window via postMessage.
 */
async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return htmlResponse('<h1>Error: missing code parameter</h1>', 400);
  }

  // Exchange the authorisation code for an access token
  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return htmlResponse(`<h1>Error: ${tokenData.error_description || tokenData.error}</h1>`, 400);
  }

  const token = tokenData.access_token;
  const provider = 'github';

  // Return a page that sends the token to the Decap CMS opener window
  // via postMessage — this is the protocol Decap CMS expects.
  const script = `
    <html><body><script>
      (function() {
        function sendMessage(message) {
          var allowedOrigin = ${JSON.stringify(`https://${env.ALLOWED_HOST}`)};
          if (window.opener) {
            window.opener.postMessage(
              'authorization:${provider}:success:' + JSON.stringify(message),
              allowedOrigin
            );
          }
        }
        sendMessage({ token: ${JSON.stringify(token)}, provider: ${JSON.stringify(provider)} });
      })();
    </script></body></html>
  `;

  return htmlResponse(script);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/auth') {
      return handleAuth(request, env);
    }

    if (path === '/api/callback') {
      return handleCallback(request, env);
    }

    return new Response('Not found', { status: 404 });
  },
};
