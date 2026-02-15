const errorHandler = (err, req, res, next) => {
  console.error("ERROR LOG:", {
    message: err.message,
    path: req.originalUrl,
    method: req.method,
    time: new Date().toISOString()
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: "Internal server error"
  });
};

export default errorHandler;
