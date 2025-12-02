import { ActionTypes } from "../../constant/actionTypes";

type RowSelectorCellProps = {
  rowId: string;
  checked: boolean;
  onAction: (type: string, payload?: any) => void;
};

const RowSelectorCell = ({
  rowId,
  checked,
  onAction,
}: RowSelectorCellProps) => {
  return (
    <input
      type="checkbox"
      className="w-4 h-4 accent-indigo-500 cursor-pointer"
      checked={checked}
      onChange={() => onAction(ActionTypes.SELECT_ROW, { rowId })}
    />
  );
};

export { RowSelectorCell };
