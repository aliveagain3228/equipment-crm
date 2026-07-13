"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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