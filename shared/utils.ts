export const nowString = () => new Date().toLocaleDateString();

export const secondsToRoundedMinutes = (seconds: number) =>
  Math.floor(seconds / 60);
