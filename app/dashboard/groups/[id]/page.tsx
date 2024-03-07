import { CreateExpense } from "@/app/ui/expenses/buttons";
import ExpensesTable from "@/app/ui/expenses/table";
import Balances from "@/app/ui/groups/balances";

export default async function Page({ params }: any) {
    const id = params.id;
    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2">
                <CreateExpense />
            </div>
            <div className="md:w-1/2">
                <Balances groupID={id} />
            </div>
            <ExpensesTable groupID={id} currentPage={1} />
        </div>
    )
}