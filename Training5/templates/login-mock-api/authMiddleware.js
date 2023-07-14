const { verifyToken } = require("./jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const error = "Missing token or invalid token";
    var auth = req.headers["authorization"];

    if (!auth || typeof auth !== "string") {
      res.status(401).json({
        error,
      });
      return;
    }
    const tokens = auth.split(" ");

    const [prefix, token] = tokens;
    if (prefix !== "Bearer" || !token) {
      res.status(401).json({
        error,
      });
      return;
    }
    const user = await verifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};

module.exports = authMiddleware;
