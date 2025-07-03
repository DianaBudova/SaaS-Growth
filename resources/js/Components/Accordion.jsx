export default function Accordion({ children }) {
  return (
        <div className="flex flex-col divide-y rounded border overflow-hidden">
            {children}
        </div>
  );
}
