import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  directory: path.join(__dirname, '..', 'locales'),
  objectNotation: true,
  autoReload: false,
  updateFiles: false,
  cookie: 'lang'
});

export { i18n }; 