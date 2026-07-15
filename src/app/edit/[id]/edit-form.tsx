import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { updateEquipment } from "@/app/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`mt-4 font-semibold p-3 rounded-lg transition-colors text-white ${
                pending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
            {pending ? "Сохранение..." : "Обновить данные"}
        </button>
    )
}

export default function EditForm({ equipment } : { equipment: any }) {
    const [state, formAction] = useActionState(updateEquipment, null)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            toast.success("Техника успешно обновлена!")
            router.push("/")
        }
    }, [state?.success, router])

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <input
                type="hidden"
                name="id"
                value={equipment.id}
            />
            <div className="flex flex-col gap-1">
                <input
                    name="name"
                    defaultValue={equipment.name}
                    placeholder="Название"
                    required
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state?.erorrs?.name && (
                    <span className="text-red-500 text-xs pl-1">{state.errors.name[0]}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <input
                    name="serialNumber"
                    defaultValue={equipment.serialNumber}
                    placeholder="Серийный номер"
                    required
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state?.errors?.serialNumber && (
                    <span className="text-red-500 text-xs pl-1">{state.errors.serialNumber[0]}</span>
                )}
            </div>

            <select
                name="category"
                defaultValue={equipment.category}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="LAPTOP">Ноутбук</option>
                <option value="MONITOR">Монитор</option>
                <option value="KEYBOARD">Клавиатура</option>
                <option value="MOUSE">Мышь</option>
            </select>

            <SubmitButton />
        </form>
    )
}