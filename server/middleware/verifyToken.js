import jwt from 'jsonwebtoken';
// import { expressjwt } from 'express-jwt';

export const verifyToken = (req, res, next) => {
    if (req.path === '/login' || req.path === '/signup') {
        return next();
    }

    const token = req.headers.authorization;
 
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded.email;
        req.id = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};