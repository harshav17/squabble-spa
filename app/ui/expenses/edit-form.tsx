'use client';

import { Expense, Member } from "@/app/lib/definitions";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { formatDatetimeForInput } from "@/app/lib/utils";
import { updateExpense } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export default function EditExpenseForm({
    expense,
    members,
}: {
    expense: Expense;
    members: Member[];
}) {
    const [checkedState, setCheckedState] = useState(
        new Array(members.length).fill(false)
    );

    useEffect(() => {
        // Check if there are participants in the expense
        if (expense.participants && expense.participants.length > 0) {
            const updatedCheckedState = members.map(member => 
                expense.participants?.some(participant => 
                    participant.user_id === member.user_id
                )
            );
            setCheckedState(updatedCheckedState);
        }
    }, [members, expense.participants]); // Dependencies for useEffect

    const onChecked = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

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
                        {members && members.map((member) => (
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

                {/* Participants */}
                <div className="mb-4 sm:w-1/3">
                    <fieldset>
                        <legend className="text-base font-semibold leading-6 text-gray-900">Members</legend>
                        {members && members.map((member, idx) => (
                            <div key={member.user_id} className="relative flex items-start py-4">
                                <div className="min-w-0 flex-1 text-sm leading-6">
                                    <label htmlFor={member.user_id} className="select-none font-medium text-gray-900">{member.user?.name}</label>
                                </div>
                                <div className="ml-3 flex h-6 items-center">
                                    <input 
                                        id={member.user_id} 
                                        value={member.user_id} 
                                        name="participants" 
                                        type="checkbox" 
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" 
                                        checked={checkedState[idx]}
                                        onChange={() => onChecked(idx)}
                                    />
                                </div>
                            </div>
                        ))}
                    </fieldset>
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