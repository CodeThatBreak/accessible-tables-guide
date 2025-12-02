import type { CellType } from "../constant/cellTypes";

type ColumnConfig = {
  key: string;
  label: string;
  type: CellType;
  width: number;
  editable?: boolean;
  sortable?: boolean;
  sortDirection?: "asc" | "desc";
  // Custom cell renderer
  render?: (value: any, row: any) => React.ReactNode | string;
  // Custom header renderer
  headerRender?: () => React.ReactNode;
};

export type { ColumnConfig };
