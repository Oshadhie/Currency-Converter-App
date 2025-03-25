# Currency Converter App

## 🌟 Overview
This is a **React Native Currency Converter App** that allows users to convert currencies in real time. It also supports **Light and Dark mode** for a better user experience.

## ✨ Features
- 💱 Convert between multiple currencies (USD, LKR, EUR, GBP, JPY)
- 🌐 Fetches real-time exchange rates from an API
- 🎨 Switch between **Light Mode** and **Dark Mode**
- 📱 Simple and responsive UI

## 🚀 Technologies Used
- **React Native**
- **Axios** (for API calls)
- **react-native-picker-select** (for currency selection)
- **React Hooks** (useState, useEffect)

## 🔧 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Currency-Converter-App.git
cd Currency-Converter-App
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the App
For Android:
```bash
npx react-native run-android
```
For iOS (Mac users only):
```bash
npx react-native run-ios
```

## 🔑 API Setup
This app uses an **exchange rate API**. Get a free API key from [ExchangeRate-API](https://www.exchangerate-api.com/) and replace `YOUR_API_KEY` in the code:

```javascript
const response = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrency}`);
```


---
🚀 **Happy Coding!** 🎉

