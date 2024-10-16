// import React, { useState } from "react";
// import Papa from "papaparse";

// const CsvBitwiseCheck = () => {
//   const [processedData, setProcessedData] = useState([]);

//   const number2Mapping = {
//     SRI: 2,
//     MTS: 4,
//     //    RR: 8,
//     "ESME Server": 16,
//     "ESME Client": 64,
//     DBM: 256,
//     CRM: 512,
//     MPM: 2048,
//   };

//   const getStatus = (maxValue, number2) => (maxValue & number2 ? 1 : 0);

//   const processCsvData = (parsedData) => {
//     const updatedData = parsedData
//       .map((row) => {
//         const maxValue = parseInt(row.max_value || row.cfg_parameter_value, 10);
//         const statusByModule = Object.keys(number2Mapping).reduce(
//           (acc, module) => {
//             const number2 = number2Mapping[module];
//             acc[module] = getStatus(maxValue, number2);
//             return acc;
//           },
//           {}
//         );
//         const updatedRow = {
//           ...row,
//           param_gui_name: row.param_gui_name || row.cfg_parameter,
//           ...statusByModule,
//         };

//         return updatedRow;
//       })
//       .filter(
//         (row) =>
//           (row.param_gui_name || row.cfg_parameter) &&
//           (row.max_value || row.cfg_parameter_value) &&
//           (row.cfg_module_id === "6" || row.nw_element_id === "6")
//       );

//     setProcessedData(updatedData);
//   };

//   const handleFileUpload = (event) => {
//     const uploadedFile = event.target.files[0];

//     if (!uploadedFile) return;

//     const reader = new FileReader();
//     reader.onload = ({ target }) => {
//       const csv = target.result;

//       // Parse the CSV data using PapaParse
//       Papa.parse(csv, {
//         header: true,
//         complete: (result) => {
//           processCsvData(result.data);
//         },
//       });
//     };
//     reader.readAsText(uploadedFile);
//   };

//   const renderStatusCell = (status) => {
//     const cellStyle = {
//       backgroundColor: status === 1 ? "green" : "red",
//       color: "white",
//     };
//     return <td style={cellStyle}>{status}</td>;
//   };

//   const exportToJson = () => {
//     const json = JSON.stringify(processedData, null, 2);
//     const blob = new Blob([json], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "processed_data.json";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <h1>CSV Bitwise Check</h1>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />
//       {processedData.length > 0 && (
//         <div>
//           <table className="bitwise-table">
//             <thead>
//               <tr>
//                 <th>Serial No</th>
//                 <th>Param GUI Name</th>
//                 <th>Max Value</th>
//                 <th>SRI</th>
//                 <th>MTS</th>
//                 <th>ESME Server</th>
//                 <th>ESME Client</th>
//                 <th>DBM</th>
//                 <th>CRM</th>
//                 <th>MPM</th>
//               </tr>
//             </thead>
//             <tbody>
//               {processedData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{row.param_gui_name}</td>
//                   <td>{row.max_value || row.cfg_parameter_value}</td>

//                   {Object.keys(number2Mapping).map((module) =>
//                     renderStatusCell(row[module])
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button onClick={exportToJson} style={{ marginTop: "20px" }}>
//             Export to JSON
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CsvBitwiseCheck;
// src/App.js
import React from "react";
import CSVUploader from "../src/CSVUploader";

function App() {
  return (
    <div className="App">
      <div>Configuration</div>
      <CSVUploader />
    </div>
  );
}

export default App;
