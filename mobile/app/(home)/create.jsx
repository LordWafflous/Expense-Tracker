import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, TouchableOpacity, FlatList, Alert, RefreshControl, TextInput, ActivityIndicator } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import {Image} from "expo-image" 
import {Ionicons} from "@expo/vector-icons"
import {styles} from '../../assets/styles/create.styles'
import BalanceCard from '../../components/BalanceCard'
import TransactionItem from '../../components/TransactionItem'
import NoTransactionsFound from '../../components/NoTransactionsFound'
import { API_URL } from '../../constants/api'
import { COLORS } from '../../constants/colors'

const CATEGORIES = [
  {id: "food", name: "Food & Drinks", icon:"fast-food"},
  {id: "shopping", name: "Shopping", icon:"cart"},
  {id: "transportation", name: "Transportation", icon:"car"},
  {id: "entertainment", name: "Entertainment", icon:"film"},
  {id: "bills", name: "Bills", icon:"receipt"},
  {id: "income", name: "Income", icon:"cash"},
  {id: "bs", name: "Invesment :3", icon:"heart"},
  {id: "other", name: "Other", icon:"ellipsis-horizontal"},
];


const create = () => {
  const router = useRouter();
  const{user} = useUser();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user.id);

  const handleCreate = async() => {
    if(!title.trim())
    {
      return Alert.alert("Error", "Please enter a transaction title");
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    if (!selectedCategory) {
      return Alert.alert("Error", "Please select a category");
    }

    try {
      setIsLoading(true);
      const formattedAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          amount: formattedAmount,
          category: selectedCategory,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }
      Alert.alert("Success", "Transaction created succesfully");
      router.back();
    } catch (error) {
      Alert.alert("Error",error.message || "Failed to create transaction")
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={COLORS.text}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? 'Saving...' : 'Save'}</Text>
          {!isLoading && <Ionicons name='checkmark' size={18} color={COLORS.primary}/>}
        </TouchableOpacity>

      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name='arrow-down-circle'
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
          <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
            Expense
          </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name='arrow-up-circle'
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />

            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>

          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name='create-outline'
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder='Transaction Title'
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}

          />
        </View>

        <Text style={styles.sectionTitle}>
          <Ionicons
            size={16}
            name='pricetag-outline'
            color={COLORS.text}
          />
          Category
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map(category=>(
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Ionicons 
                name={category.icon}
                size={20}
                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              />

              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.name && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      {isLoading && (
        <View>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          />
        </View>
      )}

    </View>
  )
}

export default create