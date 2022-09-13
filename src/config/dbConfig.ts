import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  pw: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  sync: process.env.DATABASE_SYNC,
}));
