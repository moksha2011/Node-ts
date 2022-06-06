import Joi from '@hapi/joi';

export default {
  businessInput: Joi.object().keys({
    businessName: Joi.string()
      .required()
      .min(5)
      .max(50)
      .message('length of name Should be between 5 to 50'),
    businessDescription: Joi.string()
      .required()
      .min(5)
      .max(150)
      .message('length of name Should be between 5 to 50 '),
  }),
};
