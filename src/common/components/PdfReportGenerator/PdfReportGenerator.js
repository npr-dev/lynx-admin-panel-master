import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// define a generatePDF function that accepts a tickets argument
const PdfReportGenerator = (data, tableColumns, filename) => {
  console.log("data", data);
  console.log("tableColumns", tableColumns);

  // initialize jsPDF
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [350, 350],
  });

  // define the columns we want and their titles

  const tableColumn = tableColumns;

  // define an empty array of rows
  const tableRows = [];

  // for each data pass all its data into an array
  data.forEach((data) => {
    const Data = Object.values(data);
    // push each data's info into a row
    tableRows.push(Data);
  });

  autoTable(doc, {
    head: [tableColumn], // don't forget square brackets, columns is an array of string
    body: tableRows, // array of arrays of string
    theme: "grid",
    styles: {overflow: 'linebreak'},
    headStyles:{cellWidth:'wrap'},
    horizontalPageBreak:true
  });

  // we define the name of our PDF file.
  doc.save(`${filename}.pdf`);
};

export default PdfReportGenerator;
