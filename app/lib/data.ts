'use server';

import { Balance, Expense, ExpenseResponse, GroupResponse, MemberResponse, SplitType } from "./definitions";
import { unstable_noStore as nostore } from 'next/cache';
import { getSession } from '@auth0/nextjs-auth0';

export async function fetchGroups(query: string) {
    nostore();

    const session = await getSession();
    if (!session) {
        return null;
    }

    const response = await fetch('http://localhost:8080/groups', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data: GroupResponse = await response.json();
    return data;
}

export async function fetchExpenses(groupID: string) {
    nostore();

    const session = await getSession();
    if (!session) {
        return null;
    }

    const response = await fetch(`http://localhost:8080/groups/${groupID}/expenses`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data: ExpenseResponse = await response.json();
    return data;
}

export async function fetchExpenseByID(expenseID: string) {
    nostore();

    const session = await getSession();
    if (!session) {
        return null;
    }

    const response = await fetch(`http://localhost:8080/expenses/${expenseID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data: Expense = await response.json();
    return data;
}

export async function fetchGroupMembers(groupID: string) {
    nostore();

    const session = await getSession();
    if (!session) {
        return null;
    }

    const response = await fetch(`http://localhost:8080/groups/${groupID}/members`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data: MemberResponse = await response.json();
    return data;
}

export async function fetchGroupBalances(groupID: string) {
    nostore();

    const session = await getSession();
    if (!session) {
        return null;
    }

    const response = await fetch(`http://localhost:8080/groups/${groupID}/balances`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data: Balance[] = await response.json();
    return data;
}

export async function fetchAllSplitTypes() {
    nostore();

    const session = await getSession();
    if (!session) {
        return null;
    }

    const response = await fetch(`http://localhost:8080/split_types`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data: SplitType[] = await response.json();
    return data;
}