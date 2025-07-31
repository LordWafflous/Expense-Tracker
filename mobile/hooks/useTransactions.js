import { useCallback } from "react";
import { useState } from "react";
import {Alert} from "react-native"

const API_URL = "http://localhost:5001/api"

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const[summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
 });
 const [isLoading, setIsLoading] = useState(true);

 //useCallBack is used for optimizing, it will memoize the function
 const fetchTransactions = useCallback( async() => {
  
  try {
    const res = await fetch(`${API_URL}/transactions/${userId}`)
    const data = await res.json()
    setTransactions(data)
    
  } catch (error) {
    console.error("Error during fetching transactions: ",error)
  }
 },[userId])

 const fetchSummary = useCallback(async () => {
  try {
    const res = await fetch(`${API_URL}/transactions/summary/${userId}`);
    const data = await res.json();
    setSummary(data);
    
  } catch (error) {
    console.error("Error fetching the summary: ", error);
  }

 }, [userId])

 const loadData = useCallback(async() => {
  if (!userId) {
    return;
  }
  setIsLoading(true);
  try {
    await Promise.all([fetchTransactions(), fetchSummary()])
  } catch (error) {
    console.error("Error loading data:", error);
  }finally{
    setIsLoading(false);
  }
 }, [fetchTransactions, fetchSummary, userId])

 const deleteTransaction = async (id) => {
  console.log(id);

  try {
    const res = await fetch(`${API_URL}/transactions/${id}`, {method: "DELETE"});
    if (!res.ok) {
      throw new Error("Failed to delete tranaction");
    }
    loadData();
    Alert.alert("Success", "Transaction deleted succesfully");

  } catch (error) {
    console.error("Error deleting transaction:", error);
    Alert.alert("Error", error.message);
  }
 }
 return {transactions, summary, isLoading, loadData, deleteTransaction};
};