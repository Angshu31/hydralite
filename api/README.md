# @hydralite/api

## Getting started

### With Docker

1. From the root directory, cd into `docker/`
2. In the docker directory, run the `yarn api:start` command to get redis, postgres and the api running on your local environment.

If you also want to setup redis insight, run the `yarn dbg:start` command to get redis, redis insight, and postgres running on your local environment. Then, manually start the api.

### Normally

1. From the root directory, cd into `api/`
2. Run `yarn` to install all dependencies.
3. Run `yarn setup` to simulate an intuitive environment setup procedure.
4. Run `yarn dev` to start the development server on the port you specified (fallback is 8000)

## Authentication

We use a custom authentication solution to authorize users. We use four OAuth providers, namely Github, Discord, Google, and Twitter.

We provide users with an access token and refresh token. The access token is used in an authorization header. The refresh token can be used to regenerate the access token.

### Standalone Mode

Standalone mode was built for easily authenticating without needing to running the web server

#### Variables

- **SERVER_URL** - The URL you are locally running the API on. (e.g http://localhost:8000)
- **AUTH_PROVIDER** - The authentication provider you will be authenticating with (in lowercase). (e.g "github", "google")
- **ACCESS_TOKEN** - The access token you get after authenticating.

#### Procedure

1. **Register an OAuth App on the provider of your choice.**
   Don't forget to set the callback URL as `{SERVER_URL}/api/auth/{AUTH_PROVIDER}/standalone/callback`.

2. **Navigate to `{SERVER_URL}/api/auth/{AUTH_PROVIDER}/standalone`.**

3. **Your auth providers auth page will show up.** Fill in any details it asks for.

4. **You will be redirected to a callback route.** The JSON response you recieve from this route will consist of a refresh and access token. Make a note of these and pass the access token in the Authorization header whenever making a request to the API. (e.g `Authorization: Bearer {ACCESS_TOKEN}`)

### Authorization Terms

- **Tier 1 Auth** - Site Admins
- **Tier 2 Auth** - Normally Authenticated Users
- **No Auth** - Users that are not logged in
