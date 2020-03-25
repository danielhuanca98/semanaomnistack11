const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('incidence').count();

        const incidence = await connection('incidence')
            .join('ongs', 'ongs.id', '=', 'incidence.ong_id')
            .limit(5)
            .offset((page - 1) * 5) 
            .select([
                'incidence.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidence);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; 
        
        const [id] = await connection('incidence').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; 

        const incidence = await connection('incidence')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incidence.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidence').where('id', id).delete();

        return response.status(204).send();
    }
}