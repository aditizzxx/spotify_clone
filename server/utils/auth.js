import bcrypt from 'bcryptjs';

export const comparePassword = async (password,hashed) => {
    return await bcrypt.compare(password, hashed);
}