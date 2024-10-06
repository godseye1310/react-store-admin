import { useCallback, useEffect, useState } from "react";

// Custom hook for sorting by column
export const useSort = (
	initialData,
	initialColumn = null,
	initialOrder = "asc"
) => {
	const [sortConfig, setSortConfig] = useState({
		key: initialColumn,
		order: initialOrder,
	});

	const sortedData = [...initialData].sort((a, b) => {
		if (!sortConfig.key) return 0;

		const { key, order } = sortConfig;
		const isAsc = order === "asc";

		if (typeof a[key] === "number" && typeof b[key] === "number") {
			return isAsc ? a[key] - b[key] : b[key] - a[key];
		}

		if (typeof a[key] === "string" && typeof b[key] === "string") {
			return isAsc
				? a[key].localeCompare(b[key])
				: b[key].localeCompare(a[key]);
		}

		if (a[key] instanceof Date && b[key] instanceof Date) {
			return isAsc ? a[key] - b[key] : b[key] - a[key];
		}

		return 0;
	});

	const requestSort = useCallback(
		(key) => {
			let order = "asc";
			if (sortConfig.key === key && sortConfig.order === "asc") {
				order = "desc";
			}
			setSortConfig({ key, order });
		},
		[sortConfig.key, sortConfig.order]
	);

	return { sortedData, requestSort, sortConfig };
};
