const throwIfNotValidDate = (date: Date): Date => {
  if (!isValidDate(date)) {
    throw Error('Date is not valid')
  }
  return date
}

const isValidDate = (date: Date | number): boolean => {
  return date instanceof Date && !isNaN(date.getTime())
}

export { throwIfNotValidDate, isValidDate }
