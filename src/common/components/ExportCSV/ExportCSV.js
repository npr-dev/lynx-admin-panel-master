import React from "react";
import { Button } from "reactstrap";
import { CSVLink } from "react-csv";
import './ExportCSV.css'

export const ExportCSV = ({ csvData, fileName }) => {
  console.log("csvData-----", csvData);
  console.log("fileName-----", fileName);

  return (
    <Button style={{padding: '0.5rem'}} className="mr-2 btn-icon action-btn" color="primary">
      <CSVLink data={csvData} filename={fileName}>
        Export Excel File
      </CSVLink>
    </Button>
  );
};
