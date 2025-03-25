import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, useColorScheme } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState("");
    const [baseCurrency, setBaseCurrency] = useState("LKR");
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");

    // Currency options
    const currencyOptions = [
        { label: "USD", value: "USD" },
        { label: "LKR", value: "LKR" },
        { label: "EUR", value: "EUR" },
        { label: "GBP", value: "GBP" },
        { label: "JPY", value: "JPY" },
    ];

    // Fetch exchange rates when currency changes
    useEffect(() => {
        const fetchCurrencyRates = async () => {
            try {
                const response = await axios.get(`https://api.exchangeratesapi.io/v1/latest?access_key=3d4d6a17d87acd9587ba8695a7a41c0f&format=1${baseCurrency}`);
                setExchangeRate(response.data.rates[targetCurrency]);
            } catch (error) {
                console.error("Error fetching currency rates:", error);
                Alert.alert("Error", "Failed to fetch exchange rates. Please try again.");
            }
        };

        fetchCurrencyRates();
    }, [baseCurrency, targetCurrency]);

    // Convert currency
    const convertCurrency = () => {
        if (!amount || isNaN(amount)) {
            Alert.alert("Invalid Input", "Please enter a valid number.");
            return;
        }

        if (!exchangeRate) {
            Alert.alert("Error", "Exchange rate not available. Try again.");
            return;
        }

        const converted = parseFloat(amount) * exchangeRate;
        setConvertedAmount(converted.toFixed(2));
    };

    // Toggle Dark Mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>

            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                <Text style={styles.buttonText}>{isDarkMode ? "Light Mode" : "Dark Mode"}</Text>
            </TouchableOpacity>

            <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Amount</Text>
            <TextInput
                style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                keyboardType="numeric"
                value={amount}
                onChangeText={(text) => {
                    setAmount(text);
                    if (text === "") {
                        setConvertedAmount(0);
                    }
                }}
                placeholder="Enter amount"
                placeholderTextColor={isDarkMode ? "#ccc" : "#666"}
            />

            <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Base Currency</Text>
            <RNPickerSelect
                value={baseCurrency}
                onValueChange={setBaseCurrency}
                items={currencyOptions}
                style={styles.pickerSelectStyles}
            />

            <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Target Currency</Text>
            <RNPickerSelect
                value={targetCurrency}
                onValueChange={setTargetCurrency}
                items={currencyOptions}
                style={styles.pickerSelectStyles}
            />

            <TouchableOpacity style={styles.button} onPress={convertCurrency}>
                <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>

            {convertedAmount !== 0 && (
                <Text style={[styles.result, isDarkMode ? styles.darkText : styles.lightText]}>
                    {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
                </Text>
            )} 

        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 30,
        marginTop: 50,
    },
    lightContainer: {
        backgroundColor: "#ffffff",
    },
    darkContainer: {
        backgroundColor: "#121212",
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    lightText: {
        color: "#000",
    },
    darkText: {
        color: "#fff",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: 330,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    lightInput: {
        borderColor: "gray",
        backgroundColor: "#fff",
        color: "#000",
    },
    darkInput: {
        borderColor: "#555",
        backgroundColor: "#222",
        color: "#fff",
    },
    button: {
        backgroundColor: "#6200ea",
        padding: 10,
        borderRadius: 5,
        marginTop: 40,
        marginBottom:320,
        alignItems:"center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    themeButton: {
        backgroundColor: "#6200ea",
        padding: 10,
        borderRadius: 5,
        marginBottom: 100,
        marginLeft: 230,
        marginTop:20,
        alignItems:"center"
    },
    result: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: "bold",
    },
    pickerSelectStyles: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        width: 200,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 20,

    },
    pickerInput: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default CurrencyConverter;
