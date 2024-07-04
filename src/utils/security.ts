import 'dotenv/config';
import { createCipheriv, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

// Import variables in .env
const iv = Buffer.from(process.env.IV_ENCRYPTION, 'hex');
const salt = Buffer.from(process.env.SALT_ENCRYPTION, 'hex');
const password = process.env.PASSWORD_ENCRYPTION || 'github: Youknow.2509';
const algorithm = process.env.ALGORITHM_ENCRYPTION || '';
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Function encrytion data
 * @param { string } data - data want encrytion
 * @returns { Promise<string> } data after encoding
 */
export const Encryption = async (data: string): Promise<string> => {
    try {
        const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;

        const cipher = createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return encrypted.toString('hex');
    } catch (error) {
        console.error('Encryption error:', error);
        throw error; // Throw error for handling
    }
};

/**
 * Function to decrypt data
 * @param { string } encryptedData - encrypted data in hex format
 * @returns { Promise<string> } decrypted data
 */
export const Decryption = async (encryptedData: string): Promise<string> => {
    try {
        // Derive key from password using scrypt
        const key = await promisify(scrypt)(password, salt, 32) as Buffer;
        // Create decipher using algorithm, key, and iv
        const decipher = createDecipheriv(algorithm, key, iv);

        // Decrypt data
        let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');

    } catch (error) {
        console.error('Decryption error:', error);
        throw error; // Throw error for handling
    }
};

/**
 * Function to hash data using bcrypt
 * @param { string } data - Data to be hashed
 * @returns { Promise<string> } - Hashed data
 */
export const BcryptHash = async (data: string): Promise<string> => {
    try {
        // Hash the data with the salt
        const hashedData = await bcrypt.hash(data, saltRounds);

        return hashedData;
    } catch (error) {
        console.error('Error hashing data:', error);
        throw error;
    }
}

/** Function compare data after hash
 * @param { string } data - data want compare
 * @param { string } hashedData - data after hassh
 * @returns { Promise<boolean> } true if match, false if not
 */
export const BcryptCompare = async (data: string, hashedData: string): Promise<boolean> => {
    try {
        // Compare the provided password with the stored hash
        const match = await bcrypt.compare(data, hashedData);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};

