import { useState } from "react";
import { Table } from "./components/Table";
import { generateUsers } from "./data/mockData";

/**
 * BRANCH: 01-base-table
 *
 * Demo app showcasing the Table component.
 * Switch branches to see accessibility improvements:
 *
 * - 01-base-table: Modern table with a11y problems
 * - 02-virtualization-a11y: aria-rowcount, focus management
 * - 03-keyboard-navigation: Arrow keys, roving tabindex
 * - 04-pinned-columns: CSS sticky columns
 */

const INITIAL_DATA = generateUsers(500);

const columns = [
  {
    key: "selector",
    label: "",
    type: "selector",
    width: 40,
  },
  {
    key: "id",
    label: "ID",
    width: 80,
  },
  {
    key: "name",
    label: "Name",
    editable: true,
    render: (_, row) => `${row.firstName} ${row.lastName}`,
    width: 150,
  },
  {
    key: "email",
    label: "Email",
    editable: true,
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`
        inline-block px-2.5 py-1 rounded-full text-xs font-medium
        ${value === "Active" ? "bg-green-500/20 text-green-400" : ""}
        ${value === "Inactive" ? "bg-red-500/20 text-red-400" : ""}
        ${value === "Pending" ? "bg-yellow-500/20 text-yellow-400" : ""}
      `}
      >
        {value}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    type: "actions",
    render: (_, row) => (
      <div className="flex gap-2">
        <button
          className="px-3 py-1.5 text-xs font-medium bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          onClick={() => alert(`View ${row.id}`)}
        >
          View
        </button>
        <button
          className="px-3 py-1.5 text-xs font-medium bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          onClick={() => onDelete?.(row.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

export const App = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const handleEdit = (rowId, field, value) => {
    setData((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const handleDelete = (rowId) => {
    setData((prev) => prev.filter((row) => row.id !== rowId));
  };

  return (
    <div style={{ height: 500 }}>
      <Table
        data={data}
        columns={columns}
        rowHeight={40}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
