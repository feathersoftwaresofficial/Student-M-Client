import React, { useState } from "react";
import Input from "../../CustomComponents/Input";
import Label from "../../CustomComponents/Lable";
import Button from "../../CustomComponents/Button";
import Select from "../../CustomComponents/Select";
import { addUsers } from "../../slices/usersSlice";
import icons from "../../data/icons";

const Signup = ({
  navigate,
  triggerPopUp,
  selector,
  dispatch,
  usersSelector,
  onClose,
  popUp,
}) => {
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    loading: false,
    role: "staff",
    errors: {
      username: "",
      email: "",
      password: "",
      otherError: "",
      role: "",
    },
  });

  const validateSignupForm = (signupFormData) => {
    const errors = {
      username:
        signupFormData.username.length < 6
          ? "Username must be at least 6 characters long.."
          : "",
      email: !/\S+@\S+\.\S+/.test(signupFormData.email) ? "Invalid email." : "",
      password:
        signupFormData.password.length < 6
          ? "Password must be at least 6 characters long."
          : "",
      signUp: "",
    };

    return Object.values(errors).some((error) => error !== "") ? errors : null;
  };

  const inputFields = [
    {
      label: "Name",
      type: "text",
      name: "username",
      placeholder: "Enter Your Name",
      error: signupFormData.errors.username,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter Your Email",
      error: signupFormData.errors.email,
    },
    {
      label: "Password",
      type: signupFormData.showPassword ? "text" : "password",
      name: "password",
      placeholder: "Enter Your Password",
      error: signupFormData.errors.password,
      isPassword: true,
    },
    {
      label: "role",
      type: "select",
      name: "role",
      error: signupFormData.errors.role,
    },
  ];

  const { loading } = usersSelector;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "", otherError: "" },
    }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignupForm(signupFormData);
    if (errors) {
      setSignupFormData((prev) => ({ ...prev, errors }));
      return;
    }

    const result = await dispatch(
      addUsers({
        username: signupFormData.username,
        email: signupFormData.email,
        password: signupFormData.password,
        role: signupFormData.role,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/all_users");
      triggerPopUp(true, "User Added Successfully");
      popUp(false);
    } else {
      const { errors } = result.payload;
      if (errors && errors.length > 0) {
        setSignupFormData((prev) => {
          const updatedErrors = { ...prev.errors };
          errors.forEach((err) => {
            updatedErrors[err.field] = err.message;
          });
          return { ...prev, errors: updatedErrors };
        });
      } else {
        setSignupFormData((prev) => ({
          ...prev,
          errors: { otherError: "Signup failed" },
        }));
      }
      triggerPopUp(false, "Signup Failed");
    }
  };

  return (
    <div className="fixed w-full rounded-[8px] h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3 md:p-6 ">
      <div className="bg-white  rounded-[8px] overflow-hidden  w-full md:w-1/3 max-w-md mx-auto relative">
        <div
          className="btn absolute  rounded-[8px]  top-1 right-1  cursor-pointer text-white p-[1px]   bg-red-600 text-[16px]"
          onClick={onClose}
        >
          {icons.closeIcon}
        </div>

        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-2 rounded-[8px] bg-green-30 p-6 "
        >
          <div className="font-bold text-xl  capitalize">add user</div>

          {signupFormData.errors.signUp && (
            <div className="text-red-500 text-center mb-3">
              {signupFormData.errors.signUp}
            </div>
          )}

          {inputFields.map((field, index) =>
            field.type !== "select" ? (
              <div key={index}>
                <Label
                  htmlFor={field.name}
                  text={field.name}
                  error={field.error}
                />
                <Input
                  type={field.type}
                  id={field.name}
                  placeholder={field.placeholder}
                  value={signupFormData[field.name]}
                  onChange={handleChange}
                  name={field.name}
                  disabled={loading.addUsersLoading}
                />
              </div>
            ) : (
              <div className="" key={index}>
                <Label
                  htmlFor={field.name}
                  text={field.name}
                  error={field.error}
                />
                <Select
                  name={field.name}
                  value={signupFormData[field.name]}
                  options={["admin", "staff"]}
                  onChange={handleChange}
                  styleClass={"bg-[#EEEEEE] "}
                />
              </div>
            )
          )}

          <Button
            value={"add"}
            onClick={onFormSubmit}
            disabledBtn={signupFormData.loading}
            loading={loading.addUsersLoading}
            className={"text-white w-[50%] mx-auto mt-2 h-[45px] bg-[#17ACC3] "}
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
