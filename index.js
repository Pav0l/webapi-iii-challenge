const app = require('./server');

const PORT = 1919;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})