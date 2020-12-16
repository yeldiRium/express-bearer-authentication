# Express Bearer Authentication

**This library is no longer maintained**

It is advised to use [passport.js](https://www.npmjs.com/package/passport) with the [passport-http-bearer](https://www.npmjs.com/package/passport-http-bearer) strategy instead.

An express.js middleware for customisazle bearer token authentication.

```sh
npm install @yeldirium/express-bearer-authentication
# or
yarn install @yeldirium/express-bearer-authentication
```

## Status

| Category         | Status                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/@yeldirium/express-bearer-authentication)](https://www.npmjs.com/package/@yeldirium/express-bearer-authentication) |
| Dependencies     | ![David](https://img.shields.io/david/yeldirium/express-bearer-authentication)                                                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/yeldirium/express-bearer-authentication)                                                                      |
| Build            | ![GitHub Actions](https://github.com/yeldiRium/express-bearer-authentication/workflows/Release/badge.svg?branch=master)                                 |
| License          | ![GitHub](https://img.shields.io/github/license/yeldiRium/express-bearer-authentication)                                                                |

## How it works

You pass it a function that turns a bearer token into a user object:

```javascript
const withBearerAuth = require("@yeldirium/express-bearer-authentication");

const authenticate = async token => {
  if (await database.isTokenValid(token)) {
    return database.getUserForToken(token);
  }
};
app.use(withBearerAuth(authenticate));
```

When the token is invalid or no user is found for it, the middleware will abort the request and return a status code of 401.

Otherwise it will attach the returned user object to request under `req.user`.

You can override the field on wich the returned object is set via a second parameter:

```javascript
app.use(withBearerAuth(authenticate, "authenticatedUser"));
```

Now the user object will be available as `req.authenticatedUser`.
