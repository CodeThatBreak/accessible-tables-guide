const Cell = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) => {
  return (
    <td className="p-3 text-neutral-300 text-sm truncate" style={{ width }}>
      {children}
    </td>
  );
};

export default Cell;
