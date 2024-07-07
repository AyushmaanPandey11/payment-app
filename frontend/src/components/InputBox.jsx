
export const InputBox = ({label,placeholder,userEntry}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">
        {label}
        </div>
        <input ref={userEntry} placeholder={placeholder} className="w-full px-2 py-1 border-zinc-600" ></input>
    </div>
  )
}
