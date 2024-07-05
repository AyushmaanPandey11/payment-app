
export const InputBox = ({label,placeholder}) => {
  return (
    <div>
        <div classNameName="text-sm font-medium text-left py-2">
        {label}
        </div>
        <input placeholder={placeholder} classNameName="w-full px-2 py-1 border-zinc-600" ></input>
    </div>
  )
}
