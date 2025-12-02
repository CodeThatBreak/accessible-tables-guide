import { ColumnConfig } from "../types/column";
import { RowActionsCell } from "../renderer/cell/action";
import { RowSelectorCell } from "../renderer/cell/selector";
import { RowStandardCell } from "../renderer/cell/standard";

import Cell from "./Cell";

const Row = ({
  row,
  isRowSelected,
  columns,
  onAction,
  editingCell,
  rowHeight,
}: {
  row: any;
  isRowSelected: boolean;
  columns: ColumnConfig[];
  onAction: (type: string, payload?: any) => void;
  editingCell: string | null;
  rowHeight: number;
}) => {
  const renderCell = (row: any, col: ColumnConfig) => {
    switch (col.type) {
      case "selector":
        return (
          <RowSelectorCell
            rowId={row.id}
            checked={isRowSelected}
            onAction={onAction}
          />
        );

      case "actions":
        return (
          <RowActionsCell rowId={row.id} column={col} onAction={onAction} />
        );
      default:
        return (
          <RowStandardCell
            row={row}
            column={col}
            value={row[col.key]}
            editingCell={editingCell}
            onAction={onAction}
          />
        );
    }
  };

  return (
    <tr
      key={row.id}
      className={`
        border-b border-neutral-800
        ${
          isRowSelected
            ? "bg-indigo-500/10 hover:bg-indigo-500/15"
            : "hover:bg-neutral-800/50"
        }
        `}
      style={{ height: rowHeight }}
    >
      {columns.map((col) => (
        <Cell width={col.width} key={col.key}>
          {renderCell(row, col)}
        </Cell>
      ))}
    </tr>
  );
};

export default Row;
