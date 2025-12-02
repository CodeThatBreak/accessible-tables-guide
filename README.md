# Table Accessibility Demos

Interactive demos showcasing common accessibility problems in modern data tables — and their solutions.

Built with **React** and **Tailwind CSS v4**.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Branches

Each branch builds on the previous one:

| Branch | What's Added |
|--------|--------------|
| `01-base-table` | Modern virtualized table with **zero accessibility** |
| `02-virtualization-a11y` | `aria-rowcount`, `aria-rowindex`, focus management |
| `03-keyboard-navigation` | Arrow keys, roving tabindex, Enter/Escape |
| `04-pinned-columns` | CSS sticky columns without DOM splitting |

## 🎯 How to Test

Test with:
- **Keyboard only** — Navigate without a mouse
- **Screen reader** — VoiceOver (Mac), NVDA/JAWS (Windows)
- **DevTools** — Chrome Accessibility Inspector

## 🔑 Key ARIA Attributes

| Attribute | Purpose |
|-----------|---------|
| `role="grid"` | Interactive grid (not just data table) |
| `aria-rowcount` | Total rows in dataset |
| `aria-rowindex` | Row's position in full dataset |
| `aria-colcount` | Total columns |
| `aria-colindex` | Column position |
| `aria-label` | Table description |

## 📚 Resources

- [WAI-ARIA Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [MDN: ARIA Grid Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role)

## License

MIT
