import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/productos/add',(req,res)=>{
    res.render('productos/add');
});

router.post('/productos/add', async(req,res)=>{
    try{
        const{nompro,prepro,tipopro,codpro} = req.body;
        const newProducto ={
            nompro,prepro,tipopro,codpro
        }
        await pool.query('INSERT INTO producto SET ?', [newProducto]);
        res.redirect('/productos/list')
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/productos/list',async(req,res)=>{
    try{
        const[result]=await pool.query('SELECT * FROM producto');
        res.render('productos/list', {productos:result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/productos/edit/:idpro',async(req,res)=>{
    try{
        const {idpro} = req.params;
        const [producto] = await pool.query('SELECT * FROM producto WHERE idpro = ?', [idpro]);
        const productoEdit = producto[0];
        res.render('productos/edit', {producto:productoEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/productos/edit/:idpro',async(req,res)=>{
    try{
        const {nompro,prepro,tipopro,codpro} = req.body;
        const {idpro} = req.params;
        const editProducto = {nompro,prepro,tipopro,codpro};
        await pool.query('UPDATE producto SET ? WHERE idpro = ?', [editProducto, idpro]);
        res.redirect('/productos/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/productos/delete/:idpro', async(req,res)=>{
    try{
        const {idpro} = req.params;
        await pool.query('DELETE FROM producto WHERE idpro = ?', [idpro]);
        res.redirect('/productos/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

export default router;