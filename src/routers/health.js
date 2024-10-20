import { Router } from "express";
import mongoose from "mongoose";

export const router = Router();
router.get('/health', (req, res)=>{
    try{

        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconected';
        res.status(200).json({
            status:'ok',
            message:`Service is healthy and dbconnection is: ${dbStatus}`
        });
    }catch(error){
        res.status(500).json({
            status:'error',
            message: `Service is down and dbconnection is:${dbStatus}`,
            error: error,message
        })
    }
})





