import { MongoClient, ServerApiVersion } from 'mongodb';

// conexion a la base de datos de mongoDB Atlas creada clases atrás
const uri = "mongodb+srv://iplacex:yh5WwycDJ3isghyK@eva-u3-express.unz5pfu.mongodb.net/?appName=eva-u3-express";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client;
