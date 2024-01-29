import { fetchExpenseByID, fetchGroupMembers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditExpenseForm from "@/app/ui/expenses/edit-form";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
    async function Page({ params }: any) {
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
                { expense && members && (
                    <EditExpenseForm expense={expense} members={members} />
                )}
            </main>
        );
    }
);