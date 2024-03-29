'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ExpenseParticipant } from './definitions';
import { auth } from '@clerk/nextjs';

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
    splitType: z.coerce.number(),
    participants: z.array(z.string()),
});

const UpdateInvoice = FormSchema.omit({splitType: true});
const CreateInvoice = FormSchema.omit({participants: true});

export async function deleteExpense(id: number, group_id: number) {
    const { userId, getToken } = auth();
    if (!userId) {
      throw new Error('You must be signed in to add an item to your cart');
    }
    const token = await getToken();

    await fetch(`${process.env.AUTH0_AUDIENCE}/expenses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    revalidatePath(`/groups/${group_id}`);
}

export type State = {
    expense_id: number;
    group_id: number;
    errors?: {
        amount?: string[];
    };
    message?: string | null;
    split_type_id?: number;
};
export async function updateExpense(prevState: State, formData: FormData): Promise<State> {
    const { userId, getToken } = auth();
    if (!userId) {
      throw new Error('You must be signed in to add an item to your cart');
    }
    const token = await getToken();

    const participants = formData.getAll('participants');
    
    const validatedFields = UpdateInvoice.safeParse({
        amount: formData.get('amount'),
        description: formData.get('description'),
        paidBy: formData.get('paidBy'),
        timestamp: formData.get('timestamp'),
        participants: participants,
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

    // create ExpenseParticipants
    const expenseParticipants: ExpenseParticipant[] = participants.map((participant) => {
        return {
            user_id: participant.toString(),
            expense_id: prevState.expense_id,
            amount_owed: 0,
            share_percentage: 0,
            Note: '',
        };
    });

    await fetch(`${process.env.AUTH0_AUDIENCE}/expenses/${prevState.expense_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            paid_by: paidBy,
            amount: amount,
            description: description,
            timestamp: timestampISO,
            participants: expenseParticipants,
        }),
    });

    revalidatePath(`/groups/${prevState.group_id}`);
    redirect(`/groups/${prevState.group_id}`);
}

export async function createExpense(prevState: State, formData: FormData): Promise<State> {
    const { userId, getToken } = auth();
    if (!userId) {
      throw new Error('You must be signed in to add an item to your cart');
    }
    const token = await getToken();

    const validatedFields = CreateInvoice.safeParse({
        paidBy: formData.get('paidBy'),
        amount: formData.get('amount'),
        description: formData.get('description'),
        timestamp: formData.get('timestamp'),
        splitType: formData.get('splitType'),
    });

    if (!validatedFields.success) {
        return {
            expense_id: prevState.expense_id,
            group_id: prevState.group_id,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Create Invoice.'
        };
    }

    const { paidBy, amount, description, timestamp, splitType } = validatedFields.data;

    // Convert timestamp to ISO 8601 format
    const timestampISO = new Date(timestamp).toISOString();

    const res = await fetch(`${process.env.AUTH0_AUDIENCE}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            paid_by: paidBy,
            amount: amount,
            description: description,
            timestamp: timestampISO,
            group_id: prevState.group_id,
            split_type_id: splitType,
            created_by: 'test_user_id', // TODO get from session / auth0
        }),
    });

    const data = await res.json();
    if (data.error) { // TODO make robust? is data.error idiomatic? how about response codes?
        return {
            expense_id: prevState.expense_id,
            group_id: prevState.group_id,
            errors: data.errors,
            message: `Failed to Create Invoice. ${data.error}`
        };
    }

    revalidatePath(`/groups/${prevState.group_id}`);
    redirect(`/groups/${prevState.group_id}`);
}

const GroupSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    members: z.array(z.string()),
});
const CreateGroup = GroupSchema.omit({});
export type GroupState = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
};

export async function createGroup(prevState: GroupState, formData: FormData): Promise<GroupState> {
    const { userId, getToken } = auth();
    if (!userId) {
      throw new Error('You must be signed in to add an item to your cart');
    }
    const token = await getToken();

    const members = formData.getAll('members');
    const validatedFields = CreateGroup.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        members: members,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Create Group.'
        };
    }

    const { name, description } = validatedFields.data;

    const res = await fetch(`${process.env.AUTH0_AUDIENCE}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            group_name: name,
            description: description,
            members: members,
        }),
    });

    const data = await res.json();
    revalidatePath(`/groups/${data.group_id}`);
    redirect(`/groups/${data.group_id}`);
}