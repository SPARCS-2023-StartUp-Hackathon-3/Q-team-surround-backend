export const TokenType = {
  ACCESS_TOKEN: 'Access_token',
  REFRESH_TOKEN: 'Refresh_token',
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];
