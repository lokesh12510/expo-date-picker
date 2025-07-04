import { Datepicker } from "@/components/Datepicker";
import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
	return (
		<View style={styles.container}>
			<Text>Date picker</Text>

			<Datepicker
				onDateTimeSelect={(date) => console.log(date)}
				minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
				maxDate={new Date(2025, 11, 31)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
});
