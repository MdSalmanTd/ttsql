export function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl bg-white/10 backdrop-blur p-4 shadow-lg ${className}`}>
      {children}
    </div>
  );
}