const Credentials = {
  USERNAME: 'user',
  PASSWORD: 'password',
}

export async function onRequest(context: {
  request: Request
  next: () => Promise<Response>
  env: { BASIC_USERNAME?: string; BASIC_PASSWORD?: string }
}) {
  const { request, next, env } = context

  // Check header
  if (request.headers.has('Authorization') === false) {
    return new Response('You need to login.', {
      status: 401,
      headers: {
        // Prompts the user for credentials.
        'WWW-Authenticate': 'Basic realm="Input username and password"',
      },
    })
  }

  // Decode header value
  const [scheme, encoded] = request.headers.get('Authorization')!.split(' ')

  if (!encoded || scheme !== 'Basic') {
    return new Response('Malformed authorization header.', {
      status: 400,
    })
  }

  const buffer = Uint8Array.from(atob(encoded), character => character.charCodeAt(0))
  const decoded = new TextDecoder().decode(buffer).normalize()
  const index = decoded.indexOf(':')

  // eslint-disable-next-line no-control-regex
  if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
    return new Response('Invalid authorization value.', {
      status: 400,
    })
  }

  // Verify credentials
  const creds = {
    username: env.BASIC_USERNAME || Credentials.USERNAME,
    password: env.BASIC_PASSWORD || Credentials.PASSWORD,
  }

  const username = decoded.substring(0, index)
  const password = decoded.substring(index + 1)

  if (username !== creds.username || password !== creds.password) {
    return new Response('Invalid username or password.', {
      status: 401,
    })
  }

  return await next()
}
