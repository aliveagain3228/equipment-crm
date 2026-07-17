import { prisma } from "@/lib/prisma";
import Link from "next/link"
import { deleteEquipment, toggleStatus } from "./actions";

export default async function DashboardPage(props: {
    searchParams: Promise<{ query?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams.query || ""

    const equipmentList = await prisma.equipment.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { serialNumber: { contains: query, mode: "insensitive"} },
            ],
        },

        orderBy: { createdAt: "desc"}
    })

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-800">Учет техники</h1>

                    <form method="GET" action="/" className="flex gap-2">
                        <input
                            type="text"
                            name="query"
                            defaultValue={query}
                            placeholder="Поиск..."
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            type="submit"
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Найти
                        </button>
                    </form>

                    <Link
                        href="/add"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                        +Добавить технику
                        </Link>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Название</th>
                            <th className="p-4 font-semibold text-gray-600">Серийник</th>
                            <th className="p-4 font-semibold text-gray-600">Категория</th>
                            <th className="p-4 font-semibold text-gray-600">Статус</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                        {equipmentList.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                                <td className="p-4 ">{item.serialNumber}</td>
                                <td className="p-4 text-sm text-gray-500">{item.category}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        item.status === 'AVAILABLE'
                                        ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {item.status === 'AVAILABLE' ? 'Свободен' : 'Выдан'}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Link
                                        href={`/edit/${item.id}`}
                                        className="text-sm bg-gray-50 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                                        >
                                        Редакт.
                                    </Link>
                                    <form
                                        action={toggleStatus}
                                    >
                                        <input type="hidden" name="id" value={item.id} />
                                        <input type="hidden" name="currentStatus" value={item.status} />
                                        <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-colors">
                                            {item.status === 'AVAILABLE' ? 'Выдать' : 'Вернуть'}
                                        </button>
                                    </form>

                                    <form
                                        action={deleteEquipment}
                                    >
                                        <input type="hidden" name="id" value={item.id} />
                                        <button className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition-colors">
                                            Удалить
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
