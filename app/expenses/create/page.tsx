import Breadcrumbs from '@/app/ui//breadcrumbs';
import { fetchExpenseByID, fetchGroupMembers } from '@/app/lib/data';
 
export default async function Page() {

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
                {
                    label: 'Create Expense',
                    href: '/expenses/create',
                    active: true,
                },
            ]}
        />
        </main>
    );
}