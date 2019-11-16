const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodehw',
    password: '123',
    port: 5432
});
const { check, validationResult } = require('express-validator');

// GET ALL PRODUCTS

const getProduct = (req,res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error,results)=> {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

// GET A SINGLE PRODUCT BY ID

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results)=>{
        if(error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

// POST A NEW PRODUCT 

// const createProduct = (req,res)=>{
//     const {productname,unitprice,stock} = req.query;

//     pool.query('INSERT INTO products(productname, unitprice, stock) VALUES($1, $2, $3)', [productname, unitprice, stock], (error, results) => {
//         if(error) {
//             throw error
//         }
//         res.status(201).send(`Product added with ID:${results.insertId}`)
//     })
// }

const createProduct = (req,res)=>{
    const {productname,unitprice,stock} = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    else {
        pool.query('INSERT INTO products(productname, unitprice, stock) VALUES($1, $2, $3)', [productname, unitprice, stock], (error, results) => {
            if(error) {
                throw error
            }
            res.status(201).send("Product added with ID:" + results.insertId);
        })
    }
}

// PUT UPDATED DATA IN AN EXISTING PRODUCT

const updateProduct = (req,res) => {
    const id = parseInt(req.params.id);
    const {productname, unitprice, stock} = req.query;

    pool.query('UPDATE products SET productname = $1, unitprice = $2, stock = $3 WHERE id = $4', [productname, unitprice, stock, id], (error,results) => {
        if(error) {
            throw error
        }
        res.status(200).send(`Product modified with ID: ${id}`);
    })
}

// DELETE A PRODUCT 

const deleteProduct = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).send(`Product deleted with ID: ${id}`);
    })
}

// SELECT CERTAIN AMOUNT OF ITEMS FROM THE DATABASE TABLE

const limitProduct = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM products LIMIT $1', [id], (error,results)=>{
        if(error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

// SEARCH FOR A COLUMN VALUE THAT CONTAINS A SPECIFIC STRING

const findProduct = (req,res) => {
    const string = req.params.id;
    console.log(string);
    pool.query(`SELECT * FROM products WHERE productname LIKE`+ `'%${string}%'`, (error,results)=> {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}
// exported functions

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    limitProduct,
    findProduct
}