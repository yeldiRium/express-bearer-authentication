const withBearerToken = require("../");

describe("withBearerToken", () => {
  it("accepts a request with a valid token", done => {
    const userObj = {};
    const authenticateToken = async token => {
      if (token === "1337") {
        return userObj;
      }
      return null;
    };
    const middleware = withBearerToken(authenticateToken);

    const header = jest.fn();
    header.mockReturnValue("Bearer 1337");
    const req = { header };
    const res = {
      end: () => {
        fail("end was called, but next should have been called.");
        done();
      },
      status: () => {
        fail("status was called, but next should have been called.");
        done();
      }
    };
    const next = jest.fn(() => {
      expect(next).toBeCalled();
      expect(req.user).toBe(userObj);
      done();
    });

    middleware(req, res, next);
  });

  it("rejects a request without a token", done => {
    const authenticateToken = async token => {
      if (token === "1337") {
        return {};
      }
      return null;
    };
    const middleware = withBearerToken(authenticateToken);

    const header = jest.fn();
    header.mockReturnValue(null);
    const req = { header };
    const res = {
      end: done,
      status: code => {
        expect(code).toBe(401);
      }
    };
    const next = () => {
      fail("Request should have been rejected, but next was called.");
      done();
    };

    middleware(req, res, next);
  });

  it("rejects a request with an invalid token", done => {
    const authenticateToken = async token => {
      if (token === "1337") {
        return {};
      }
      return null;
    };
    const middleware = withBearerToken(authenticateToken);

    const header = jest.fn();
    header.mockReturnValue("Bearer diesenrödel");
    const req = { header };
    const res = {
      end: done,
      status: code => {
        expect(code).toBe(401);
      }
    };
    const next = () => {
      fail("Request should have been rejected, but next was called.");
      done();
    };

    middleware(req, res, next);
  });

  it("rejects a request when the fetch function fails", done => {
    const authenticateToken = async token => {
      throw new Error("Something went wrong.");
    };
    const middleware = withBearerToken(authenticateToken);

    const header = jest.fn();
    header.mockReturnValue("Bearer deadbeef-1337-decafbad-420");
    const req = { header };
    const res = {
      end: done,
      status: code => {
        expect(code).toBe(500);
      }
    };
    const next = () => {
      fail("Request should have been rejected, but next was called.");
      done();
    };

    middleware(req, res, next);
  });
});
