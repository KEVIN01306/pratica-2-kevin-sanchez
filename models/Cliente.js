import mongoose from 'mongoose';

const DireccionSchema = new mongoose.Schema(
  {
    calle: { type: String },
    ciudad: { type: String },
    departamento: { type: String },
    pais: { type: String },
    codigoPostal: { type: String }
  },
  { _id: false }
);

const ClienteSchema = new mongoose.Schema(
  {
    primerNombre: { type: String, required: true, minlength: 2, maxlength: 50 },
    segundoNombre: { type: String },
    primerApellido: { type: String, required: true, minlength: 2, maxlength: 50 },
    segundoApellido: { type: String },
    nit: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    direcciones: { type: [DireccionSchema], default: [] },
    telefonos: { type: [String], default: [] }
  },
  { timestamps: true }
);

ClienteSchema.index({ nit: 1 }, { unique: true });

export const ClienteModel = mongoose.model('Cliente', ClienteSchema); 