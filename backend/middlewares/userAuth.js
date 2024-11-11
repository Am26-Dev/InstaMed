import jwt from "jsonwebtoken";


const userAuth = async (req, res, next) => {

    try {

        const { token } = req.headers

        if(!token){
            return res.json({success: false, message: "Not authorized login again"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = token_decode.id
        
        next()

    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message})
    }

}


// export default userAuth;

// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   try {
//     const token = req.headers['authorization']?.replace('Bearer ', '');

//     if (!token) {
//       return res.json({ success: false, message: "Not authorized login again" });
//     }

//     console.log('Token:', token); // Debugging: print token
//     console.log('JWT Secret:', process.env.JWT_SECRET); // Debugging: print secret key

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     req.body.userId = token_decode.id;

//     next();
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

export default userAuth;
