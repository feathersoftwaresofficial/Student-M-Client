import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser, addDeleteIds } from "../../slices/usersSlice";
import Table from "../../CustomComponents/Table";
import Button from "../../CustomComponents/Button";
import EditUser from "./EditUser";
import Signup from "../auth/Signup";
import EditProgram from "./EditProgram";
import Input from "../../CustomComponents/Input";
import Select from "../../CustomComponents/Select";
import Pagination from "../../CustomComponents/Pagination";
import ConfirmationPopup from "../../CustomComponents/ConfirmationPopup";
import { changeAdminRoute } from "../../slices/usersSlice";
import { refreshDashScroll } from "../../slices/otherSlice";
import { filterUsers } from "../../utils/filter";



const AllUsers = ({
  dispatch,
  usersSelector,
  triggerPopUp,
  navigate,
  programSelector,
  authSelector,
}) => {
  const { allUsers, loading, deleteIds, adminPageRoute } = usersSelector;
  const { user } = authSelector;


  const [editId, setEditId] = useState(null);
  const [addPopup, setAddPopup] = useState("");
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    errors: {
      username: "",
      email: "",
      role: "",
      password: "",
    },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  const validateFields = (data) => {
    const errors = {
      username: data.username ? "" : "Username is required.",
      email: data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ? ""
        : "Invalid email address.",
      role: data.role ? "" : "Role is required.",
      password: data.password ? "" : "",
    };
    return errors;
  };



  const handleDelete = async (id) => {
    setDeleteConfirmPopup(true);
    setCurrentDeleteId(id);
  };


  const deleteConform = async () => {
    setDeleteConfirmPopup(false);
    dispatch(addDeleteIds(currentDeleteId));
    const result = await dispatch(deleteUser(currentDeleteId));
    if (result.meta.requestStatus === "fulfilled") {
      triggerPopUp(true, "User deleted successfully.");
    } else {
      triggerPopUp(false, "Failed to delete user.");
    }
  };


  const handleSave = async (e) => {
    const errors = validateFields(formData);
    if (Object.values(errors).some((err) => err !== "")) {
      setFormData((prev) => ({ ...prev, errors }));
      return;
    }


    const result = await dispatch(updateUser({ id: editId, ...formData }));
    if (result.meta.requestStatus === "fulfilled") {
      triggerPopUp(true, "User updated successfully.");
      setAddPopup("");
      setEditId(null);
      setFormData({
        username: "",
        email: "",
        role: "",
        password: "",
        errors: { username: "", email: "", role: "", password: "" },
      });
    } else {
      triggerPopUp(false, "Failed to update user.");
      const { errors } = result.payload;
      if (errors && errors.length > 0) {
        setFormData((prev) => {
          const updatedErrors = { ...prev.errors };
          errors.forEach((err) => {
            updatedErrors[err.field] = err.message;
          });
          return { ...prev, errors: updatedErrors };
        });
      }
    }
  };

  const handleEdit = (id) => {
    const user = allUsers.find((user) => user.id === id);
    if (!user) {
      triggerPopUp(false, "User not found.");
      return;
    }
    setEditId(id);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      role: user.role || "",
      password: "",
      errors: { username: "", email: "", role: "", password: "" },
    });
    setAddPopup("edit");
  };





  const filteredUsers = filterUsers(allUsers, searchTerm, roleFilter, user.id);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  console.log(indexOfFirstItem)
  const currentUsers = filteredUsers.slice(
    indexOfFirstItem,
    indexOfFirstItem + itemsPerPage
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const renderView = () => {
    switch (adminPageRoute) {
      case "allUsers":
        return (
          <div className="flex flex-col gap-3">
            <ConfirmationPopup
              visible={deleteConfirmPopup}
              message={`Are you sure you want to delete this user?`}
              onConfirm={deleteConform}
              onCancel={() => setDeleteConfirmPopup(false)}
            />

            <div className=" flex justify-between w-full gap-3 flex-col md:flex-row">
              <div className="flex gap-3 w-full md:w-fit">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="md:w-[300px] bg-[#EEEEEE]  "
                />
                <Select
                  label={"Role"}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  selectorClass="w-[150px]   "
                  styleClass={"bg-[#EEEEEE] "}
                  options={["Admin", "Staff"]}
                />
              </div>
              <Button
                className="bg-[#EEEEEE] text-[#6D6D6D] py-2 px-4 rounded-md transition duration-300"
                value={"Add User"}
                onClick={() => setAddPopup("signup")}
              />
            </div>
            <Table
              loading={loading.getUserLoading}
              columns={[
                { key: "index", label: "No" },
                { key: "username", label: "Username" },
                { key: "email", label: "Email" },
                { key: "role", label: "Role" },
              ]}
              data={currentUsers.map((item, index) => ({
                ...item,
                index: indexOfFirstItem + index + 1,
              }))}
              handleDelete={handleDelete}
              deleteStudentLoading={deleteIds}
              setEditId={handleEdit}
              viewBtn={false}
              actionPopupStyle={"top-10  right-20 sm:right-28"}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              goToPreviousPage={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
              goToNextPage={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              dataLength={currentUsers}
            />
          </div>
        );
      case "editProgram":
        return (
          <EditProgram
            selector={programSelector}
            dispatch={dispatch}
            triggerPopUp={triggerPopUp}

          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(refreshDashScroll())

  }, [])

  return (
    <div className="p-3 md:p-6 w-full min-h-screen flex flex-col gap-3">
      <div className="btnGroup w-full gap-3 flex justify-between">
        <div className="flex gap-3">
          <Button
            className={` ${
              adminPageRoute === "allUsers"
                ? "  bg-[#ACEFF5] text-[#6D6D6D]"
                : "bg-[#EEEEEE] text-[#6D6D6D]"
            } py-2 px-4 rounded-[8px] transition duration-300`}
            value={"All Users"}
            onClick={() => dispatch(changeAdminRoute("allUsers"))}
          />
          <Button
            className={` ${
              adminPageRoute === "editProgram"
                ? " bg-[#ACEFF5] text-[#6D6D6D]"
                : "bg-[#EEEEEE] text-[#6D6D6D]"
            } py-2 px-4 rounded-[8px] transition duration-300`}
            value={"Add Program"}
            onClick={() => dispatch(changeAdminRoute("editProgram"))}
          />
        </div>
      </div>

      {renderView()}

      {addPopup === "signup" && (
        <Signup
          popUp={setAddPopup}
          navigate={navigate}
          triggerPopUp={triggerPopUp}
          dispatch={dispatch}
          usersSelector={usersSelector}
          onClose={() => setAddPopup(null)}
        />
      )}

      {addPopup === "edit" && (
        <EditUser
          formTitle="Edit User"
          formData={formData}
          onClose={() => {
            setAddPopup(null);
            setEditId(null);
            setFormData({ username: "", email: "", role: "", password: "" });
          }}
          onSave={() => handleSave()}
          handleChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
              errors: { ...formData.errors, [e.target.name]: "" },
            })
          }
          saveButtonText={editId ? "Update" : "Add"}
          updateUserLoading={loading.updateUserLoading}
        />
      )}
    </div>
  );
};

export default AllUsers;
