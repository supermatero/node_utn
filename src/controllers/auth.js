import User from "../models/mongoDb/User.js";
import { hash, compare } from 'bcrypt';
import jwt from "jsonwebtoken";

const saltRounds = 10

export const authController = {
    async registerUser(req, res) {
        const { fullname, email, password  } = req.body;

        try {
            const hashedPassword = await hash(password, saltRounds);
            const newUser = new User({ fullname, email, password: hashedPassword });

            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "New User Registered",
                data: newUser,
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: "Error registering user" + err.message,
            });
        }
    },

    async loginUser(req, res){
        const user = await User.find().where({email: req.body.email});
        if(!user.length)
            return res.status(401).json({success:false, message:"Invalid email or Password"})

        const validUser = await compare(req.body.password, user[0].password);
        if(!validUser){
            return res.status(401).json({success:false, message:"Invalid email or Password"})
        }
        const accessToken = authController.generateToken(user[0]);
        res.send(200);
    },

    generateToken(payload){
        console.log(payload);
        const userToken = {
            username: payload.fullname,
            useremail: payload.email,
            sub: payload.id
        }
        return jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn:'1h'})
    }
};