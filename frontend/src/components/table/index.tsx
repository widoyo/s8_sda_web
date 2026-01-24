import * as React from "react";
import { Checkbox } from "../checkbox";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./based";

// Adjust the import path as necessary

// Define the types for the columns and data props including style props
interface Column {
  header: string;
  accessor: string;
  headerClassName?: string; // Custom class for header cells
}

interface DataRow {
  [key: string]: React.ReactNode;
}

interface Selected {
  [key: string]: React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  data: DataRow[];
  caption?: string;
  footer?: DataRow;
  className?: string; // Custom class for the entire table
  headerClassName?: string; // Custom class for the header row
  bodyClassName?: string; // Custom class for the body section
  footerClassName?: string; // Custom class for the footer row
  asSelect?: boolean;
  asDetail?: boolean;
  selected?: Selected[];
  selectAccessor?: string;
  setSelected?: (key: Selected[]) => void;
  onDetailChange?: () => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  caption,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  asSelect = false,
  asDetail = false,
  selected = [],
  selectAccessor = "id",
  setSelected = () => {},
  onDetailChange = () => {},
}) => {
  const onParentClick = (e: any, item: DataRow) => {
    if (e.target.tagName !== "BUTTON") {
      if (asSelect && !asDetail) {
        const checkSelected = selected.some(
          (selectedItem) =>
            selectedItem[selectAccessor] === item[selectAccessor]
        );
        handleSelect(!checkSelected, item);
      }
      if (asDetail && !asSelect) {
        onDetailChange();
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked
      ? [...selected, ...data]
      : selected.filter(
          (selectedItem) =>
            !data.some(
              (item) => item[selectAccessor] === selectedItem[selectAccessor]
            )
        );
    setSelected(newSelected);
  };

  const handleSelect = (checked: boolean, item: DataRow) => {
    const isSelected = selected.some(
      (selectedItem) => selectedItem[selectAccessor] === item[selectAccessor]
    );

    if (checked && !isSelected) {
      setSelected([...selected, item]);
    } else if (!checked && isSelected) {
      setSelected(
        selected.filter(
          (selectedItem) =>
            selectedItem[selectAccessor] !== item[selectAccessor]
        )
      );
    }
  };

  const dataIds = data.map((item) => item[selectAccessor]);
  const selectedIds = selected.map((item) => item[selectAccessor]);

  return (
    <Table className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className={headerClassName}>
        <TableRow>
          {asSelect && (
            <TableHead key="check_all">
              <Checkbox
                onCheckedChange={handleSelectAll}
                checked={
                  data.length > 0 &&
                  dataIds.every((id) => selectedIds.includes(id))
                }
              />
            </TableHead>
          )}
          {columns.map((column, index) => (
            <TableHead key={index} className={column.headerClassName}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={bodyClassName}>
        {data?.map((row, rowIndex) => {
          return (
            <TableRow key={rowIndex} onClick={(e) => onParentClick(e, row)}>
              {asSelect && (
                <TableCell key="check">
                  <input
                    type="checkbox"
                    checked={selected?.some(
                      (selectedItem) =>
                        selectedItem[selectAccessor] === row[selectAccessor]
                    )}
                    onChange={(e) => {
                      handleSelect(e.target.checked, row);
                    }}
                    className="hidden peer"
                  />
                  <div
                    className={`h-4 w-4 rounded-sm border border-primary flex items-center justify-center ${
                      selected?.some(
                        (selectedItem) =>
                          selectedItem[selectAccessor] === row[selectAccessor]
                      )
                        ? "bg-[#171717] text-primary-foreground"
                        : "bg-white"
                    } peer-checked:bg-[#171717] peer-checked:text-primary-foreground`}
                  >
                    {selected?.some(
                      (selectedItem) =>
                        selectedItem[selectAccessor] === row[selectAccessor]
                    ) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-check h-4 w-4"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    )}
                  </div>
                </TableCell>
              )}
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.accessor]}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      {footer && (
        <TableFooter className={footerClassName}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{footer[column.accessor]}</TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default CustomTable;
