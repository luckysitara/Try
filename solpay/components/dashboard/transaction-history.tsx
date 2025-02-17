import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  {
    id: "INV001",
    paymentId: "SOLPAY1234",
    amount: 316.23,
    status: "success",
    email: "m@example.com",
  },
  {
    id: "INV002",
    paymentId: "SOLPAY5678",
    amount: 242.59,
    status: "processing",
    email: "j@example.com",
  },
  {
    id: "INV003",
    paymentId: "SOLPAY9101",
    amount: 837.12,
    status: "success",
    email: "s@example.com",
  },
  {
    id: "INV004",
    paymentId: "SOLPAY1121",
    amount: 98.34,
    status: "failed",
    email: "a@example.com",
  },
  {
    id: "INV005",
    paymentId: "SOLPAY3141",
    amount: 520.79,
    status: "success",
    email: "m@example.com",
  },
]

export function TransactionHistory() {
  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Payment ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.paymentId}</TableCell>
            <TableCell>{transaction.status}</TableCell>
            <TableCell>{transaction.email}</TableCell>
            <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

