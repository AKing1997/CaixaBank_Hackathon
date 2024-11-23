import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

function AnalysisGraph() {
    const transactions = useStore(transactionsStore);

    // Unique categories
    // Instructions:
    // - Extract unique categories from the transactions
    // - This should gather all the categories used in the 'category' field of the transactions
    const categories = Array.from(
      new Set(transactions.map((transaction) => transaction.category))
    ); // Add logic to extract unique categories from transactions

    // Chart data
    // Instructions:
    // - Aggregate income and expense data for each category
    // - For each category, calculate the total 'income' and 'expense'
    // - The data array should return an object like this for each category: { category, Income, Expense }
    const data = categories.map((category) => {
	    const categoryTransactions = transactions.filter(
	      (transaction) => transaction.category === category
	    );
	    const totalIncome = categoryTransactions
	      .filter((transaction) => transaction.type === "income")
	      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
	
	    const totalExpense = categoryTransactions
	      .filter((transaction) => transaction.type === "expense")
	      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
	
	    return {
	      category,
	      Income: totalIncome,
	      Expense: totalExpense,
	    };
	  }); // Add logic to calculate income and expense for each category

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default AnalysisGraph;
