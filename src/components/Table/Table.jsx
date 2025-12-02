import { useState, useRef } from 'react'
import './Table.css'

/**
 * BRANCH: 01-base-table
 * 
 * A modern data table with:
 * - Virtualization (only visible rows rendered)
 * - Action buttons per row
 * - Inline editing
 * - Row selection
 * 
 * ❌ ACCESSIBILITY PROBLEMS:
 * - No aria-rowcount (screen readers don't know total rows)
 * - No aria-rowindex (row position unknown)
 * - Focus lost when scrolling (focused elements unmount)
 * - No keyboard navigation (can't use arrow keys)
 * - Tab through every interactive element (tedious!)
 */

const ROW_HEIGHT = 52
const VISIBLE_ROWS = 8

export const Table = ({ data, columns, onEdit, onDelete }) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [editingCell, setEditingCell] = useState(null)
  const containerRef = useRef(null)

  const CONTAINER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS

  // Virtualization: calculate visible rows
  const startIndex = Math.floor(scrollTop / ROW_HEIGHT)
  const endIndex = Math.min(startIndex + VISIBLE_ROWS + 2, data.length)
  const visibleData = data.slice(startIndex, endIndex)
  const offsetY = startIndex * ROW_HEIGHT

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleCellEdit = (rowId, field, value) => {
    onEdit?.(rowId, field, value)
    setEditingCell(null)
  }

  const startEditing = (rowId, field) => {
    setEditingCell(`${rowId}-${field}`)
  }

  return (
    <div className="table-wrapper">
      <div className="table-info">
        Showing {visibleData.length} of {data.length} rows (virtualized)
      </div>

      <div
        ref={containerRef}
        className="table-container"
        style={{ height: CONTAINER_HEIGHT }}
        onScroll={handleScroll}
      >
        {/* ❌ Problem: No aria-rowcount, no role="grid" */}
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(new Set(data.map((d) => d.id)))
                    } else {
                      setSelectedRows(new Set())
                    }
                  }}
                  checked={selectedRows.size === data.length}
                />
              </th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ transform: `translateY(${offsetY}px)` }}>
            {/* ❌ Problem: No aria-rowindex on rows */}
            {visibleData.map((row) => (
              <tr
                key={row.id}
                className={selectedRows.has(row.id) ? 'selected' : ''}
                style={{ height: ROW_HEIGHT }}
              >
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.editable && editingCell === `${row.id}-${col.key}` ? (
                      <input
                        className="inline-input"
                        defaultValue={row[col.key]}
                        autoFocus
                        onBlur={(e) => handleCellEdit(row.id, col.key, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCellEdit(row.id, col.key, e.target.value)
                          }
                          if (e.key === 'Escape') {
                            setEditingCell(null)
                          }
                        }}
                      />
                    ) : (
                      <span
                        className={col.editable ? 'editable-cell' : ''}
                        onClick={() => col.editable && startEditing(row.id, col.key)}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="actions-cell">
                  {/* ❌ Problem: When these buttons are focused and row scrolls out, focus is lost */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => alert(`View ${row.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete?.(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Spacer for scroll height */}
        <div style={{ height: data.length * ROW_HEIGHT }} className="scroll-spacer" />
      </div>
    </div>
  )
}

