# Express Bearer Authentication

An express.js middleware for customisazle bearer token authentication.

```sh
npm install @yeldirium/express-bearer-authentication
# or
yarn install @yeldirium/express-bearer-authentication
```

## Status

| Category         | Status                                                                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm version](http://img.shields.io/npm/v/@yeldirium/express-bearer-authentication.svg?style=flat)](https://npmjs.org/package/@yeldirium/express-bearer-authentication "View this project on npm") |
| Dependencies     | ![David](https://img.shields.io/david/yeldirium/express-bearer-authentication)                                                                                                                       |
| Dev dependencies | ![David](https://img.shields.io/david/dev/yeldirium/express-bearer-authentication)                                                                                                                   |
| Build            | [![Build Status](https://travis-ci.org/yeldiRium/express-bearer-authentication.svg?branch=master)](https://travis-ci.org/yeldiRium/express-bearer-authentication)                                    |

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

When the token is invalid or no user is found for it, the middleware will abort the request and return a status code of 400.

Otherwise it will attach the returned user object to request under `req.user`.

You can override the field on wich the returned object is set via a second parameter:

```javascript
app.use(withBearerAuth(authenticate, "authenticatedUser"));
```

Now the user object will be available as `req.authenticatedUser`.
