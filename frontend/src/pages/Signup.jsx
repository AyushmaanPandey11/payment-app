import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
  return (
    <div classNameName="bg-slate-300 h-screen flex justify-center">
        <div classNameName="flex flex-col justify-center">
            <div classNameName="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter Your Information to create an account"}/>
                <InputBox  placeholder={"Bruce "} label={"First Name"} />
                <InputBox  placeholder={"Wayne"} label={"Last Name"} />
                <InputBox  placeholder={"brucewayne@gmail.com"} label={"Email"} />
                <InputBox  placeholder={"123456"} label={"Password"} />
                <div classNameName="pt-4">
                    <Button  label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account?"} linkText={"Sign In"} to={"/signin"}/>
            </div>
        </div>
    </div>
  )
}
