function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: 'I\'m sorry, we couldn\'t retreive your data',
    message: err,
  });
}

// function userError(err, req, res, next) {
//   const { status, message } = err;
//   res.status(status).json({
//     error: 'I\'m sorry, we couldn\'t retreive your data',
//     message,
//   });
// }


module.exports = {
  errorHandler,
  // userError,
};