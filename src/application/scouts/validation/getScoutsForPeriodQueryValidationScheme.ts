import Joi from "joi";

const getScoutsForPeriodQueryValidationScheme = Joi.object({
  timeFrom: Joi.date().required(),
  timeTo: Joi.date().required(),
});

export { getScoutsForPeriodQueryValidationScheme };
