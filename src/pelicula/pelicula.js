// importacion de ObjectId para la base de datos 
import { ObjectId } from 'mongodb';

// exportacion de la constante Pelicula que contiene la estructura de la base de datos 
export const Pelicula = {
    _id: ObjectId,
    nombre: "string",
    generos: "array",
    anioEstreno: "int"
};
