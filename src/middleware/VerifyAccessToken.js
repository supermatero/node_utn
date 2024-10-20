import jwt from 'jsonwebtoken';


export const verifyAccessToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ').pop();
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err)
                return res.status(401).json({success:false, message:"Invalid or Expired Access Token"})
           
            next()
        });
    }else{
        res.status(401).json({success:false, messege:"No access token Provided"});
    }

}