function serverError(err, req, res, next) {
  if (err.status) {
    next();
  } else {
    res.status(500).json({
      error: 'I\'m sorry, we couldn\'t retreive your data',
      message: err,
    });
  }
}

// custom error handler for other than server errors
function clientError(err, req, res, next) {
  const { status, message } = err;
  if (status === 500) {
    next();
  } else {
    res.status(status).json({
      message,
    });
  }
}


module.exports = {
  serverError,
  clientError,
};