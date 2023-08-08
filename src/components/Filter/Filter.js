import React, { useState, useEffect } from "react";
import "./Filter.css";

const Filter = ({
  tableData,
  filters,
  handleFilterChange,
  handleFilterApply,
  handleResetFilter,
  resetTableData,
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [maxHeaderLength, setMaxHeaderLength] = useState(0);
  const resetFilter = () => {
    handleResetFilter();
    resetTableData();
  };

  useEffect(() => {
    if (tableData) {
      const maxLength = Object.keys(tableData[0]).reduce((max, header) => {
        const headerLength = header.length;
        return headerLength > max ? headerLength : max;
      }, 0);
      setMaxHeaderLength(maxLength);
    }
  }, [tableData]);

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <div className="filter-section">
      {tableData && (
        <button
          className={`filter-show ${isFilterExpanded ? "expanded" : ""}`}
          onClick={toggleFilter}
        >
          Фильтр
        </button>
      )}
      {isFilterExpanded && tableData && (
        <div className="filter-container">
          <div className="filter-fields">
            {Object.keys(tableData[0]).map((header) => (
              <div key={header} className="filter-field">
                <span>{header}</span>
                <input
                  type="text"
                  value={filters[header] || ""}
                  onChange={(e) => handleFilterChange(header, e.target.value)}
                  style={{ width: `${maxHeaderLength * 10}px` }}
                />
              </div>
            ))}
          </div>
          <div className="apply-filter-container">
            <button className="apply-filter-button" onClick={handleFilterApply}>
              Применить
            </button>
          </div>
          <div className="reset-filter-container">
            <button className="reset-filter-button" onClick={resetFilter}>
              Сбросить фильтр
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
