import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchExpenses } from '@/app/lib/data';
import ExpensesTable from '../table';

jest.mock('@/app/lib/data');

describe('ExpensesTable', () => {
  const mockExpenses = [
    { expense_id: 1, timestamp: '2022-01-01T10:00:54Z', amount: 100, description: 'Test 1', paid_by_user: { name: 'User 1' } },
    { expense_id: 2, timestamp: '2022-01-02T10:00:54Z', amount: 200, description: 'Test 2', paid_by_user: { name: 'User 2' } },
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

    // test row 0
    expect(data[0]).toHaveTextContent('Jan 1, 2022');
    expect(data[1]).toHaveTextContent('$100.00');
    expect(data[2]).toHaveTextContent('Test 1');
    expect(data[3]).toHaveTextContent('User 1');

    // test row 1
    expect(data[5]).toHaveTextContent('Jan 2, 2022');
    expect(data[6]).toHaveTextContent('$200.00');
    expect(data[7]).toHaveTextContent('Test 2');
    expect(data[8]).toHaveTextContent('User 2');
  });
});