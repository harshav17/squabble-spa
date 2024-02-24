import { Expense } from "@/app/lib/definitions";
import { DeleteExpense, UpdateExpense } from "./buttons";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";

export default async function MobileTable({
    expenses
}: {
    expenses: Expense[];
}) {
    return (
        <div className="md:hidden">
            {expenses?.map((expense) => (
                <div
                    key={expense.expense_id}
                    className="mb-2 w-full rounded-md bg-white p-4 border-b-4"
                >
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <div className="mb-2 flex items-center">
                                <p>{formatDateToLocal(expense.timestamp)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                        <div>
                            <p className="text-xl font-medium">
                                {formatCurrency(expense.amount)}
                            </p>
                            <p>{expense.description}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <UpdateExpense id={expense.expense_id} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}