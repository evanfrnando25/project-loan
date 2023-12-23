export interface LoanData {
  id: string;
  amount: number;
  interestRate: number;
  term: number;
  purpose: string;
  riskRating: string;
  borrower: {
    id: string;
    name: string;
    email: string;
    creditScore: number;
  };
  collateral: {
    type: string;
    value: number;
  };
  documents: Array<{
    type: string;
    url: string;
  }>;
  repaymentSchedule: {
    installments: Array<{
      dueDate: string;
      amountDue: number;
    }>;
  };
}
