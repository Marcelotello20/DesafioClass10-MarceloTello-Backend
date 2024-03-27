import express from 'express';
import __dirname from '../utils.js';
import ProductManager from '../components/ProductManager/ProductManager.js';

const router = express.Router();
const productsRouter = router;
const PM = new ProductManager(`${__dirname}/Productos.json`);

// Endpoint para buscar los productos
router.get('/', async (req, res) => {

    const { limit } = req.query;

    let products = await PM.getProducts();

    if (limit) {
        products = products.slice(0, limit);
    }

    res.send(products);
});

// Endpoint con el productId para buscar uno especifico 
router.get('/:id', async (req, res) => {
    
    const productId = +req.params.id;

    let product = await PM.getProductById(productId);

    if (!product) {
        console.error("No se encontró el producto solicitado");
        return res.status(404).json({
            error: `No se encontró el producto con ID ${productId}`
        });
    }

    res.json(product);
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {

    const product = req.body;

    try {
        await PM.addProduct(product);
        res.status(201).send('Producto creado correctamente');
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send('Error al crear el producto');
    }
});

// Actualizar un producto por su id
router.put('/:id', async (req, res) => {

    const productId = +req.params.id;

    const update = req.body;

    try {
        await PM.updateProduct(productId, update);
        res.send('Producto actualizado correctamente');
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send('Error al actualizar el producto');
    }
});

// Eliminar un producto por su id
router.delete('/:id', async (req, res) => {

    const productId = +req.params.id;
    
    try {
        await PM.deleteProduct(productId);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send('Error al eliminar el producto');
    }
});

// Endpoint para eliminar un producto por su id combinandolo con un form en HTML y en views.router( DELETE NO EXISTE EN HTML )
router.post('/deleteproduct', async (req, res) => {
    const productId = +req.body.productId;

    try {
        await PM.deleteProduct(productId);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send('Error al eliminar el producto');
    }
});

export default productsRouter;

