import { ObjectId } from 'mongodb';
import client from '../common/db.js';

const peliculaCollection = client.db('cine-db').collection('peliculas');

export const handleInsertPeliculaRequest = async (req, res) => {
    try {
        const data = req.body;
        const pelicula = {
            nombre: data.nombre,
            generos: data.generos,
            anioEstreno: parseInt(data.anioEstreno),
        };

        const result = await peliculaCollection.insertOne(pelicula);
        res.status(201).json({ _id: result.insertedId, ...pelicula });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetPeliculasRequest = async (req, res) => {
    try {
        const peliculas = await peliculaCollection.find({}).toArray();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Id mal formado');
        }
        const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(id) });
        if (!pelicula) return res.status(404).json({ error: 'Pelicula no encontrada' });
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Id mal formado');
        }

        const updates = { $set: data };
        const result = await peliculaCollection.updateOne({ _id: new ObjectId(id) }, updates);

        if (result.matchedCount === 0) return res.status(404).json({ error: 'Pelicula no encontrada' });
        res.status(200).json({ message: 'Pelicula actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Id mal formado');
        }
        const result = await peliculaCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Pelicula no encontrada' });
        res.status(200).json({ message: 'Pelicula eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
