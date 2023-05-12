declare global {
  interface Date {
    IsValid(): boolean;
    ThrowIfNotValid(): Date;
  }
}

Date.prototype.IsValid = function (): boolean {
  return this instanceof Date && !isNaN(this);
};

Date.prototype.ThrowIfNotValid = function (): Date {
  if (!this.IsValid()) {
    throw Error("Date is not valid");
  }
  return this;
};

export {};
