const Input = ({ name, label, placeholder, value, onChange, required, readOnly }) => {
  return (
    <div className='w-full flex flex-col justify-start items-start gap-1'>
      <label htmlFor={name} className="block ml-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input type="text" id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} value={value} onChange={onChange} required={required} readOnly={readOnly} disabled={readOnly} />
    </div>
  )
}

export default Input