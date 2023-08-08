export const handleSort = (
  column,
  sortColumn,
  sortOrder,
  setSortColumn,
  setSortOrder
) => {
  if (column === sortColumn) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortColumn(column);
    setSortOrder("asc");
  }
};
