import jwt from "jsonwebtoken";


const doctorAuth = async (req, res, next) => {

    try {

        const { dtoken } = req.headers

        if(!dtoken){
            return res.json({success: false, message: "Not authorized login againr"})
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        
       req.body.docId = token_decode.id

        next()

    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message})
    }

}


export default doctorAuth;