import React, { useState } from "react";

export const Table = ({ columns, data, onRowSelect, customStyles, headerStyle, rowStyle, cellOfHeaderStyle, cellOfRowStyle }) => {
  const [rows, setRows] = useState(
    data.map((row) => ({ ...row, isSelected: false }))
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleRowSelection = (_id) => {
    const updatedRows = rows.map((row) =>
      row._id === _id ? { ...row, isSelected: !row.isSelected } : row
    );
    setRows(updatedRows);
    onRowSelect(updatedRows.filter((row) => row.isSelected));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedRows = rows.map((row) => ({
      ...row,
      isSelected: newSelectAll,
    }));
    setSelectAll(newSelectAll);
    setRows(updatedRows);
    onRowSelect(updatedRows.filter((row) => row.isSelected));
  };

  return (
    <div className={`flex flex-col w-full ${customStyles}`}>
        <div className={`flex  ${headerStyle}`}>
          {/* <div className={`flex-2 ${cellOfHeaderStyle}`}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </div> */}
          {columns.map((col) => (
            <div key={col.key} style={col.style} className={`flex-1 ${cellOfHeaderStyle}`}>
              {col.header}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row._id} className={`flex ${rowStyle}`}>
            {/* <div className={`flex-2 ${cellOfRowStyle}`}>
              <input
                type="checkbox"
                checked={row.isSelected}
                onChange={() => handleRowSelection(row._id)}
              />
            </div> */}
            {columns.map((col) => (
              <div key={col.key} style={col.style} className={`flex-1 ${cellOfRowStyle}`}>
                {row[col.key]}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
