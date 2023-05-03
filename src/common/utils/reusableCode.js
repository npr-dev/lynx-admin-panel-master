import React from "react";

export const ordersColumns = [
  {
    dataField: "_id",
    text: "Order No",
    sort: true
  },
  {
    dataField: "createdAt",
    text: "Order Date",
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return new Date(cell).toLocaleDateString();
    }
  },
  {
    dataField: "product.price",
    text: "Retail Price",
    sort: true,
    align: "center"
  },
  {
    dataField: "product.ratings",
    text: "Ratings",
    sort: true,
    align: "center"
  },
  {
    dataField: "product.stock",
    text: "Stock",
    sort: true,
    align: "center"
  },
  {
    dataField: "tracking.status",
    text: "Status",
    sort: true,
    align: "center",
    formatter: (cellContent, row) => {
      return (
        <div className="d-block w-100 text-center">
          <span className="badge badge-success"> {cellContent}</span>
        </div>
      );
    }
  }
];
