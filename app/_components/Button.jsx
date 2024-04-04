const Button  = ({ children, onClick, color, disabled, loading }) => {
  return (
    <button
      type='button'
      className={`${color || 'bg-slate-900 hover:bg-slate-800'} flex justify-center items-center gap-3 text-md font-medium py-2 px-4 rounded-lg focus:outline-none hover:scale-[1.02] focus:scale-[0.98] transition-all`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="animate-spin w-4 h-4 border-2 border-solid rounded-full border-white border-r-transparent" style={{ display: loading ? 'inline-block' : 'none' }}></div>
      {children}
    </button>
  )
}

export default Button