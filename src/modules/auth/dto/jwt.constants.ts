import { config } from 'dotenv';
config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
};
