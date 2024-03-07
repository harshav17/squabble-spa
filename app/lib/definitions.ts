export type Group = {
    group_id: number;
    group_name: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}

export type GroupResponse = {
    expenseGroups: Group[]; // TODO should be underscored for consistency
    n: number;
}

export type Expense = {
    expense_id: number;
    group_id: number;
    paid_by: string;
    amount: number;
    description: string;
    timestamp: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;

    paid_by_user?: User;
    participants?: ExpenseParticipant[];
}

export type ExpenseResponse = {
    expenses: Expense[];
    n: number;
}

export type User = {
    email: string;
    name: string;
}

export type Member = {
    user_id: string;
    group_id: number;
    joined_at: string;
    user?: User;
}

export type MemberResponse = {
    group_members: Member[];
    n: number;
}

export type SplitType = {
    split_type_id: number;
    type_name: string;
    description: string;
    created_at: string;
}

export type Balance = {
    user_id: string;
    group_id: number;
    amount: number;
}

export type ExpenseParticipant = {
    expense_id: number;
    user_id: string;
    amount_owed: number;
    share_percentage: number;
    Note: string;
}

export type NavLink = {
    name: string;
    href: string;
    icon: React.ComponentType<React.ComponentProps<'svg'>>;
    current: boolean;
}
