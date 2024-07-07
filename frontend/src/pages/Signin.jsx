import { useRef } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../utils/constants";
export const Signin = () => {
  const username = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const userData = {
      username : username.current.value,
      password : password.current.value
    };
    const response = await axios.post(`${BACKEND_URL}/user/signin`,userData);
    localStorage.setItem("token",response.data.token);
    if(response.status == 200)
      {
        navigate("/dashboard");
      }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox userEntry={username} placeholder={"brucewayne@gmail.com"} label={"Email"} />
                <InputBox userEntry={password}  placeholder={"123456"} label={"Password"} />
                <div className="pt-4">
                    <Button onClick={handleSubmit} label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} linkText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    </div>
  )
}