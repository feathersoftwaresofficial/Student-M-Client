
// import React from "react";
// import Input from "../../CustomComponents/Input";
// import Label from "../../CustomComponents/Lable";
// import Button from "../../CustomComponents/Button";
// import Select from "../../CustomComponents/Select";

// const EditUser = ({

//   formTitle,
//   formData,
//   onClose,
//   onSave,
//   handleChange,
//   saveButtonText = "Save",
//   roleOptions = ["admin", "staff"],
//   updateUserLoading
  
// }) => {

//   console.log(updateUserLoading)

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3 md:p-6">
//       <div className="bg-white p-6 rounded-sm shadow-md w-full  max-w-[400px] ">
//         <h2 className="text-lg font-bold mb-4">{formTitle}</h2>
//         <form>
//           <div className="mb-4">
//             <Label
//               htmlFor="username"
//               text="Username"
//               error={formData.errors.username}
//             />
//             <Input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Enter username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-4">
//             <Label htmlFor="email" text="Email" error={formData.errors.email} />
//             <Input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-4">
//             <Label htmlFor="role" text="Role" error={formData.errors.role} />
//             <Select
//               name="role"
//               value={formData.role}
//               options={roleOptions}
//               onChange={handleChange}
//               styleClass={"bg-[#EEEEEE] "}
//             />
//           </div>

//           <div className="mb-4">
//             <Label
//               htmlFor="password"
//               text="password"
//               error={formData.errors.password || "optional"}
//             />
//             <Input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter New Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex w-full justify-end gap-2">
//             <Button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-500 text-white rounded"
//               value="Cancel"
//               disable={updateUserLoading}
//             />
//             <Button
//               onClick={onSave}
//               className="px-4 py-2  text-white rounded"
//               value={saveButtonText}
//               loading={updateUserLoading}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUser;


import React from "react";
import Input from "../../CustomComponents/Input";
import Label from "../../CustomComponents/Lable";
import Button from "../../CustomComponents/Button";
import Select from "../../CustomComponents/Select";

const EditUser = ({
  formTitle,
  formData,
  onClose,
  onSave,
  handleChange,
  saveButtonText = "Save",
  roleOptions = ["admin", "staff"],
  updateUserLoading,
}) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3 md:p-6">
      <div className="bg-white p-6 rounded-[8px] shadow-md w-full max-w-[400px]">
        <h2 className="text-lg font-bold mb-4">{formTitle}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault(); 
            onSave(); 
          }}
        >
          <div className="mb-4">
            <Label
              htmlFor="username"
              text="Username"
              error={formData.errors.username}
            />
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email" text="Email" error={formData.errors.email} />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="role" text="Role" error={formData.errors.role} />
            <Select
              name="role"
              value={formData.role}
              options={roleOptions}
              onChange={handleChange}
              styleClass={"bg-[#EEEEEE]"}
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="password"
              text="Password"
              error={formData.errors.password || "optional"}
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter New Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full justify-end gap-2">
            <Button
              type="button" // Ensure this is not treated as a submit button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
              value="Cancel"
              disable={updateUserLoading}
            />
            <Button
              type="submit" // Set this as the submit button
              className="px-4 py-2 text-white rounded"
              value={saveButtonText}
              loading={updateUserLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
