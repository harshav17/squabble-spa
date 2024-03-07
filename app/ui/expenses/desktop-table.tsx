import { Expense } from "@/app/lib/definitions";
import { DeleteExpense, UpdateExpense } from "./buttons";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";

export default async function DesktopTable({
    expenses
}: {
    expenses: Expense[];
}) {
    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">
                            Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                            Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                            Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                            Paid By
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {expenses?.map((expense) => (
                        <tr key={expense.expense_id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium">
                                {formatDateToLocal(expense.timestamp)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{formatCurrency(expense.amount)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{expense.description}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{expense.paid_by_user?.name}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                <UpdateExpense id={expense.expense_id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}