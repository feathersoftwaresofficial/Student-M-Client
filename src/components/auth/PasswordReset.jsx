import React, { useState } from "react";
import Button from "../../CustomComponents/Button";
import { passwordReset, verifyEmail } from "../../slices/authSlice";
import Input from "../../CustomComponents/Input";
import Label from "../../CustomComponents/Lable";
import ALink from "../../CustomComponents/ALink";
const PasswordReset = ({ navigate, triggerPopUp,selector,dispatch }) => {


  const {  loading } = selector;

  const [resetPasswordFormData, setResetPasswordFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    loading: false,
    emailValidated: false,
    errors: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
      otherError:"",
    },
    showPassword: false,
    showConfirmPassword: false,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "",otherError:"" },
    }));
  };

  const validateEmailInput = async (e) => {
    e.preventDefault();
    const { email } = resetPasswordFormData;
    let errors = { email: "" };

    if (!email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email";
    }

    if (errors.email) {
      setResetPasswordFormData((prev) => ({ ...prev, errors }));
      return;
    }



    const result = await dispatch(verifyEmail({ email }));

    if (result.meta.requestStatus === "fulfilled") {

      triggerPopUp(true, "Email verify  Successfully");
      setResetPasswordFormData((prev) => ({
        ...prev, 
        emailValidated: true
      }));
      
    } else {
      console.error("Login failed:", result.payload);
      const { errors } = result.payload;
      console.error("Login failed:", errors);
      if (errors && errors.length > 0) {
        setResetPasswordFormData((prev) => {
          const updatedErrors = { ...prev.errors };
          console.log(updatedErrors);
          errors.forEach((err) => {
            updatedErrors[err.field] = err.message;
          });
          return { ...prev, errors: updatedErrors };
        });

      }
      else {
        setResetPasswordFormData((pre) => pre.errors.otherError = errors)
      }
      triggerPopUp(false, "Email verify  Failed");
    }


  };

  const validateForm = () => {
    const { otp, password, confirmPassword } = resetPasswordFormData;
    let errors = { otp: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!otp) {
      errors.otp = "Required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "At least 6 characters";
      isValid = false;
    }

    if (!confirmPassword || password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setResetPasswordFormData((prev) => ({ ...prev, errors }));
    return isValid;
  };

  const onResetPassword = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;




    const result = await dispatch(
      passwordReset({
        email: resetPasswordFormData.email,
        otp: resetPasswordFormData.otp,
        password: resetPasswordFormData.password,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
      triggerPopUp(true, "Passwordreset  Success");
    } else {
      console.error("Login failed:", result.payload);
      const { errors } = result.payload;
      console.error("Login failed:", errors);
      if (errors && errors.length > 0) {
        setResetPasswordFormData((prev) => {
          const updatedErrors = { ...prev.errors };
          console.log(updatedErrors);
          errors.forEach((err) => {
            updatedErrors[err.field] = err.message;
          });
          return { ...prev, errors: updatedErrors };
        });

      }
      else {
        setResetPasswordFormData((pre) => pre.errors.otherError = errors)
      }
      triggerPopUp(false, "Passwordreset Failed");
    }





  };

  const inputFields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter Your Email",
      error: resetPasswordFormData.errors.email,
      disabled: resetPasswordFormData.emailValidated,
      onClick: validateEmailInput,
      buttonText: "Verify",
      isEmail: true,
    },
    {
      label: "OTP",
      type: "text",
      name: "otp",
      placeholder: "Enter OTP",
      error: resetPasswordFormData.errors.otp,
      condition: resetPasswordFormData.emailValidated
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter New Password",
      error: resetPasswordFormData.errors.password,
      condition: resetPasswordFormData.emailValidated,
      showToggle: true,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm New Password",
      error: resetPasswordFormData.errors.confirmPassword,
      condition: resetPasswordFormData.emailValidated,
      showToggle: true,
    },
  ];



  return (
    <div className="flex flex-col items-center justify-center w-full sm:px-8 sm:pb-8 min-h-screen p-3   bg-[#17ACC3]">
      <form className=" flex flex-col gap-4 w-full max-w-md p-6 mt-8 rounded-[8px] bg-white ">
        <div className="font-bold text-2xl text-center">Reset Password</div>

        {inputFields.map(
          (field, index) =>
            field.condition !== false && (
              <div key={index} className="flex flex-col gap-4 ">
                <div>
                  <Label
                    htmlFor={field.name}
                    text={field.name}
                    error={field.error}
                  />
                  <Input
                    type={field.type}
                    id={field.name}
                    placeholder={field.placeholder}
                    value={resetPasswordFormData[field.name]}
                    onChange={handleChange}
                    name={field.name}
                    disabled={
                      loading.resetpasswordLoading ||
                      (field.type === "email" &&
                        resetPasswordFormData.emailValidated)
                    }
                  />
                </div>

                {field.buttonText && !resetPasswordFormData.emailValidated && (
                  <Button
                    onClick={field.onClick}
                    loading={loading.resetpasswordLoading}
                    value={field.buttonText}
                    className={"bg-[#17ACC3] text-white h-[45px]  "}
                  />
                )}
              </div>
            )
        )}

        {resetPasswordFormData.emailValidated && (
          <Button
            className={"bg-[#17ACC3] text-white h-[45px]   "}
            onClick={onResetPassword}
            loading={loading.resetpasswordLoading}
            value={"Reset Password"}
          />
        )}
        <ALink
          value={"Existing User? Login"}
          path={"/login"}
          className={"text-right"}
        />
      </form>
    </div>
  );
};

export default PasswordReset;
