import jwt from "jsonwebtoken";
import { env } from "process";

const protect = (req, res, next) => {
  let token;

  // Token should be in header: Authorization: Bearer TOKEN
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, env.JWT_SECRET || "DEV_SECRET");

      req.user = decoded; // { id, role }
      next();
    } catch {
      return res.status(401).json({ error: "Token invalid" });
    }
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};

export default protect;
