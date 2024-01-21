'use client';

import { Expense, Member } from "@/app/lib/definitions";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { formatDatetimeForInput } from "@/app/lib/utils";
import { updateExpense } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function EditExpenseForm({
    expense,
    members,
}: {
    expense: Expense;
    members: Member[];
}) {
    const initialState = { expense_id: expense.expense_id, group_id: expense.group_id, message: "", errors: {}};
    const [state, dispatch] = useFormState(updateExpense, initialState);
    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Paid By */}
                <div className="mb-4">
                    <label htmlFor="paidBy" className="mb-2 block text-sm font-medium">
                        Paid By
                    </label>
                    <div className="relative">
                        <select
                        id="paidBy"
                        name="paidBy"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={expense.paid_by}
                        >
                        <option value="" disabled>
                            Paid By
                        </option>
                        {members.map((member) => (
                            <option key={member.user_id} value={member.user_id}>
                            {member.user?.name}
                            </option>
                        ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        step="0.01"
                        className="block w-full rounded-md border border-gray-200 py-2 text-sm pl-4"
                        placeholder="Amount"
                        defaultValue={expense.amount}
                    />
                    <div id="amount-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.amount && 
                        state.errors.amount.map((error: string) => (
                            <p className='mt-2 text-sm text-red-500' key={error}>
                            {error}
                            </p>
                        ))
                        }
                    </div>
                </div>

                {/* Timestamp */}
                <div className="mb-4">
                    <label htmlFor="timestamp" className="mb-2 block text-sm font-medium">
                        Date
                    </label>
                    <input
                        type="datetime-local"
                        id="timestamp"
                        name="timestamp"
                        className="block w-full rounded-md border border-gray-200 py-2 text-sm pl-4"
                        placeholder="Date"
                        defaultValue={formatDatetimeForInput(expense.timestamp)}
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="block w-full rounded-md border border-gray-200 py-2 text-sm pl-4"
                        placeholder="Description"
                        defaultValue={expense.description}
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-2">
                    <button
                        type="submit"
                        className="rounded-md border p-2 hover:bg-gray-100"
                    >
                        <span>Update</span>
                    </button>
                </div>
            </div>
        </form>
    )
}