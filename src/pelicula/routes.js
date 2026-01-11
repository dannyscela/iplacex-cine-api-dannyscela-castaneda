import express from 'express';
import { // importaciones de controladores de la carpeta pelicula en el archivo controller.js
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
} from './controller.js';

const peliculaRoutes = express.Router();

peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest); // para insertar peliculas
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest); // para obtener todas las peliculas
peliculaRoutes.get('/pelicula/:id', handleGetPeliculaByIdRequest); // para obtener una pelicula por id
peliculaRoutes.put('/pelicula/:id', handleUpdatePeliculaByIdRequest); // para actualizar una pelicula por id
peliculaRoutes.delete('/pelicula/:id', handleDeletePeliculaByIdRequest); // para eliminar una pelicula por id

export default peliculaRoutes;
