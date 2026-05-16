export function Button({ children, ...props }) {
  return (
    <button className="px-4 py-2 bg-white/10 rounded text-white" {...props}>
      {children}
    </button>
  )
}
