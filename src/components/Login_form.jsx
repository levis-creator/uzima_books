import { validate } from "email-validator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { auth } from "../lib/firebase";
import Error from "./ErrorAlert.jsx";

const Login_form = () => {
  const input_styles = [
    "bg-slate-50 border-2 px-3 py-3 rounded-md focus:outline-theme-color2 focus:border-0",
  ];
  const [hidden, sethidden] = useState(true);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { googleSignin } = useAuthContext();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setInput((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  // error display
  const handleError = (message) => {
    setError(true);
    setMessage(message);
    setTimeout(() => setError(false), 5000);
  };
  // validation function
  const validator = (input) => {
    if (input.email.length == 0 || input.password.length == 0) {
      handleError("Email or password missing");
    } else if (!validate(input.email)) {
      handleError("Enter valid email");
    }
  };
  // submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    validator(input);
    emailSignin(input);
  };
  // signing into account with email
  const emailSignin = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => navigate("/"))
      .catch((error) => {
        if (error.code == "auth/wrong-password") {
          handleError("Please enter a valid password");
        } else if (error.code == "auth/user-not-found") {
          handleError("User not found");
        }
      });
  };

  return (
    <div>
      <div className="bg-white space-y-5  shadow-md p-7 rounded-xl">
        <h2 className="font-semibold text-xl text-theme-color1">Sign in</h2>
        <div className="flex flex-col gap-3 ">
          <Error error={error} message={message} />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
            className={`${input_styles}`}
          />
          <div className="w-full relative">
            <input
              onChange={handleChange}
              type={hidden ? "password" : "text"}
              name="password"
              placeholder="Enter password"
              className={`${input_styles} w-full`}
            />
            <button
              className="absolute right-3 bottom-4 text-slate-400 text-lg"
              onClick={() => sethidden(!hidden)}
            >
              {hidden ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </button>
          </div>
          <div className="w-full flex flex-col gap-1">
            <button
              onClick={handleSubmit}
              className="bg-theme-color1 text-white rounded-lg py-2"
            >
              Sign in
            </button>
            <span className="w-full text-center">or</span>
            <button
              onClick={googleSignin}
              className="bg-theme-color1 text-white rounded-md py-2 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">
                <FcGoogle />
              </span>
              Sign up with google
            </button>
          </div>
          <div className=" text-center space-x-2 inline-flex justify-center gap-1">
            Dont have an account?
            <Link to="/signup" className=" text-theme-color2">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_form;
