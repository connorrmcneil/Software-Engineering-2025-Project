export function Button({children, ...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-4 p-2 bg-green-600 hover:bg-green-500 cursor-pointer transition-all text-white rounded-lg border-green-900 border-2"
      {...rest}
    >
      {children}
    </button>
  )
}
