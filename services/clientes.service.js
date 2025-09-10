import { ClienteModel } from '../models/Cliente.js';

const getClientes = async () => {
  const clientes = await ClienteModel.find().lean();
  
  if (!clientes || clientes.length === 0){
    const error = new Error('DATA_NOT_FOUND');
    error.code = 'DATA_NOT_FOUND';
    throw error;
  }

  return clientes;
}

const postCliente = async (data) => {
  const cliente = await ClienteModel.findOne({ nit: data.nit }).lean();

  if (cliente){
    const error = new Error('DATA_EXISTS');
    error.code = 'DATA_EXISTS';
    throw error;
  }
  
  const nuevoCliente = await ClienteModel.create(data);
  
  return nuevoCliente._id;
}

export { 
  getClientes,
  postCliente
};
