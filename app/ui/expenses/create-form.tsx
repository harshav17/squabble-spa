'use client';

import { createExpense } from "@/app/lib/actions";
import { Member, SplitType } from "@/app/lib/definitions";
import { useFormState } from "react-dom";


export default function CreateExpenseForm({
    group_id,
    members,
    splitTypes
}: {
    group_id: number;
    members: Member[];
    splitTypes: SplitType[];
}) {
    const initialState = { group_id: group_id, expense_id: 0, message: "", errors: {}};
    const [state, dispatch] = useFormState(createExpense, initialState);
    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-900 p-4 md:p-6">
                {/* Paid By */}
                <div className="mb-4">
                    <label htmlFor="paidBy" className="mb-2 block text-sm font-medium">
                        Paid By
                    </label>
                    <div className="relative">
                        <select
                        id="paidBy"
                        name="paidBy"
                        className="peer block w-full cursor-pointer rounded-md border bg-gray-900 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        >
                        <option value="" disabled>
                            Paid By
                        </option>
                        {members && members.map((member) => (
                            <option key={member.user_id} value={member.user_id}>
                            {member.user?.name}
                            </option>
                        ))}
                        </select>
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
                        className="block w-full rounded-md border bg-gray-900 py-2 text-sm pl-4"
                        placeholder="Amount"
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

                {/* Timestamp TODO validate dates */}
                <div className="mb-4">
                    <label htmlFor="timestamp" className="mb-2 block text-sm font-medium">
                        Date
                    </label>
                    <input
                        type="datetime-local"
                        id="timestamp"
                        name="timestamp"
                        className="block w-full rounded-md border bg-gray-900 py-2 text-sm pl-4"
                        placeholder="Date"
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
                        className="block w-full rounded-md border bg-gray-900 py-2 text-sm pl-4"
                        placeholder="Description"
                    />
                </div>

                {/* split types */}
                <div className="mb-4">
                    <label htmlFor="splitType" className="mb-2 block text-sm font-medium">
                        Split Type
                    </label>
                    <div className="relative">
                        <select
                        id="splitType"
                        name="splitType"
                        className="peer block w-full cursor-pointer rounded-md border bg-gray-900 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        >
                        <option value="" disabled>
                            Split Type
                        </option>
                        {splitTypes.map((splitType) => (
                            <option key={splitType.split_type_id} value={splitType.split_type_id}>
                            {splitType.type_name}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>

                {state.message && (
                    <p className='mt-2 text-sm text-red-500'>
                    {state.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    Create Expense
                </button>
            </div>
        </form>
    )
}