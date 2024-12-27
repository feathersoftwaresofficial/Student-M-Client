import React, {useState } from "react";
import Input from "../../CustomComponents/Input";
import Label from "../../CustomComponents/Lable";
import Button from "../../CustomComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { authState, loginUser } from "../../slices/authSlice";
import ALink from "../../CustomComponents/ALink";


const Login = ({ navigate, triggerPopUp }) => {


  const selector = useSelector(authState);
  const {loading } = selector;
  const dispatch = useDispatch();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    errors: {
      email: "",
      password: "",
      logIn: "",
      username: "",
      otherError: "",
    },
  });

  const validateForm = (loginFormData) => {
    const errors = {
      email: !loginFormData.email
        ? "Email or Username is required."
        : loginFormData.email.includes('@') && !/\S+@\S+\.\S+/.test(loginFormData.email)
          ? "Please enter a valid email."
          : "",

      password: !loginFormData.password
        ? "Password is required." : ""

    };

    return Object.values(errors).some((error) => error !== "") ? errors : null;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "", username: "",otherError:"" },
    }));
  };




  const onformSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(loginFormData);
    console.log(errors)
    if (errors) {
      setLoginFormData((prev) => ({ ...prev, errors }));
      return;
    }
    const result = await dispatch(
      loginUser({
        username: loginFormData.email,
        password: loginFormData.password,
      })
    );


    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
      triggerPopUp(true, "Login Success");
    } else {
      const { errors } = result.payload;
      console.error("Login failed:", errors);
      if (errors && errors.length > 0) {
        setLoginFormData((prev) => {
          const updatedErrors = { ...prev.errors };
          errors.forEach((err) => {
            updatedErrors[err.field] = err.message;
          });
          return { ...prev, errors: updatedErrors };
        });

      }
      else {
        setLoginFormData((pre) => pre.errors.otherError = errors)
      }

      triggerPopUp(false, "Login Failed");
    }
  };

  const inputFields = [
    {
      label: "Email & Username",
      type: "email",
      name: "email",
      placeholder: "Email & Username",
      error: loginFormData.errors.email || loginFormData.errors.username,
    },
    {
      label: "Password",
      type: loginFormData.showPassword ? "text" : "password",
      name: "password",
      placeholder: "Enter Your Password",
      error: loginFormData.errors.password,
      isPassword: true,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full p-2 sm:p-0 min-h-screen py-8 sm:px-8  bg-[#17ACC3] ">
      <form
        className={`login-form flex flex-col gap-4 w-full max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white  rounded-[8px] ${
          loginFormData.loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="font-bold text-2xl text-center">Login</div>

        {inputFields.map((field, index) => (
          <div key={index}>
            <Label
              htmlFor={field.name}
              text={field.label}
              error={field.error}
            />
            <Input
              type={field.type}
              id={field.name}
              placeholder={field.placeholder}
              value={loginFormData[field.name]}
              onChange={handleChange}
              name={field.name}
              disabled={loading.loginLoading}
              className={"bg-[#EEEEEE]"}
            />
          </div>
        ))}

        <ALink
          value={"  Forgot Password?"}
          path={"/passwordreset"}
          className={"text-right"}
        />

        <Button
          value={"login"}
          onClick={onformSubmit}
          loading={loading.loginLoading}
          className={" bg-[#17ACC3] text-white h-[45px] "}
        />
      </form>
    </div>
  );
};

export default Login;



