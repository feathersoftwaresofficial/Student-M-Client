import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashLayout from "../layout/DashLayout";
import Dasbord from "../components/mainscreen/Dasboard";
import ViewStudents from "../components/mainscreen/ViewStudents";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/auth/Login";
import PasswordReset from "../components/auth/PasswordReset";
import TypeOfStudent from "../components/mainscreen/TypeOfStudent";
import Student from "../components/mainscreen/Student";
import AllUsers from "../components/mainscreen/AllUsers";

const AppRoutes = ({
  burger,
  setBurger,
  dispatch,
  navigate,
  triggerPopUp,
  selector,
  programSelector,
  authSelector,
  loginStatus,
  activitySelector,
  usersSelector,
  otherSelector,
}) => {
  const { user } = authSelector;

  return (
    <Routes>
      {loginStatus ? (
        <Route
          path="/"
          element={
            <DashLayout
              otherSelector={otherSelector}
              burger={burger}
              setBurger={setBurger}
              dispatch={dispatch}
              authSelector={authSelector}
            />
          }
        >
          <Route
            index
            element={
              <Dasbord
                selector={selector}
                dispatch={dispatch}
                navigate={navigate}
                triggerPopUp={triggerPopUp}
                programSelector={programSelector}
              />
            }
          />
          <Route
            path="Dashboard"
            element={
              <Dasbord
                selector={selector}
                dispatch={dispatch}
                navigate={navigate}
                triggerPopUp={triggerPopUp}
                programSelector={programSelector}
              />
            }
          />

          <Route
            path="all_Student"
            element={
              <ViewStudents
                selector={selector}
                dispatch={dispatch}
                navigate={navigate}
                triggerPopUp={triggerPopUp}
                programSelector={programSelector}
              />
            }
          />
          <Route
            path="all_users"
            element={
              user.role === "admin" ? (
                <AllUsers
                  authSelector={authSelector}
                  dispatch={dispatch}
                  navigate={navigate}
                  triggerPopUp={triggerPopUp}
                  usersSelector={usersSelector}
                  programSelector={programSelector}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="student/:id"
            element={
              <Student
                studentSelector={selector}
                selector={activitySelector}
                dispatch={dispatch}
                triggerPopUp={triggerPopUp}
              />
            }
          />

          <Route
            path="/students/:name"
            element={
              <TypeOfStudent
                selector={selector}
                dispatch={dispatch}
                navigate={navigate}
                programSelector={programSelector}
                triggerPopUp={triggerPopUp}
              />
            }
          />
        </Route>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route
            path="login"
            element={
              <Login
                selector={authSelector}
                dispatch={dispatch}
                navigate={navigate}
                triggerPopUp={triggerPopUp}
              />
            }
          />

          <Route
            path="passwordreset"
            element={
              <PasswordReset
                selector={authSelector}
                dispatch={dispatch}
                navigate={navigate}
                triggerPopUp={triggerPopUp}
              />
            }
          />
        </Route>
      )}
      <Route
        path="*"
        element={<Navigate to={loginStatus ? "/" : "/login"} />}
      />
      <Route
        path="student/:id"
        element={
          <Student
            studentSelector={selector}
            selector={activitySelector}
            dispatch={dispatch}
            triggerPopUp={triggerPopUp}
          />
        }
      />
      <Route
        path="/students/:name"
        element={
          <TypeOfStudent
            selector={selector}
            dispatch={dispatch}
            navigate={navigate}
            programSelector={programSelector}
            triggerPopUp={triggerPopUp}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
