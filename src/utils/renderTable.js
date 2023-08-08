import React from "react";
import { getHeaders, getColumnWidths } from "./helpers";
export const renderTable = (tableData, sortColumn, sortOrder, handleSort) => {
  if (!tableData) {
    console.log("tableData is undefined");
    return null;
  }

  const headers = getHeaders(tableData);
  const columnWidths = getColumnWidths(tableData);

  return (
    <div className="table-container">
      <table className="fixed-header-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{ width: `${columnWidths[header]}px` }}
                onClick={() => handleSort(header)}
              >
                {header} {sortColumn === header && sortOrder === "asc" && "▲"}
                {sortColumn === header && sortOrder === "desc" && "▼"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData
            .sort((a, b) => {
              if (sortColumn) {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
              }
              return 0;
            })
            .map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>
                    {typeof item[header] === "object"
                      ? Object.values(item[header]).join(", ")
                      : header === "description"
                      ? item[header].length > 100
                        ? item[header].slice(0, 100) + "..."
                        : item[header]
                      : item[header]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
