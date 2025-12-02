import { useState } from "react";
import { ActionTypes } from "../constant/actionTypes";

interface UseTableActionsProps {
  data: Array<{ id: string; [key: string]: any }>;
  onEdit: (rowId: string, field: string, value: any) => void;
  onDelete: (rowId: string) => void;
}

export function useTableActions({
  data,
  onEdit,
  onDelete,
}: UseTableActionsProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const onAction = (type: string, payload?: any) => {
    switch (type) {
      case ActionTypes.SELECT_ROW: {
        const { rowId } = payload;
        setSelectedRows((prev) => {
          const next = new Set(prev);
          next.has(rowId) ? next.delete(rowId) : next.add(rowId);
          return next;
        });
        break;
      }

      case ActionTypes.SELECT_ALL: {
        const { checked } = payload;
        setSelectedRows(checked ? new Set(data.map((d) => d.id)) : new Set());
        break;
      }

      case ActionTypes.START_EDITING: {
        const { row, column } = payload;
        setEditingCell(`${row.id}-${column.key}`);
        break;
      }

      case ActionTypes.STOP_EDITING: {
        const { row, column, value } = payload;
        onEdit?.(row.id, column.e, value);
        setEditingCell(null);
        break;
      }

      case ActionTypes.DELETE_ROW: {
        const { rowId } = payload;
        onDelete?.(rowId);
        break;
      }

      default:
        console.warn(`Unknown action type: ${type}`);
    }
  };

  return {
    selectedRows,
    editingCell,
    setEditingCell,
    onAction,
  };
}
