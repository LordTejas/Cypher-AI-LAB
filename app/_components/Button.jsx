const Button  = ({ children, onClick, color, disabled }) => {
  return (
    <button
      type='button'
      className={`${color || 'bg-slate-900 hover:bg-slate-800'} text-md font-medium py-2 px-4 rounded-lg focus:outline-none hover:scale-[1.02] focus:scale-[0.98] transition-all`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button