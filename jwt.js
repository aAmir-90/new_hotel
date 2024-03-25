import jsonwebtoken from 'jsonwebtoken';

export const jwtAuthMiddleware = (req, res, next)=>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token not found'});

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({message: "Unauthorized"});
    
    try {
        
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({message: "Invalid Token"});
    }
};

export const generateToken = (userData)=>{
    //also write {expiresIn:30---Time}
    return jsonwebtoken.sign(userData, process.env.JWT_SECRET);
};

// export {jwtAuthMiddleware, generateToken};