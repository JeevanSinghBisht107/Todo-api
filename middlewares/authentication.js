import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import USER_SCHEMA from "../models/userModel.js";

const authenticate = async(req,res,next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        let myToken = req.headers.authorization.split(" ")[1];
    
        let decodedToken = jwt.verify(myToken, JWT_SECRET);
        let user = await USER_SCHEMA.findById(decodedToken.id);
        if (!user) {
          throw new Error("something went wrong please try again");
        }
        req.myUser = user;
    
        next();
      } else {
        res.status(400).json({ message: "please provide token........" });
      }
}

export { authenticate }