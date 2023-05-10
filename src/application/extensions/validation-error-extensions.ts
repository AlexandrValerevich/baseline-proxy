import Joi from "joi";

declare module "joi" {
  interface ValidationError {
    detailsAsSting(): string;
  }
}
Joi.ValidationError.prototype.detailsAsSting = function (): string {
  return this.details.map((x) => x.message).join(".");
};

export {};
