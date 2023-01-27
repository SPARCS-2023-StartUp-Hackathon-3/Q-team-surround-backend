export const MINUTES = 60;

export const HOUR = 60 * MINUTES;

export const DAY = 24 * HOUR;

export const WEEK = 7 * DAY;

export const MONTH = 30 * DAY;

export const YEAR = 365 * DAY;

export const EXPIRATION = {
  ACCESS_TOKEN: 10 * MINUTES,
  REFRESH_TOKEN: 2 * WEEK,
};
