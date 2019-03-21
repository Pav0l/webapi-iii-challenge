const app = require('./server');

const PORT = 1919;
// listen for requests at specified PORT
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})