"use client"

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { createEquipment } from "@/app/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`mt-4 font-semibold p-3 rounded-lg transition-colors text-white ${
                pending ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
        >
            {pending ? "Сохранение..." : "Сохранить в базу"}
        </button>
    )
}

export default function AddEquipmentPage() {
    const [state, formAction] = useActionState(createEquipment, null)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            toast.success("Техника успешно добавлена!")
            router.push("/")
        }
    }, [state?.success, router])

return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Добавить технику</h1>

                <form action={formAction} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <input
                            name="name"
                            placeholder="Название (например, MacBook)"
                            required
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {state?.errors?.name && (
                            <span className="text-red-500 text-xs pl-1">{state.errors.name[0]}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            name="serialNumber"
                            placeholder="Серийный номер"
                            required
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {state?.errors?.serialNumber && (
                            <span className="text-red-500 text-xs pl-1">{state.errors.serialNumber[0]}</span>
                        )}
                    </div>



                    <select
                        name="category"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    >
                        <option value="LAPTOP">Ноутбук</option>
                        <option value="MONITOR">Монитор</option>
                        <option value="KEYBOARD">Клавиатура</option>
                        <option value="MOUSE">Мышь</option>
                    </select>

                    <SubmitButton />
                </form>
            </div>
        </main>
    )
}