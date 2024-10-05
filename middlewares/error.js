const error = (err,req,res,next) => {
    let statusCode = res.statusCode===200? 500 : res.statusCode;
    res.status(statusCode).json({ message:err.message, stack:err.stack });
};

export default error;