import { issueAccessToken } from '../helpers/auth.helper.js'
import { UsuarioModel } from '../models/Usuario.js';

const login = async (data) => {
  const usuarioValido = await UsuarioModel.findOne({ email: data.email, password: data.password }).lean();

  if (!usuarioValido){
    const error = new Error('AUTH_ERROR');
    error.code = 'AUTH_ERROR';
    throw error;
  }
  
  const token = await issueAccessToken({ sub: usuarioValido._id, role: usuarioValido.role });
  
  return {
    token: token,
    role: usuarioValido.role,
  };
}

export { 
  login,
};
