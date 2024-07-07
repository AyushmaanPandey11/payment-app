import { useRef } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
export const Signup = () => {
  const firstName = useRef("");
  const lastName = useRef("");
  const username = useRef("");
  const password = useRef("");

  const handleSignUp = async () => {
    const userData = {
      firstName : firstName.current.value,
      lastName : lastName.current.value,
      username: username.current.value,
      password: password.current.value
    };
    const response = await axios.post("http://localhost:3000/api/v1/user/signup",userData);
    localStorage.setItem("token",response.data.token);
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter Your Information to create an account"} />
          <InputBox userEntry={firstName} placeholder={"Bruce"} label={"First Name"} />
          <InputBox userEntry={lastName} placeholder={"Wayne"} label={"Last Name"} />
          <InputBox userEntry={username} placeholder={"brucewayne@gmail.com"} label={"Email"} />
          <InputBox userEntry={password} placeholder={"123456"} label={"Password"} />
          <div className="pt-4">
            <Button onClick={handleSignUp} label={"Sign Up"} />
          </div>
          <BottomWarning label={"Already have an account?"} linkText={"Sign In"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};

