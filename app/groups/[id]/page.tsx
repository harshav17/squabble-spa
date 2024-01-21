import { CreateExpense } from "@/app/ui/expenses/buttons";
import ExpensesTable from "@/app/ui/expenses/table";
import Balances from "@/app/ui/groups/balances";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
    async function Page({ params }: any) {
        const id = params.id;
        return (
            <div className="w-full">
                <div className="mt-4 flex items-center justify-between gap-2">
                    <CreateExpense />
                </div>
                <Balances groupID={id} />
                <ExpensesTable groupID={id} currentPage={1} />
            </div>
        )
    }
);