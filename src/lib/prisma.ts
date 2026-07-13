// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Создаем "пул" (набор) соединений.
// Мы берем ссылку на базу из файла .env и отдаем её стандартному драйверу pg.
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

// 2. Передаем этот пул в адаптер Призмы (так требует современная Prisma без Rust).
const adapter = new PrismaPg(pool);

// 3. Создаем глобальную переменную. Зачем?
// Next.js в режиме разработки постоянно перезапускает сервер при каждом сохранении файла.
// Если не использовать globalThis, каждое сохранение будет создавать НОВОЕ подключение к базе,
// и через 5 минут PostgreSQL заблокирует нас за спам. globalThis сохраняет одно подключение!
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// 4. Экспортируем готовую Призму, которую будем использовать во всем проекте!
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
