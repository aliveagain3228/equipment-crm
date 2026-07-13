import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function AddEquipmentPage() {
    async function createEquipment(formData: FormData) {
        "use server"

        const name = FormData.get("name") as string
        const serialNumber = formData.get("serialNumber") as string
        const category = formData.get("category") as "LAPTOP" | "MONITOR" | "KEYBOARD" | "MOUSE"

        await prisma.equipment.create({
            data: {
                name,
                serialNumber,
                category,
            },
        })

        redirect("/")
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shados-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Добавить технику</h1>

                <form action={createEquipment} className="flex flex-col gap-4">
                    <input
                        name="name"
                        placeholder="Название (например, MacBook)"
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:rind-2 focus:ring-green-500"
                    />

                    <input
                        name="serialNumber"
                        placeholder="Серийный номер"
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:rind-2 focus:ring-green-500"
                    />

                    <select
                        name="category"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    >
                        <option value="LAPTOP">Ноутбук</option>
                        <option value="MONITOR">Монитор</option>
                        <option value="KEYBOARD">Клавиатура</option>
                        <option value="MOUSE">Мышь</option>
                    </select>

                    <button
                        type="submit"
                        className="mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Сохранить в базу
                    </button>
                </form>
            </div>
        </main>
    )
}