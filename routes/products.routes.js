const {Router} = require('express')
const productsControllers = require('../controllers/products')

const router = Router()

// /api/products
router.get('/products', productsControllers.fetchAllProducts)

// /api/products/:id
router.get('/products/:id', productsControllers.findOneProduct)

// /api/products
router.post('/products', productsControllers.createNewProduct)

// /api/products/:id
router.patch('/products/:id', productsControllers.updateOneProduct)

// /api/products/:id
router.delete('/products/:id', productsControllers.deleteOneProduct)

module.exports = router