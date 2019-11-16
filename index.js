const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { check, validationResult } = require('express-validator');
const db = require('./queries');
const PORT = 3000; 


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

app.get('/', (req,res)=>{
    res.json({info: 'Node.js, Express, and Postgres API'})
});

app.get('/products', db.getProduct);
app.get('/products/:id', db.getProductById);
app.post('/products', [check('productname').not().isEmpty(), check('unitprice').not().isEmpty()], db.createProduct);
app.put('/products/:id', db.updateProduct);
app.delete('/products/:id', db.deleteProduct);
app.get('/products/take/:id', db.limitProduct);
app.post('/products/search/:id', db.findProduct);

app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}.`);
});

