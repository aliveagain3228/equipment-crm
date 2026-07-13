import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import "dotenv/config"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.equipment.deleteMany()

    await prisma.equipment.createMany({
        data: [
            {name: "MacBook Pro 16", serialNumber: "MAC-001", category: "LAPTOP"},
            {name: "MacBook Air 12", serialNumber: "MAC-002", category: "LAPTOP"},
            {name: "Dell UltraSharp 27", serialNumber: "MON-001", category: "MONITOR"},
            {name: "Logitech MX Master 3", serialNumber: "MOU-001", category: "MOUSE"},
        ],
    })
    console.log("✅ База данных успешно заполнена тестовой техникой!")
}

main()
.catch((e) => {
    console.error("Ошибка при сидировании:", e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})