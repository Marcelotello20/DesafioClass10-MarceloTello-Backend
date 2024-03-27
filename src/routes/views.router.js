import express from 'express'
import __dirname from '../utils.js';
import ProductManager from '../components/ProductManager/ProductManager.js';

const router = express.Router();

const PM = new ProductManager(`${__dirname}/Productos.json`);

router.get('/', async(req,res) => {
    
    try {
        console.log("Productos obtenidos con exito")
        const products = await PM.getProducts();
        res.render('index',{ 
            products,
            style: 'index.css'
            }
        );
    } catch (error) {
        console.error("Error al obtener productos")
        res.status(500).send('Error al obtener los productos', error)
    }
})

router.get('/realtimeproducts', async (req,res) => {
    try {
        const products = await PM.getProducts();
        res.render('realtimeproducts', { products,
            style: 'index.css'
            }
        )
    } catch (error) {
        console.error("Error al obtener productos en tiempo real")
        res.status(500).send('Error al obtener los productos en tiempo real:', error)
    }
})

router.get('/addproduct', (req, res) => {
    res.render('addproduct', {
        style: 'index.css'
        });
});

router.get('/deleteproduct', async (req, res) => {
    res.render('deleteproduct', {
        style: 'index.css'
    });
});


export default router;