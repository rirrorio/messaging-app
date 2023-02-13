const User = require('../model/userModel')
const bcrypt = require('bcrypt')

class userController{
    static async register (req,res,next){
        try {
            const {username, email, password} = req.body
    
            const usernameCheck = await User.findOne({username})
            if(usernameCheck){
                return res.json({msg:"username is taken!", status:false})
            }
    
            const emailCheck = await User.findOne({email})
            if(emailCheck){
                return res.json({msg:"email is taken!", status:false})
            }
    
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = await User.create({
                email,
                username,
                password:hashedPassword
            })
            delete newUser.password
            return res.status(200).json({newUser})
            
        } catch (error) {
            next(error)
        }
    }
    static async login (req,res,next){
        try {
            const {username, password} = req.body
    
            const userCheck = await User.findOne({username})
            if(!userCheck){
                return res.json({msg:"username or password is not valid", status:false})
            }
            const passwordValidation = bcrypt.compare(password,userCheck.password)
            if(!passwordValidation){
                return res.json({msg:"username or password is not valid", status:false})
            }
            else  {
                delete userCheck.password
                return res.status(200).json(userCheck)
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = userController