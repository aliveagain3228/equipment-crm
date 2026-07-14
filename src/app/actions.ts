"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

export async function deleteEquipment(formData: FormData) {
    const id = formData.get("id") as string

    await prisma.equipment.delete({
        where: { id },
    })

    revalidatePath("/")
}

export async function toggleStatus(formData: FormData) {
    const id = formData.get("id") as string
    const currentStatus = formData.get("currentStatus") as string

    const newStatus = currentStatus === "AVAILABLE" ? "IN_USE" : "AVAILABLE"

    await prisma.equipment.update({
        where: { id },
        data: { status: newStatus },
    })
    revalidatePath("/")
}

const equipmentSchema = z.object({
    name: z.string().min(3, "Название слишком короткое (минимум 3 символа)"),
    serialNumber: z.string().min(5, "Серийный номер должен содержать минимум 5 символов"),
    category: z.enum(["LAPTOP", "MONITOR", "KEYBOARD", "MOUSE"], {
        errorMap: () => ({ message: "Пожалуйста, выберите категорию из списка"})
})
})


export async function createEquipment(prevState: any, formData: FormData) {
    // 1. Сначала собираем данные
    const rawData = {
        name: formData.get("name"),
        serialNumber: formData.get("serialNumber"),
        category: formData.get("category")
    }

    // 2. Мягко проверяем их
    const result = equipmentSchema.safeParse(rawData)

    // 3. Если есть ошибки, отдаем их на клиент
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // 4. ИСКУССТВЕННАЯ ЗАДЕРЖКА 2 СЕКУНДЫ (чтобы увидеть серую кнопку загрузки)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 5. Записываем в базу чистые данные
    await prisma.equipment.create({
        data: {
            name: result.data.name,
            serialNumber: result.data.serialNumber,
            category: result.data.category,
        }
    })

    // 6. Возвращаемся на главную
    redirect("/")
}

