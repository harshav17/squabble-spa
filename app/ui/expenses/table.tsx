import { UpdateExpense, DeleteExpense } from '@/app/ui/expenses/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchExpenses } from '@/app/lib/data';
import DesktopTable from './desktop-table';
import MobileTable from './mobile-table';

export default async function ExpensesTable({
  groupID,
  currentPage,
}: {
  groupID: string;
  currentPage: number;
}) {
  const expenseResponse = await fetchExpenses(groupID);
  const expenses = expenseResponse?.expenses;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <div className="md:hidden">
            <MobileTable expenses={expenses} />
          </div>
          <div className='hidden md:block'>
            <DesktopTable expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
}
