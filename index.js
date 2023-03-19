const express = require("express");
const app = express();
const port = process.env.HTPP || 5000;

app.get('/', (req, res) => {
    res.json('hello')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
