import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

async function comparePassword(
  rawPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(rawPassword, hashPassword);
}

export { hashPassword, comparePassword };
