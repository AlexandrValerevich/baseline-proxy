declare global {
  interface Date {
    timeDiff(dateTo: Date): string;
  }
}

Date.prototype.timeDiff = function (this: Date, dateTo: Date): string {
  const diff = Math.abs(this.getTime() - dateTo.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
export {};
