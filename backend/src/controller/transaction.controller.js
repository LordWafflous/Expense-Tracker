import { sql } from "../config/db.js"

export const transactionGet = async(req, res) => {
  try {
    const {userId} = req.params;
    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    if (transactions.length == 0) {
      return res.status(404).json({message: "No users found."});
    }

    res.status(201).json(transactions);
    
  } catch (error) {
    console.error("Internal server error at transaction controller.");
    res.status(500).json({message: error.message});
  }
}

export const transactionMake = async(req, res) => {
  try {
    const {title, amount, category, user_id} = req.body;
    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({message: "All fields are requires."});
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `
    console.log(transaction);
    res.status(201).json(transaction[0]);

  } catch (error) {
    console.log("Error in transaction controller.");
    res.status(500).json({message:error.message});
  }
}

export const transactionDelete = async(req, res) => {
  try {
    const {id} = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(404).json({message: "Invalid transaction ID"});
    }

    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `
    if (result.length == 0) { //means we deleted nothing
      return res.status(404).json({message: "Error during deleting transaction."});
    }

    res.status(201).json({message: "Transaction succesfully deleted."});
  } catch (error) {
    console.error("Internal server error at transaction controller.");
    res.status(500).json({message: error.message});

  }
}

export const transactionSummary = async(req, res) => {
  const {userId} = req.params;

  const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
  `
  const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as income FROM transactions 
    WHERE user_id = ${userId} AND amount > 0
  `

  const expensesResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions 
    WHERE user_id = ${userId} AND amount < 0
  `

  res.status(201).json({
    balance: balanceResult[0].balance,
    income: incomeResult[0].income,
    expenses: expensesResult[0].expenses,
  })
  try {
    
  } catch (error) {
    console.error("Erorr in transaction controller / summary");
    res.status(500).json({message: error.message});
  }
}