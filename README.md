# CyberChatbot

CyberChatbot is a React Native (Expo) mobile application providing a specialized AI assistant for cybersecurity. Built with Google's latest **Gemini 2.5 Flash** model, it answers questions on cyber threats, protecting personal information, and information security best practices.

It features a unique, modern, Matrix-inspired user interface using React Native Gifted Chat.

## Features

- **Expert Security AI:** Context-aware, pre-prompted assistant dedicated to cybersecurity.
- **Fast Generation:** Utilizing the lightning-fast Gemini 2.5 Flash model from Google Generative AI.
- **Matrix-Inspired Theme:** Dark background with terminal-green highlights.
- **Real-Time Chat:** Beautiful chat interface powered by React Native Gifted Chat.
- **Cross-Platform:** Works on Android, iOS, and Web (via Expo).

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) 
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/virti310/smartchat.git
   cd CyberChatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Key:**
   Open `App.tsx` and place your Gemini API key:
   ```typescript
   const apiKey = "YOUR_GEMINI_API_KEY";
   ```
   *(Note: For production, consider using environment variables for the API key rather than hardcoding it).*

## Usage

Start the development server:

```bash
npm start
```
or 
```bash
npx expo start
```

Use the Expo Go app on your mobile device to scan the QR code and test the chatbot on a physical device, or run it on an emulator (Android Studio / Xcode).

## File Structure

- `App.tsx`: Main chat interface and Gemini API integration logic.
- `package.json`: Contains project metadata and dependencies.
- `.env`: Environment variables configuration.

## Dependencies

- `@google/generative-ai`
- `react-native-gifted-chat`
- `expo`
- `react-native`
- `react-native-safe-area-context`
