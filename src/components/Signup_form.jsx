import { validate } from "email-validator";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import useAuthContext from "../hooks/useAuthContext";
const Signup_form = () => {
  const input_styles = [
    "bg-slate-50 border-2 px-3 py-3 rounded-md focus:outline-theme-color2 focus:border-0",
  ];
  const navigate = useNavigate();
  const [hidden, sethidden] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { googleSignin } = useAuthContext();
  // handle form input
  const handleChange = (e) => {
    setFormData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  // handle error
  const handleError = (message) => {
    setError(true);
    setMessage(message);
    setTimeout(() => setError(false), 5000);
  };

  // handles inputs validation
  const inputValidate = (formData) => {
    if (
      formData.firstname.length == 0 ||
      formData.lastname.length == 0 ||
      formData.email.length == 0 ||
      formData.password.length == 0 ||
      formData.confirmPassword.length == 0
    ) {
      handleError("fill missing field");
    } else if (
      formData.firstname.length <= 2 ||
      formData.lastname.length <= 2
    ) {
      handleError("Enter a valid name");
    } else if (!validate(formData.email)) {
      handleError("Please enter a valid email");
    } else if (formData.password != formData.confirmPassword) {
      handleError("Make your password matches");
    } else if (formData.password.length < 8) {
      handleError("Password must be 8 characters or more");
    } else {
      return true;
    }
  };
  // creating user
  const createUser = async (data) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredentials && auth.currentUser) {
        try {
          updateProfile(auth.currentUser, {
            displayName: `${formData.firstname + " " + formData.lastname}`,
          });
          sendEmailVerification(auth.currentUser);
          console.log("success");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    inputValidate(formData);
    createUser(formData);
  };

  return (
    <div className="bg-white space-y-5  shadow-md p-7 rounded-xl">
      <h2 className="font-semibold text-xl text-theme-color1">
        Create account
      </h2>
      <div className="flex flex-col gap-2 ">
        {error && (
          <span className="bg-red-100 flex  items-center gap-2 p-2 px rounded-md text-red-600">
            <div className="">
              <BiErrorCircle />
            </div>
            <div className="text-red-500 text-sm">{message}</div>
          </span>
        )}
        <div className="flex flex-col gap-3 ">
          <input
            onChange={handleChange}
            type="text"
            name="firstname"
            placeholder="Enter firstname"
            className={`${input_styles}`}
          />
          <input
            onChange={handleChange}
            type="text"
            name="lastname"
            placeholder="Enter lastname"
            className={`${input_styles}`}
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
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
          <input
            onChange={handleChange}
            type={hidden ? "password" : "text"}
            name="confirmPassword"
            placeholder="Confirm password"
            className={`${input_styles} `}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <button
            onClick={handleSubmit}
            className="bg-theme-color1 text-white rounded-lg py-2"
          >
            Sign up
          </button>
          <span className="w-full text-center">or</span>
          <button
            className="bg-theme-color1 text-white rounded-md py-2 flex items-center justify-center gap-3"
            onClick={googleSignin}
          >
            <span className="text-2xl">
              <FcGoogle />
            </span>
            Sign up with google
          </button>
        </div>
        <p className="text-center leading-relaxed">
          Already have an account?
          <Link to="/login" className="text-center text-theme-color2 px-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup_form;
