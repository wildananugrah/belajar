import bcrypt from "bcrypt";

const saltRounds = 10;

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = Buffer.from(
    await bcrypt.hash(password, salt)
  ).toString("base64");
  return hashedPassword;
}

// Function to compare a plain text password with a hashed password
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  console.log(password + " " + hashedPassword);
  const isMatch = await bcrypt.compare(
    password,
    Buffer.from(hashedPassword, "base64").toString("ascii")
  );
  console.log(isMatch);
  return isMatch;
}
