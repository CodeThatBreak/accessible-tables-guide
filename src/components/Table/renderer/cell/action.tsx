import { ColumnConfig } from "../../types/column";
import { ActionTypes } from "../../constant/actionTypes";

const RowActionsCell = ({
  rowId,
  column,
  onAction,
}: {
  rowId: string;
  column: ColumnConfig;
  onAction: (type: string, payload?: any) => void;
}) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => onAction(ActionTypes.DELETE_ROW, { rowId })}>
        Delete
      </button>
      <button
        onClick={() => onAction(ActionTypes.EDIT_CELL, { rowId, column })}
      >
        Edit
      </button>
    </div>
  );
};

export { RowActionsCell };
