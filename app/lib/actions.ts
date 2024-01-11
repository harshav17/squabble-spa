'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    paidBy: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number()
    .gt(0, {
        message: 'Amount must be greater than 0.',
    }),
    description: z.string(),
    timestamp: z.string(),
});

const UpdateInvoice = FormSchema.omit({});

export async function createExpense() {}

export async function deleteExpense(id: number) {}

export type State = {
    expense_id: number;
    group_id: number;
    errors?: {
        amount?: string[];
    };
    message?: string | null;
};
export async function updateExpense(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = UpdateInvoice.safeParse({
        amount: formData.get('amount'),
        description: formData.get('description'),
        paidBy: formData.get('paidBy'),
        timestamp: formData.get('timestamp'),
    });

    if (!validatedFields.success) {
        return {
            expense_id: prevState.expense_id,
            group_id: prevState.group_id,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Create Invoice.'
        };
    }

    const { paidBy, amount, description, timestamp } = validatedFields.data;

    // Convert timestamp to ISO 8601 format
    const timestampISO = new Date(timestamp).toISOString();

    await fetch(`http://localhost:8080/expenses/${prevState.expense_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            paid_by: paidBy,
            amount: amount,
            description: description,
            timestamp: timestampISO,
        }),
    });

    revalidatePath(`/groups/${prevState.group_id}`);
    redirect(`/groups/${prevState.group_id}`);
}