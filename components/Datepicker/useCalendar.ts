import {
	addDays,
	addMonths,
	endOfMonth,
	endOfWeek,
	format,
	getYear,
	isAfter,
	isBefore,
	isSameDay,
	isSameMonth,
	isToday,
	setMonth,
	setYear,
	startOfMonth,
	startOfWeek,
	subMonths,
} from "date-fns";
import { de, enUS, es, fr } from "date-fns/locale";
import { useMemo, useState } from "react";

export type TimezoneOption = "UTC" | "Local";
export type LocaleOption = "en" | "fr" | "de" | "es";

export interface CalendarLogicProps {
	initialDate?: Date;
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
	weekStartsOn?: 0 | 1;
	locale?: LocaleOption;
}

export function useCalendar({
	initialDate,
	minDate,
	maxDate,
	disabledDates = [],
	weekStartsOn = 0,
	locale = "en",
}: CalendarLogicProps) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		initialDate || null
	);
	const [currentMonth, setCurrentMonth] = useState<Date>(
		initialDate || new Date()
	);

	const localeObj = { en: enUS, fr, de, es }[locale];

	const monthDays = useMemo(() => {
		const startMonth = startOfMonth(currentMonth);
		const endMonth = endOfMonth(currentMonth);
		const startDateGrid = startOfWeek(startMonth, { weekStartsOn });
		const endDateGrid = endOfWeek(endMonth, { weekStartsOn });

		const days = [];
		let day = startDateGrid;

		while (day <= endDateGrid) {
			days.push(day);
			day = addDays(day, 1);
		}
		return days;
	}, [currentMonth, weekStartsOn]);

	const isDisabled = (date: Date) => {
		if (minDate && isBefore(date, minDate)) return true;
		if (maxDate && isAfter(date, maxDate)) return true;
		return disabledDates.some((d) => isSameDay(d, date));
	};

	const setMonthByNumber = (month: number) =>
		setCurrentMonth(setMonth(currentMonth, month));
	const setYearByNumber = (year: number) =>
		setCurrentMonth(setYear(currentMonth, year));

	const clearSelectedDate = () => {
		setSelectedDate(null);
	};

	return {
		selectedDate,
		setSelectedDate,
		currentMonth,
		nextMonth: () => setCurrentMonth(addMonths(currentMonth, 1)),
		prevMonth: () => setCurrentMonth(subMonths(currentMonth, 1)),
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
	};
}
