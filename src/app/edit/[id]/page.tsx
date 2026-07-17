import { prisma } from "@/lib/prisma";
import EditForm from "./edit-form";
import { redirect } from "next/navigation";

export default async function EditEquipmentPage(props: {
    params: Promise<{ id: string }>
}) {
    const params = await props.params
    const equipment = await prisma.equipment.findUnique({
        where: { id: params.id }
    })

    if (!equipment) {
        redirect("/")
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Редактировать технику</h1>

                <EditForm equipment={equipment}/>
            </div>
        </main>
    )
}