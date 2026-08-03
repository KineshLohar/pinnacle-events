import { hash, compare } from 'bcryptjs';
import clientPromise from './mongodb';

// Function to hash a password
export async function hashPassword(password) {
  return await hash(password, 12);
}

// Function to verify a password
export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

// Function to create a new user
export async function createUser(username, email, password) {
  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ 
    $or: [{ username }, { email }] 
  });

  if (existingUser) {
    throw new Error('Username or email already exists');
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    username,
    email,
    password: hashedPassword,
  });

  return { id: result.insertedId, username, email };
}

// Function to get a user by username
export async function getUserByUsername(username) {
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection('users').findOne({ username });

  return user;
}

// Function to get a user by ID
export async function getUserById(id) {
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection('users').findOne({ _id: id });

  return user;
}

// Function to update user profile
export async function updateUserProfile(userId, updateData) {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection('users').updateOne(
    { _id: userId },
    { $set: updateData }
  );

  return result.modifiedCount > 0;
}

// Function to change user password
export async function changeUserPassword(userId, currentPassword, newPassword) {
  const client = await clientPromise;
  const db = client.db();

  const user = await getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await verifyPassword(currentPassword, user.password);

  if (!isValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await db.collection('users').updateOne(
    { _id: userId },
    { $set: { password: hashedPassword } }
  );

  return result.modifiedCount > 0;
}