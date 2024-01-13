import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders dashboard text', () => {
    // TODO why is it rendering dashboard text?
    render(<Page />)
 
    const dashboardElement = screen.getByText('Dashboard');
    expect(dashboardElement).toBeInTheDocument();
  })
})