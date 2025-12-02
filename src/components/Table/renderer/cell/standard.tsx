import { ColumnConfig } from "../../types/column";
import { ActionTypes } from "../../constant/actionTypes";

const RowStandardCell = ({
  row,
  column,
  value,
  editingCell,
  onAction,
}: {
  row: any;
  column: ColumnConfig;
  value: any;
  editingCell: string | null;
  onAction: (type: string, payload?: any) => void;
}) => {
  const isCurrentCellEdited = editingCell === `${row.id}-${column.key}`;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onAction(ActionTypes.STOP_EDITING, {
      row,
      column,
      value: e.target.value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((isCurrentCellEdited && e.key == "Enter") || e.key === "Escape") {
      onAction(ActionTypes.STOP_EDITING, {
        row,
        column,
        value: e.currentTarget.value,
      });

      return;
    }

    if (e.key === "Enter") {
      onAction(ActionTypes.START_EDITING, {
        row,
        column,
      });
      return;
    }
  };

  return column.editable && isCurrentCellEdited ? (
    <input
      className="w-full bg-neutral-700 border border-indigo-500 rounded text-white text-sm"
      defaultValue={value}
      autoFocus
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className={
        column.editable ? "cursor-pointer hover:bg-neutral-700 rounded" : ""
      }
      onClick={() =>
        column.editable && onAction(ActionTypes.START_EDITING, { row, column })
      }
    >
      {column.render ? column.render(value, row) : value}
    </span>
  );
};

export { RowStandardCell };
