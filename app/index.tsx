import { Datepicker } from "@/components/Datepicker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Datepicker</Text>

			<Datepicker onDateTimeSelect={(date) => console.log(date)} />
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		padding: 20,
	},
	text: {
		fontSize: 18,
		color: "#333",
		marginBottom: 20,
		fontWeight: "bold",
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
});
