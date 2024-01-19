import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchExpenses } from '@/app/lib/data';
import ExpensesTable from '../table';

jest.mock('@/app/lib/data');

describe('ExpensesTable', () => {
  const mockExpenses = [
    { expense_id: 1, timestamp: '2022-01-01', amount: 100, description: 'Test 1', paid_by_user: { name: 'User 1' } },
    { expense_id: 2, timestamp: '2022-01-02', amount: 200, description: 'Test 2', paid_by_user: { name: 'User 2' } },
    // Add more mock data as needed
  ];

  beforeEach(() => {
    (fetchExpenses as jest.Mock).mockResolvedValue({ expenses: mockExpenses });
  });

  test("test table rendering", async () => {
    const props = {
        groupID: '1', currentPage: 1 
    };
    render(await ExpensesTable(props));
    await waitFor(() => expect(fetchExpenses).toHaveBeenCalled());

    // test table
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // test table headers
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);

    // test table rows
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);

    // test table data
    const data = screen.getAllByRole('cell');
    expect(data).toHaveLength(10);
  });
});