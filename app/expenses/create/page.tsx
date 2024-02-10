import Breadcrumbs from '@/app/ui//breadcrumbs';
import { fetchAllSplitTypes, fetchGroups } from '@/app/lib/data';
import { SplitType } from '@/app/lib/definitions';
import CreateExpenseFormWrapper from '@/app/ui/expenses/create-form-wrapper';
 
export default async function Page() {
    const groupsRes = await fetchGroups("");
    const groups = groupsRes.expenseGroups;

    const splitTypes: SplitType[] = await fetchAllSplitTypes();
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
            <CreateExpenseFormWrapper groups={groups} splitTypes={splitTypes} />
        </main>
    );
};