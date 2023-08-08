export const getHeaders = (tableData) => {
  if (tableData && tableData.length > 0) {
    const firstItem = tableData[0];
    return Object.keys(firstItem);
  }
  return [];
};

export const getColumnWidths = (data) => {
  const columnWidths = {};

  getHeaders(data).forEach((header) => {
    const maxContentWidth = Math.max(
      ...data.map((item) => {
        const value = item[header];
        return value ? value.toString().length : 0;
      })
    );

    columnWidths[header] = Math.min(maxContentWidth * 10, 300);
  });

  return columnWidths;
};
