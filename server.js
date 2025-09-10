import express from 'express';
import routes from './routes/index.route.js';
import dotenv from 'dotenv';
import { connectToMongo } from './configs/mongodb.config.js';
import { i18n } from './configs/i18n.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(i18n.init);

app.use((req, res, next) => {
  const lang = req.header('Accept-Language');
  if (lang) req.setLocale(lang);
  next();
});

app.use("/",routes);

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => console.log('Servidor iniciado'));
  }catch (error) {
    console.error("Error al iniciar el servidor:", error);  
  }
}

startServer();
