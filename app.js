const express = require ('express');

//Express app
const app = express();

//Listen for request
app.listen(3000);

app.get('/', (req, res) =>{
    res.sendFile('./views/index.html', {root: __dirname});
})