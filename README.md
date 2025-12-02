# Table Accessibility Demos

Interactive demos showcasing common accessibility problems in modern data tables — and their solutions.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 What's Included

### 1. Virtualization & Focus Management
- **Problem**: When virtualized rows scroll out of view and unmount, focus is lost
- **Solution**: Focus management with refs, `aria-rowcount`, `aria-rowindex`, and live regions

### 2. Custom Keyboard Navigation
- **Problem**: Native tables don't support arrow keys; Tab traverses every interactive element
- **Solution**: Roving tabindex pattern with `role="grid"` and arrow key navigation

### 3. Pinned Columns
- **Problem**: Separate DOM sections for pinned columns break reading order
- **Solution**: CSS `position: sticky` with single table structure

## 🎯 How to Test

Each demo page shows:
- ❌ **Problem** — The inaccessible implementation
- ✅ **Solution** — The accessible implementation

Test with:
- **Keyboard only** — Navigate without a mouse
- **Screen reader** — VoiceOver (Mac), NVDA/JAWS (Windows)
- **DevTools** — Chrome Accessibility Inspector

## 📝 Code Snippets for Blog

Each demo file contains:
- Detailed comments explaining the problem/solution
- Minimal code focused on the specific issue
- Copy-paste ready snippets for your blog

### File Structure

```
src/
├── demos/
│   ├── virtualization/
│   │   ├── VirtualizationProblem.jsx   # ❌ Problem demo
│   │   ├── VirtualizationSolution.jsx  # ✅ Solution demo
│   │   └── index.jsx                   # Demo page
│   ├── keyboard/
│   │   ├── KeyboardProblem.jsx
│   │   ├── KeyboardSolution.jsx
│   │   └── index.jsx
│   └── pinned/
│       ├── PinnedProblem.jsx
│       ├── PinnedSolution.jsx
│       └── index.jsx
├── data/
│   └── mockData.js                     # Shared mock data
├── App.jsx
├── main.jsx
└── styles.css
```

## 🔑 Key ARIA Attributes for Tables

| Attribute | Purpose |
|-----------|---------|
| `role="grid"` | Indicates interactive grid (not just data table) |
| `aria-rowcount` | Total rows in dataset (for virtualized tables) |
| `aria-rowindex` | Row's position in full dataset |
| `aria-colcount` | Total columns |
| `aria-colindex` | Column position |
| `aria-label` | Table description |

## 📚 Resources

- [WAI-ARIA Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [MDN: ARIA Grid Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role)
- [Deque: Data Tables](https://www.deque.com/blog/creating-accessible-tables/)

## License

MIT

