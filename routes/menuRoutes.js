import express from 'express';
const router = express.Router();

import MenuItem from './../models/MenuItem.js';

router.post('/', async(req, res)=>{
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data save')
        res.status(200).json(response)
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.get('/', async(req, res)=>{
    try {
        const data = await MenuItem.find()
        console.log('fata fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.get('/:tasteType', async(req, res)=>{
    try {
        const tasteType = req.params.tasteType;
        if(tasteType === 'spicy' || tasteType === 'sweet' || tasteType === 'sour'){
            const reponse = await MenuItem.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(reponse);
        }else{
            res.status(404).json({error: 'invalid Taste type'})
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.put('/:id', async(req, res)=>{
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({error: 'Item not found'})
        }
        console.log('Menu Update')
        res.status(200).json(response)
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: 'Item not found'})
        }
        console.log("data deleted");
        res.status(200).json({message: 'Item deleted'})
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

export default router;