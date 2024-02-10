'use server';

import { Balance, Expense, ExpenseResponse, GroupResponse, MemberResponse, SplitType } from "./definitions";
import { unstable_noStore as nostore } from 'next/cache';
import { auth } from "@clerk/nextjs";

export async function fetchGroups(query: string) {
    nostore();

    const {userId, getToken} = auth();
    if(!userId){
        // return dummy group response
        return {
            expenseGroups: [],
            n: 0
        };
    }
    const token = await getToken();

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}/groups`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data: GroupResponse = await response.json();
    return data;
}

export async function fetchExpenses(groupID: string) {
    nostore();

    const {userId, getToken} = auth();
    if(!userId){
        // return dummy expense response
        return {
            expenses: [],
            n: 0
        };
    }
    const token = await getToken();

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}/groups/${groupID}/expenses`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data: ExpenseResponse = await response.json();
    return data;
}

export async function fetchExpenseByID(expenseID: string) {
    nostore();

    const {userId, getToken} = auth();
    if(!userId){
        // return dummy expense response
        return {
            expense_id: 0,
            group_id: 0,
            paid_by: "",
            amount: 0,
            description: "",
            timestamp: "",
            created_at: "",
            updated_at: "",
            created_by: "",
            updated_by: "",
        };
    }
    const token = await getToken();

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}/expenses/${expenseID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data: Expense = await response.json();
    return data;
}

export async function fetchGroupMembers(groupID: string) {
    nostore();

    const {userId, getToken} = auth();
    if(!userId){
        // return dummy
        return {
            group_members: [],
            n: 0
        };
    }
    const token = await getToken();

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}/groups/${groupID}/members`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data: MemberResponse = await response.json();
    return data;
}

export async function fetchGroupBalances(groupID: string) {
    nostore();

    const {userId, getToken} = auth();
    if(!userId){
        // return dummy
        return [];
    }
    const token = await getToken();

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}/groups/${groupID}/balances`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data: Balance[] = await response.json();
    return data;
}

export async function fetchAllSplitTypes() {
    nostore();

    const {userId, getToken} = auth();
    if(!userId){
        // return dummy
        return [];
    }
    const token = await getToken();

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}/split_types`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data: SplitType[] = await response.json();
    return data;
}