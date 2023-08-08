import React, { useState, useEffect } from "react";
import "./App.css";
import { renderTable } from "./utils/renderTable";
import { handleSort } from "./utils/sortTable";
import Filter from "./components/Filter/Filter";

function App() {
  const [jsonLink, setJsonLink] = useState("");
  const [tableData, setTableData] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [initialTableData, setInitialTableData] = useState(null);
  useEffect(() => {
    if (tableData) {
      const initialFilters = {};
      Object.keys(tableData[0]).forEach((header) => {
        initialFilters[header] = "";
      });
      setFilters(initialFilters);
      setInitialTableData(tableData);
    }
  }, [tableData]);

  const handleResetFilter = () => {
    setTableData(initialTableData);
    setFilters({});
    setSortColumn(null);
    setSortOrder("asc");
  };

  const fetchData = async () => {
    try {
      const response = await fetch(jsonLink);
      const jsonData = await response.json();
      setTableData(jsonData);
      setSortColumn(null);
      setSortOrder("asc");
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };
  const handleFilterApply = () => {
    const filteredData = tableData.filter((item) => {
      return Object.keys(filters).every((header) => {
        const filterValue = filters[header];
        const itemValue = item[header];

        return itemValue
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });

    setTableData(filteredData);
  };

  const handleFilterChange = (header, value) => {
    setFilters({
      ...filters,
      [header]: value,
    });
  };

  return (
    <div className="app-container">
      <a
        href="http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        target="_blank"
      >
        online json data
      </a>
      <div className="input-section">
        <div className="input-container">
          <input
            type="text"
            value={jsonLink}
            onChange={(e) => setJsonLink(e.target.value)}
            placeholder="Вставьте ссылку на JSON данные"
          />
        </div>
        <button className="fetch-button" onClick={fetchData}>
          Получить
        </button>
      </div>
      <Filter
        tableData={tableData}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleFilterApply={handleFilterApply}
        handleResetFilter={handleResetFilter}
        resetTableData={fetchData}
      />
      {renderTable(
        tableData || [],
        sortColumn,
        sortOrder,

        (column) =>
          handleSort(column, sortColumn, sortOrder, setSortColumn, setSortOrder)
      )}
    </div>
  );
}

export default App;
