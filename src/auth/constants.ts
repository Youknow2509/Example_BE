import 'dotenv/config';
export const jwtConstants = {
    secret: process.env.JWT_SECRET_KEY || 'jwt-secret-by-lytranvinh',
};
