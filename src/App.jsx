import { useState } from 'react'
import { Table } from './components/Table'
import { generateUsers } from './data/mockData'

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

const INITIAL_DATA = generateUsers(500)

const columns = [
  { 
    key: 'id', 
    label: 'ID',
    width: 80,
  },
  { 
    key: 'name', 
    label: 'Name',
    editable: true,
    render: (_, row) => `${row.firstName} ${row.lastName}`,
  },
  { 
    key: 'email', 
    label: 'Email',
    editable: true,
  },
  { 
    key: 'department', 
    label: 'Department',
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => (
      <span className={`status-badge ${value.toLowerCase()}`}>
        {value}
      </span>
    ),
  },
]

export const App = () => {
  const [data, setData] = useState(INITIAL_DATA)

  const handleEdit = (rowId, field, value) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    )
  }

  const handleDelete = (rowId) => {
    setData((prev) => prev.filter((row) => row.id !== rowId))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Accessible Tables Guide</h1>
        <p className="subtitle">
          Branch: <code>01-base-table</code> — Modern table with accessibility problems
        </p>
      </header>

      <section className="problems-section">
        <h2>❌ Current Accessibility Problems</h2>
        <ul className="problems-list">
          <li>
            <strong>No aria-rowcount:</strong> Screen readers don't know there are {data.length} rows
          </li>
          <li>
            <strong>No aria-rowindex:</strong> Row positions are unknown to assistive tech
          </li>
          <li>
            <strong>Focus lost on scroll:</strong> When focused buttons scroll out, focus disappears
          </li>
          <li>
            <strong>No keyboard navigation:</strong> Can't use arrow keys to move between cells
          </li>
          <li>
            <strong>Tab overload:</strong> Must tab through every checkbox and button
          </li>
        </ul>
      </section>

      <section className="demo-section">
        <h2>Demo Table</h2>
        <p className="demo-instruction">
          Try: Focus an "Edit" button, then scroll down. The focus will be lost!
        </p>
        
        <Table
          data={data}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      <section className="next-section">
        <h2>🔜 Next Branch: 02-virtualization-a11y</h2>
        <p>
          We'll fix virtualization issues by adding:
        </p>
        <ul>
          <li><code>aria-rowcount</code> to declare total rows</li>
          <li><code>aria-rowindex</code> on each visible row</li>
          <li>Focus management to restore focus after scroll</li>
          <li>Live region to announce position changes</li>
        </ul>
      </section>
    </div>
  )
}
