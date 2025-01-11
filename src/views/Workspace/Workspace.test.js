import React from "react"
import { render, screen } from "@testing-library/react"
import { dummyQuestion } from "../../static/editor"
import ProblemDescription from "./ProblemDescription"
import userEvent from '@testing-library/user-event'

describe("Workspace Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the fetched problem when API call succeeds", async () => {
    const mockProblem = dummyQuestion
    render(<ProblemDescription problem={mockProblem} />)
    expect(screen.getByText(mockProblem.name)).toBeInTheDocument()
    expect(screen.getByText(mockProblem.name)).toHaveTextContent('Two Sum')
    expect(mockProblem.examples.length).toBe(2)
  });

  it('Check the Submission section display correctly', async ()=> {
    const mockProblem = dummyQuestion
    render(<ProblemDescription problem={mockProblem} />)
    const submissionTab = screen.getByTestId('submission-tab')
    userEvent.click(submissionTab);
    expect(screen.getByText(/all submissions/i)).toBeInTheDocument()
    expect(screen.queryByText(/Two Sum/i)).not.toBeInTheDocument()
  })

  it('Check the Description section display correctly after toggling ', async ()=> {
    const mockProblem = dummyQuestion
    render(<ProblemDescription problem={mockProblem} />)
    const submissionTab = screen.getByTestId('submission-tab')
    const descriptionTab = screen.getByTestId('description-tab')
    userEvent.click(submissionTab)
    expect(screen.getByText(/all submissions/i)).toBeInTheDocument()
    expect(screen.queryByText(/Two Sum/i)).not.toBeInTheDocument()
    userEvent.click(descriptionTab)
    expect(screen.queryByText(/all submissions/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Two Sum/i)).toBeInTheDocument()
  })
});
