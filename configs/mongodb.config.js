import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDb = process.env.MONGO_DB;
const mongoUser = process.env.MONGO_DB_USER;
const mongoPassword = process.env.MONGO_DB_PASSWORD;

const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}?authSource=admin`;

let isConnected = false;

export const connectToMongo = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 10000
    });
    isConnected = true;
    console.log('Conectado a la base de datos MongoDB (Mongoose)');
  } catch (error) {
    console.error('Error al conectar a MongoDB (Mongoose):', error);
    throw error;
  }
};

export const getDb = () => {
  return mongoose.connection;
};
