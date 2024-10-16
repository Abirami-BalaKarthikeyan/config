// src/components/CSVUploader.js
import React, { useState } from "react";
import Papa from "papaparse";

const CSVUploader = () => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          const { data } = result;

          // Filter out rows where min_value or max_value are not numeric or both are 0
          const filteredData = data.filter(
            (row) =>
              !isNaN(row.min_value) &&
              !isNaN(row.max_value) &&
              !(Number(row.min_value) === 0 && Number(row.max_value) === 0)
          );

          // Remove unwanted columns (param_gui_name and extended_info)
          const cleanedData = filteredData.map(
            ({
              param_gui_name,
              extended_info,
              extra_info,
              field_info,
              param_type,
              rule_input_type,
              ...rest
            }) => rest
          );

          // Set headers excluding param_gui_name and extended_info
          const keys = Object.keys(cleanedData[0]).filter(
            (key) => key !== "param_gui_name" && key !== "extended_info"
          );

          setHeaders(keys);
          setTableData(cleanedData);
        },
      });
    }
  };

  return (
    <div>
      <h2>Upload CSV and Display Table</h2>

      {/* File Upload Input */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {/* Display table if data is present */}
      {tableData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {headers.map((header, idx) => (
                  <td key={idx}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CSVUploader;
