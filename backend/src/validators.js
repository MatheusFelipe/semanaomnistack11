const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  validateOngsCreate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required().min(550000000000).max(5599999999999),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),

  validateIncidentsIndex: celebrate({ [Segments.QUERY]: Joi.object().keys({ page: Joi.number() }) }),

  validateIncidentsCreate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),

  validateIncidentsDelete: celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.number().required() }) }),

  validateProfileIndex: celebrate({
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),

  validateSessionsCreate: celebrate({ [Segments.BODY]: Joi.object().keys({ id: Joi.string().required() }) }),
};
