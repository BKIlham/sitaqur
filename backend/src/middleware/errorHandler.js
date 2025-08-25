import logger from "../utils/logger.js";

function errorHandler(err, req, res, next) {
  //kalau error sudah instance ApiError
  if (err.statusCode) {
    logger.error("API Error", {
      requestId: req.id,
      message: err.message,
      errors: err.errors,
    });

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      requestId: req.id,
    });
  }

  //fallback error lain (unhandled)
  logger.error("Unhandled Error", {
    requestId: req.id,
    message: err.message,
    stack: err.stack,
  });

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    requestId: req.id,
  });
}

export default errorHandler;
