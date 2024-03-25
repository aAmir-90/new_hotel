import express, { response } from 'express';
const router = express.Router();
import Person from './../models/Person.js';
import {jwtAuthMiddleware, generateToken} from './../jwt.js';
// import generateToken from './../jwt.js'


router.post('/signup', async(req, res)=>{
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        const payload = {
            id: response.id,
            username: response.username
        };
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is:", token);
        res.status(200).json({response: response, token: token});
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'});
    }
});

router.post('/login', async(req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await Person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error: 'Invalid Username or Password'})
        }
        const payload = {
            id: user.id,
            username: user.username 
        };
        const token = generateToken(payload)
        res.json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
});

router.get('/profile', jwtAuthMiddleware, async(req, res)=>{
    try {
        const userData = req.user
        console.log(userData)

        const userId = userData.id
        const user = await Person.findById(userId)
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/', jwtAuthMiddleware, async(req, res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.get('/:workType', async(req, res)=>{
    try {
        const workType = req.params.workType;
        if(workType === 'chef' || workType === 'waiter' || workType === 'manager'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'Invalid work Type'})
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.put('/:id', async(req, res)=>{
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('person updated');
        res.status(200).json(response)
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const personId = req.params.id;
        const reponse = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({message: 'Person not found'})
        }
        console.log('Data deleted');
        res.status(200).json({message: 'Person is deleted'})
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error: 'internal server error'})
    }
})

export default router;

