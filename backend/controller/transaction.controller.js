import { sql } from "../config/db.js"

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
    console.log("Error in transaction controller.")
    res.status(500).json({message:error.message})
  }

}