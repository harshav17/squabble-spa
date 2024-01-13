import { Expense, ExpenseResponse, GroupResponse, MemberResponse, SplitType } from "./definitions";
import { unstable_noStore as nostore } from 'next/cache';

export async function fetchGroups(query: string) {
    nostore();

    const response = await fetch('http://localhost:8080/groups', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const data: GroupResponse = await response.json();
    return data;
}

export async function fetchExpenses(groupID: string) {
    nostore();

    const response = await fetch(`http://localhost:8080/groups/${groupID}/expenses`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const data: ExpenseResponse = await response.json();
    return data;
}

export async function fetchExpenseByID(expenseID: string) {
    nostore();

    const response = await fetch(`http://localhost:8080/expenses/${expenseID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const data: Expense = await response.json();
    return data;
}

export async function fetchGroupMembers(groupID: string) {
    nostore();

    const response = await fetch(`http://localhost:8080/groups/${groupID}/members`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const data: MemberResponse = await response.json();
    return data;
}

export async function fetchAllSplitTypes() {
    nostore();

    const response = await fetch(`http://localhost:8080/split_types`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const data: SplitType[] = await response.json();
    return data;
}