import rateLimit from "../config/upstash.js";

const rateLimiter = async(req,res,next) => {

  try {
    //userId, ip adress
    const userIp = req.ip;
    console.log(userIp);

    const {success} = await rateLimit.limit(userIp) //this is a hard coded identifier
    if (!success) {
      return res.status(429).json({message: "Too many requests, Please try again later."})
    }

    next();
    
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
}

export default rateLimiter;