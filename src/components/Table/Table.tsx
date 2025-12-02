import type { ColumnConfig } from "./types/column";
import { useMeasure } from "./hooks/useMeasure";
import { useVirtualization } from "./hooks/useVirtualization";

import { useTableActions } from "./hooks/useTableActions";
import { ActionTypes } from "./constant/actionTypes";
import Row from "./components/Row";

interface TableProps {
  data: Array<{ id: string; [key: string]: any }>;
  columns: ColumnConfig[];
  rowHeight?: number;
  onEdit: (rowId: string, columnId: string, value: any) => void;
  onDelete: (rowId: string) => void;
}

export const Table = ({
  data,
  columns,
  rowHeight = 40,
  onEdit,
  onDelete,
}: TableProps) => {
  const [wrapperRef, { height: containerHeight }] =
    useMeasure<HTMLDivElement>();

  const { visibleData, offsetY, handleScroll, totalHeight } = useVirtualization(
    {
      data,
      containerHeight,
      rowHeight,
    }
  );

  const { onAction, selectedRows, editingCell } = useTableActions({
    data,
    onEdit,
    onDelete,
  });

  const renderHeader = (col: ColumnConfig) => {
    if (col.headerRender) return col.headerRender();
    if (col.type === "selector") {
      return (
        <input
          type="checkbox"
          className="w-4 h-4 accent-indigo-500 cursor-pointer"
          onChange={(e) =>
            onAction(ActionTypes.SELECT_ALL, { checked: e.target.checked })
          }
          checked={data.length > 0 && selectedRows.size === data.length}
        />
      );
    }
    return col.label;
  };

  return (
    <div className="border flex flex-col h-full">
      <div ref={wrapperRef} className="flex-1">
        <div
          className="overflow-auto relative"
          style={{ height: containerHeight }}
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight }} />
          <div className="absolute inset-0">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 sticky top-0 bg-neutral-800 z-20"
                      style={{ width: col.width }}
                    >
                      {renderHeader(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {offsetY > 0 && (
                  <tr aria-hidden="true">
                    <td colSpan={columns.length} style={{ height: offsetY }} />
                  </tr>
                )}
                {visibleData.map((row) => (
                  <Row
                    key={row.id}
                    row={row}
                    columns={columns}
                    isRowSelected={selectedRows.has(row.id)}
                    onAction={onAction}
                    rowHeight={rowHeight}
                    editingCell={editingCell}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
