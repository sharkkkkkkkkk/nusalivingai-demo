import { openDB, DBSchema } from 'idb';

interface User {
    id: string;
    name: string;
    email: string;
    password: string; // In real app, hash this!
    role: 'user' | 'admin';
    createdAt: number;
}

interface NusaDB extends DBSchema {
    users: {
        key: string;
        value: User;
        indexes: { 'by-email': string };
    };
}

const DB_NAME = 'nusaliving-db';
const DB_VERSION = 1;

export async function initDB() {
    const db = await openDB<NusaDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            const userStore = db.createObjectStore('users', { keyPath: 'id' });
            userStore.createIndex('by-email', 'email', { unique: true });

            // Add default demo user
            userStore.add({
                id: 'user-123',
                name: 'Budi Santoso',
                email: 'budi@example.com',
                password: 'password123',
                role: 'user',
                createdAt: Date.now(),
            });
        },
    });
    return db;
}

export async function registerUser(name: string, email: string, password: string) {
    const db = await initDB();
    const existingdev = await db.getFromIndex('users', 'by-email', email);
    if (existingdev) {
        throw new Error('Email sudah terdaftar');
    }

    const normalizedEmail = email.toLowerCase();

    const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email: normalizedEmail,
        password,
        role: 'user',
        createdAt: Date.now(),
    };

    await db.add('users', newUser);
    return newUser;
}

export async function loginUser(email: string, password: string) {
    const db = await initDB();
    const normalizedEmail = email.toLowerCase();
    const user = await db.getFromIndex('users', 'by-email', normalizedEmail);

    if (!user || user.password !== password) {
        throw new Error('Email atau password salah');
    }

    // Return user without password
    const { password: _, ...safeUser } = user;
    return safeUser;
}
