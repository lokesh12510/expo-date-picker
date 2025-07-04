import { useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { CalendarLogicProps, useCalendar } from "./useCalendar";

interface CalendarPickerProps extends CalendarLogicProps {
	onDateTimeSelect: (date: Date | null) => void;
	showTimePicker?: boolean;
	responsive?: boolean;
}

export function Datepicker({
	onDateTimeSelect,
	initialDate,
	minDate,
	maxDate,
	disabledDates,
	weekStartsOn = 0,
	locale = "en",
	showTimePicker = true,
	responsive = true,
}: CalendarPickerProps) {
	const {
		selectedDate,
		setSelectedDate,
		currentMonth,
		nextMonth,
		prevMonth,
		monthDays,
		isSameMonth,
		isSameDay,
		isToday,
		format,
		getYear,
		setMonthByNumber,
		setYearByNumber,
		isDisabled,
		localeObj,
		clearSelectedDate,
	} = useCalendar({
		initialDate,
		minDate,
		maxDate,
		disabledDates,
		weekStartsOn,
		locale,
	});

	const [hours, setHours] = useState("00");
	const [minutes, setMinutes] = useState("00");
	const [showYearDropdown, setShowYearDropdown] = useState(false);
	const [showMonthDropdown, setShowMonthDropdown] = useState(false);

	const handleDateTimeConfirm = () => {
		if (!selectedDate) return;
		const result = new Date(selectedDate);
		result.setHours(parseInt(hours));
		result.setMinutes(parseInt(minutes));
		onDateTimeSelect(result);
	};

	return (
		<View style={[styles.container, responsive && styles.responsive]}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					{selectedDate
						? format(selectedDate, "dd MMMM yyyy", { locale: localeObj })
						: "-- --"}
				</Text>

				<Pressable
					style={styles.todayButton}
					onPress={() => setSelectedDate(new Date())}
				>
					<Text style={styles.todayButtonText}>Today</Text>
				</Pressable>
			</View>

			<View style={styles.controls}>
				{/* Prev Month */}
				<TouchableOpacity style={styles.dropdownTrigger} onPress={prevMonth}>
					<Text>{"<"}</Text>
				</TouchableOpacity>

				<View style={{ flexDirection: "row", gap: 8 }}>
					<TouchableOpacity
						style={styles.dropdownTrigger}
						onPress={() => {
							setShowMonthDropdown(!showMonthDropdown);
							setShowYearDropdown(false);
						}}
					>
						<Text>{format(currentMonth, "MMM", { locale: localeObj })}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.dropdownTrigger}
						onPress={() => {
							setShowYearDropdown(!showYearDropdown);
							setShowMonthDropdown(false);
						}}
					>
						<Text>{getYear(currentMonth)}</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.dropdownTrigger} onPress={nextMonth}>
					<Text>{">"}</Text>
				</TouchableOpacity>
			</View>

			{showYearDropdown && (
				<ScrollView style={styles.dropdownList}>
					{Array.from({ length: 100 }, (_, i) => getYear(new Date()) - 50 + i).map(
						(year) => (
							<TouchableOpacity
								key={year}
								style={styles.dropdownItem}
								onPress={() => {
									setYearByNumber(year);
									setShowYearDropdown(false);
								}}
							>
								<Text>{year}</Text>
							</TouchableOpacity>
						)
					)}
				</ScrollView>
			)}

			{showMonthDropdown && (
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-between",
						marginVertical: 4,
						borderWidth: 1,
						borderColor: "#c4c4c4",
						backgroundColor: "#fff",
						borderRadius: 4,
					}}
				>
					{Array.from({ length: 12 }, (_, i) => i).map((month) => (
						<TouchableOpacity
							key={month}
							style={{
								width: "25%",
								aspectRatio: 1,
								alignItems: "center",
								justifyContent: "center",
								borderWidth: 1,
								borderColor: "#e0e0e0",
								borderRadius: 4,
								padding: 8,
								backgroundColor: "#fff",
							}}
							onPress={() => {
								setMonthByNumber(month);
								setShowMonthDropdown(false);
							}}
						>
							<Text>{format(new Date(2000, month, 1), "MMM", { locale: localeObj })}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{!showMonthDropdown && !showYearDropdown && (
				<Animated.View entering={FadeIn} exiting={FadeOut} style={styles.grid}>
					{monthDays.map((day, index) => {
						const disabled = isDisabled(day);
						const current = isSameDay(day, selectedDate || new Date());
						return (
							<Pressable
								key={index}
								disabled={disabled}
								onPress={() => setSelectedDate(day)}
								style={[
									styles.day,
									!isSameMonth(day, currentMonth) && styles.outside,
									current && styles.selected,
									disabled && styles.disabled,
								]}
							>
								<Text
									style={[
										styles.dayText,
										isToday(day) && styles.today,
										current && styles.selectedText,
									]}
								>
									{format(day, "d")}
								</Text>
							</Pressable>
						);
					})}
				</Animated.View>
			)}

			{showTimePicker && selectedDate && (
				<View style={styles.timeContainer}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
						<TextInput
							style={styles.timeInput}
							keyboardType="numeric"
							maxLength={2}
							value={hours}
							onChangeText={setHours}
							placeholder="HH"
						/>
						<Text>:</Text>
						<TextInput
							style={styles.timeInput}
							keyboardType="numeric"
							maxLength={2}
							value={minutes}
							onChangeText={setMinutes}
							placeholder="MM"
						/>
					</View>

					<View
						style={{
							flexDirection: "row",
							gap: 8,
							marginTop: 8,
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<Pressable onPress={clearSelectedDate} style={styles.clearButton}>
							<Text style={{ color: "#1976d2", textTransform: "uppercase" }}>Clear</Text>
						</Pressable>
						<Pressable onPress={handleDateTimeConfirm} style={styles.confirmButton}>
							<Text style={{ color: "#fff", textTransform: "uppercase" }}>Select</Text>
						</Pressable>
					</View>
				</View>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		padding: 8,
		borderWidth: 1,
		borderColor: "#c4c4c4",
		borderRadius: 4,
		backgroundColor: "#fff",
	},
	responsive: { width: "100%", maxWidth: 360, alignSelf: "center" },
	controls: {
		flexDirection: "row",
		marginBottom: 8,
		justifyContent: "space-between",
		gap: 8,
	},
	dropdownTrigger: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#c4c4c4",
		borderRadius: 4,
		backgroundColor: "#fff",
	},
	dropdownList: {
		maxHeight: 200,
		borderWidth: 1,
		borderColor: "#c4c4c4",
		backgroundColor: "#fff",
		marginVertical: 4,
		borderRadius: 4,
	},
	dropdownItem: {
		padding: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
	day: {
		aspectRatio: 1,
		flexBasis: "14.28%", // 7 days in a week
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		borderRadius: 4,
		marginVertical: 2,
	},
	dayText: { fontSize: 16, color: "#000" },
	outside: { opacity: 0.3 },
	selected: { backgroundColor: "#1976d2", borderRadius: 100 },
	selectedText: { color: "#fff" },
	disabled: { opacity: 0.2 },
	today: { fontWeight: "bold", color: "#d32f2f" },
	timeContainer: {
		// flexDirection: "row",
		alignItems: "center",
		marginTop: 12,
		gap: 4,
		flex: 1,
		borderTopWidth: 1,
		borderTopColor: "#c4c4c4",
		paddingTop: 12,
	},
	timeInput: {
		borderWidth: 1,
		borderColor: "#c4c4c4",
		padding: 6,
		width: "100%",
		textAlign: "center",
		borderRadius: 4,
	},
	confirmButton: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		backgroundColor: "#1976d2",
		borderRadius: 8,
		width: "30%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
	},
	clearButton: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#1976d2",
		borderRadius: 8,
		width: "30%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
	},
	header: {
		marginTop: 4,
		marginBottom: 18,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
	todayButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: "#c7e3ff",
		borderRadius: 4,
	},
	todayButtonText: {
		color: "#1976d2",
		fontSize: 14,
		fontWeight: "500",
		textTransform: "uppercase",
	},
});
