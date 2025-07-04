# Expo Date Picker Component

This project demonstrates a **custom Date Picker component** for React Native apps using [Expo](https://expo.dev), supporting **web, iOS, and Android** platforms with a unified API and native-like experience.

## Features

- ✨ **Platform-adaptive**: Custom UI for Web, native pickers for iOS and Android.
- 🗓️ **Consistent API**: Use the same props and events across all platforms.
- 🎨 **Customizable**: Easily style and extend the date picker for your app's needs.
- 🚀 **Expo-ready**: No native code or extra linking required.

## Usage

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

3. **Try the Date Picker**

   The main Date Picker component is in `components/Datepicker/index.tsx`. Example usage:

   ```tsx
   import DatePicker from "../components/Datepicker";

   <DatePicker
   	value={selectedDate}
   	onChange={setSelectedDate}
   	minimumDate={new Date(2020, 0, 1)}
   	maximumDate={new Date(2030, 11, 31)}
   />;
   ```

## Platform Details

- **Web**: Custom calendar UI for a native-like experience in browsers.
- **iOS**: Uses the native `DatePickerIOS` for seamless integration.
- **Android**: Uses the native `DatePickerAndroid` dialog for a familiar look and feel.

All platforms share the same API, so you can write cross-platform code without worrying about platform-specific details.

## Why a Custom Date Picker?

React Native and Expo provide some date picker solutions, but they often require native modules or have inconsistent APIs. This project offers:

- A single, Expo-compatible component for all platforms
- No need to eject or add custom native code
- A consistent developer and user experience

## Learn more about Date Pickers in React Native & Expo

- [React Native DateTimePicker](https://github.com/react-native-datetimepicker/datetimepicker)
- [Expo DateTimePicker docs](https://docs.expo.dev/versions/latest/sdk/date-time-picker/)
- [Building custom pickers in React Native](https://blog.expo.dev/building-custom-date-and-time-pickers-in-react-native-5b7c6e2c6a9c)

## Project Structure

- `components/Datepicker/` — Main date picker logic and hooks
- `app/` — App entry and screens
- `assets/` — Images and fonts

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Community & Resources

- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
