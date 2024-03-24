import express from 'express';
import fs from 'fs';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import ProductManager from './components/ProductManager/ProductManager.js';

const app = express();
const httpServer = app.listen(8080,()=>console.log("Escuchando por el puerto 8080")) 

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'))
app.use('/',viewsRouter);

const PM = new ProductManager(`${__dirname}/Productos.json`);
const socketUpdatedProducts = async () => {
    const products = await PM.getProducts();
    socketServer.emit('productList',products);
    console.log("Productos Actualizados en tiempo real")
}

socketServer.on('connection',socket=>{
    console.log("Nuevo cliente conectado")

    
    // Cuando se conecta un cliente, emite la lista de productos actual
    socketUpdatedProducts();

    socket.on('message',data=>{
        console.log(data);
    })

    
})
