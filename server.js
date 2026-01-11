import express from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORTS = [3000, 4000];
const port = PORTS[0]; // Puerto por defecto

// Middlewares para parsear JSON y CORS
app.use(express.json());
app.use(cors());

// Ruta por defecto
app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al cine Iplacex');
});

// Rutas personalizadas
app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes); // Rutas de actor

// Iniciar el servidor
const startServer = async () => {
    try {
        await client.connect();
        console.log('Conexión exitosa a MongoDB Atlas');

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al conectar con MongoDB Atlas o iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
