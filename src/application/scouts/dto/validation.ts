import Joi from "joi";

const getScoutsForPeriodQueryValidationScheme = Joi.object<GetScoutsForPeriodQuery>({
  timeFrom: Joi.date().required(),
  timeTo: Joi.date().required(),
});

export { getScoutsForPeriodQueryValidationScheme };
