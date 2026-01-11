import { ObjectId } from 'mongodb';
import client from '../common/db.js';

const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

export const handleInsertActorRequest = async (req, res) => {
    try {
        const data = req.body;
        // condiciones de validacion de datos requeridos
        if (!data.idPelicula) {
            return res.status(400).json({ error: 'idPelicula is required' });
        }

        if (!ObjectId.isValid(data.idPelicula)) {
            return res.status(400).json({ error: 'idPelicula mal formado' });
        }

        const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(data.idPelicula) });
        if (!pelicula) {
            return res.status(400).json({ error: 'La película especificada no existe' });
        }

        const actor = {
            idPelicula: data.idPelicula,
            nombre: data.nombre,
            edad: parseInt(data.edad),
            estaRetirado: data.estaRetirado,
            premios: data.premios || []
        };

        const result = await actorCollection.insertOne(actor);
        res.status(201).json({ _id: result.insertedId, ...actor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetActoresRequest = async (req, res) => {
    try {
        const actores = await actorCollection.find({}).toArray();
        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetActorByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Id mal formado');
        }
        const actor = await actorCollection.findOne({ _id: new ObjectId(id) });
        if (!actor) return res.status(404).json({ error: 'Actor no encontrado' });
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetActoresByPeliculaRequest = async (req, res) => {
    try {
        const { pelicula } = req.params;
        if (!ObjectId.isValid(pelicula)) {
            return res.status(400).send('Id mal formado');
        }

        const actores = await actorCollection.find({ idPelicula: pelicula }).toArray();
        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
