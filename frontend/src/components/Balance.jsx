
export const Balance = ({balance}) => {
  return (
    <div className="m-4 p-4">
        <div className="font-bold text-black text-xl  ">
            <div className="m-2 p-2">
                Your Balance
            </div>
            <div className="ml-3 pl-1">
              Rs. {balance}
            </div>
        </div>
    </div>
  )
}
