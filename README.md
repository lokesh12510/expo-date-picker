# Expo Date Picker Library

A cross-platform, customizable Date Picker component for React Native and Expo, supporting Web, iOS, and Android with a unified API and modern UI.

---

## ✨ Features

- **Platform-adaptive**: Custom calendar UI for Web, consistent experience on iOS and Android
- **Unified API**: Same props and events across all platforms
- **Customizable**: Style and extend as needed
- **No native code required**: 100% Expo compatible
- **TypeScript support**

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Usage

Import and use the Datepicker component:

```tsx
import { Datepicker } from "./components/Datepicker";

export default function App() {
	const [date, setDate] = useState<Date | null>(null);
	return (
		<Datepicker
			onDateTimeSelect={setDate}
			initialDate={new Date()}
			minDate={new Date(2020, 0, 1)}
			maxDate={new Date(2030, 11, 31)}
			weekStartsOn={0}
			locale="en"
			showTimePicker={false}
		/>
	);
}
```

### Props

| Prop             | Type        | Description                         |
| ---------------- | ----------- | ----------------------------------- | -------------------------------- | ---- | -------------------------- |
| onDateTimeSelect | (date: Date | null) => void                       | Callback when a date is selected |
| initialDate      | Date        | Initially selected date             |
| minDate          | Date        | Minimum selectable date             |
| maxDate          | Date        | Maximum selectable date             |
| disabledDates    | Date[]      | Array of dates to disable           |
| weekStartsOn     | 0           | 1                                   | 0 = Sunday, 1 = Monday           |
| locale           | "en"        | "fr"                                | "de"                             | "es" | Locale for calendar labels |
| showTimePicker   | boolean     | Show time picker (if implemented)   |
| responsive       | boolean     | Enable responsive layout (web only) |

---

## API & Customization

- All calendar logic is handled in `components/Datepicker/useCalendar.ts`.
- The main component is in `components/Datepicker/index.tsx` and is fully documented with JSDoc.
- Styles can be customized by editing the `styles` object in the component.

---

## Project Structure

- `components/Datepicker/` — Date picker logic and hooks

---

## About

This library is designed for Expo and React Native projects that need a modern, customizable, and Expo-compatible date picker. It does not require any native modules or linking, and works out of the box on all supported platforms.

---

## Resources

- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [date-fns](https://date-fns.org/) (for date logic)

---

## License

MIT
