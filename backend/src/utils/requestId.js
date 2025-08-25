import { v4 as uuidv4 } from "uuid";

export default function requestId(req, res, next) {
  const incoming = req.headers["x-request.id"];
  req.id = incoming || uuidv4();
  res.setHeader("X-Request-Id", req.id);
  next();
}
