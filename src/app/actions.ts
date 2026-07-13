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
    name: z.string().min(3),
    serialNumber: z.string().min(5),
    category: z.enum(["LAPTOP", "MONITOR", "KEYBOARD", "MOUSE"]),
})

export async function createEquipment(prevState: any, formData: FormData) {

    const rawData = {
        name: formData.get("name"),
        serialNumber: formData.get("serialNumber"),
        category: formData.get("category")
    }

    try {
        const validatedData = equipmentSchema.parse(rawData)

        await prisma.equipment.create({
            data: {
                name: validatedData.name,
                serialNumber: validatedData.serialNumber,
                category: validatedData.category,
            },
        })
    } catch (error) {
        return {
            error: "Ошибка валидации. Проверьте длину полей!",
        }
    }
    redirect("/")
}
