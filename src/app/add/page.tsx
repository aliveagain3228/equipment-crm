"use client"

import { useActionState } from "react";
import { createEquipment } from "@/app/actions";

export default function AddEquipmentPage() {
    const [state, formAction] = useActionState(createEquipment, null)


return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shados-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Добавить технику</h1>

                {state?.error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                        {state.error}
                    </div>
                )}

                <form action={formAction} className="flex flex-col gap-4">
                    <input
                        name="name"
                        placeholder="Название (например, MacBook)"
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        name="serialNumber"
                        placeholder="Серийный номер"
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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