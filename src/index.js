/**
 * Returns a middleware function that checks a requests Authorization header
 * against an authentication function.
 * Tha `authenticateToken` function either returns a user object for a valid
 * token or `null` for an invalid token.
 * The returned user object is attached to the request under `req.user` or under
 * `req[targetField]`.
 *
 * @param {Function} authenticateToken An authentication strategy.
 * @param {String} targetField The field in which to put the user object.
 */
const withBearerToken = (authenticateToken, targetField = "user") => async (
  req,
  res,
  next
) => {
  if (!authenticateToken) {
    throw new Error("Authenticate token function is missing.");
  }

  const fail = () => {
    res.status(401);
    res.end();
  };

  const authorization = req.header("Authorization");
  if (!authorization) return fail();

  const parts = authorization.split(" ");
  if (parts.length != 2) fail();
  const token = parts[1];

  try {
    const user = await authenticateToken(token);
    if (user !== null) {
      req[targetField] = user;
      next();
    } else {
      fail();
    }
  } catch (e) {
    res.status(500);
    res.end();
  }
};

module.exports = withBearerToken;
