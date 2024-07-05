
export const Balance = ({balance}) => {
  return (
    <div classNameName="m-4 p-4">
        <div classNameName="font-bold text-black text-xl  ">
            <div classNameName="m-2 p-2">
                Your Balance
            </div>
            <div classNameName="ml-3 pl-1">
              Rs. {balance}
            </div>
        </div>
    </div>
  )
}
