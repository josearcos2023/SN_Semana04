import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/clientes/add',(req,res)=>{
    res.render('clientes/add');
});

router.post('/clientes/add', async(req,res)=>{
    try{
        const{nomcli,apecli,nrodnicli,telcli} = req.body;
        const newCliente ={
            nomcli,apecli,nrodnicli,telcli
        }
        await pool.query('INSERT INTO cliente SET ?', [newCliente]);
        res.redirect('/clientes/list')
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/clientes/list',async(req,res)=>{
    try{
        const[result]=await pool.query('SELECT * FROM cliente');
        res.render('clientes/list', {clientes:result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/clientes/edit/:idcli',async(req,res)=>{
    try{
        const {idcli} = req.params;
        const [cliente] = await pool.query('SELECT * FROM cliente WHERE idcli = ?', [idcli]);
        const clienteEdit = cliente[0];
        res.render('clientes/edit', {cliente:clienteEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/clientes/edit/:idcli',async(req,res)=>{
    try{
        const {nomcli,apecli,nrodnicli,telcli} = req.body;
        const {idcli} = req.params;
        const editCliente = {nomcli,apecli,nrodnicli,telcli};
        await pool.query('UPDATE cliente SET ? WHERE idcli = ?', [editCliente, idcli]);
        res.redirect('/clientes/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/clientes/delete/:idcli', async(req,res)=>{
    try{
        const {idcli} = req.params;
        await pool.query('DELETE FROM cliente WHERE idcli = ?', [idcli]);
        res.redirect('/clientes/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

export default router;