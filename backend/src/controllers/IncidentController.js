const { connection } = require('../database/connection');

module.exports = {
  create: async (req, res) => {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    const [id] = await connection('incidents').insert({ title, description, value, ong_id });
    return res.json({ id });
  },

  index: async (req, res) => {
    const { page = 1 } = req.query;

    const [{ count }] = await connection('incidents').count({ count: '*' });

    const incidents = await connection('incidents')
      .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .offset((page - 1) * 5)
      .limit(5);

    res.header('X-Total-Count', count);

    return res.json(incidents);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents').where({ id }).select('ong_id').first();
    if (!incident || incident.ong_id !== ong_id) return res.status(401).json({ error: 'Operation not permitted' });
    await connection('incidents').where({ id }).del();
    return res.status(204).send();
  },
};