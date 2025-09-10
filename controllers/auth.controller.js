import { responseSuccess, responseError } from '../helpers/response.helper.js';
import joi from 'joi';
import { login } from '../services/auth.service.js'
import { verifyAccessToken } from '../helpers/auth.helper.js'

const schemaAuth = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).max(100)
});

const loginHandler = async (req, res) => {
  try{
    const data = req.body;
    
    const { error, value } = schemaAuth.validate(data, { abortEarly: false });

    if(error){
      return res.status(400).json(responseError(req.__("auth.invalid_credentials")));
    }

    const token = await login(value);
    
    res.status(200).json(responseSuccess("success", token));
  } catch (error) {
    let errorCode = 500;
    let errorMessage = req.__("errors.internal");
    switch(error.code){
      case 'DATA_NOT_FOUND':
        errorCode = 404;
        errorMessage = req.__("errors.data_not_found");
        break;
      case 'AUTH_ERROR':
        errorCode = 401;
        errorMessage = req.__("auth.invalid_credentials");
        break;
    }

    return res.status(errorCode).json({
      message: errorMessage
    });
  }
}

const verifyTokenHandler = () => {
  return async (req, res, next) => {
      try {
        const auth = req.header('Authorization');
        const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;
        if (!token) return res.status(401).json(responseError(req.__("auth.bearer_missing")));
  
        await verifyAccessToken(token);
        
        next();
      } catch (err) {
        return res.status(401).json(responseError(req.__("auth.token_invalid")));
      }
    };
}

export { 
  loginHandler,
  verifyTokenHandler
};
