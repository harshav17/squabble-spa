import { fetchExpenseByID, fetchGroupMembers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditExpenseForm from "@/app/ui/expenses/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const expense = await fetchExpenseByID(id);
    const membersRes = await fetchGroupMembers(String(expense.group_id));
    const members = membersRes?.group_members;
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: `Group ${expense.group_id}`, href: `/groups/${expense.group_id}` },
                {
                    label: 'Edit Expense',
                    href: `/expenses/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <EditExpenseForm expense={expense} members={members} />
        </main>
    );
}