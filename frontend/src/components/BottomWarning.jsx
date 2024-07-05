import {Link } from "react-router-dom";

export const BottomWarning = ({to,linkText,label}) => {
  return (
    <div classNameName="py-2 text-sm flex justify-center">
         <div>
            {label}
         </div>
         <Link classNameName="pointer underline pl-1 cursor-pointer" to={to}>{linkText}</Link>
    </div>
  )
}
