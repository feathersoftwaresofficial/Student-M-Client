// import React from "react";
// import Button from "./Button";
// import { FaEdit, FaEye } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import MutatingDotsLoder from "../CustomComponents/MutatingDotsLoder";
// import icons from "../data/icons";

// const Table = ({
//   columns,
//   data,
//   handleView,
//   handleDelete,
//   deleteStudentLoading,
//   setEditId,
//   setAddPopup = () => { },
//   viewBtn = true,
//   loading = false,
//   actions = true,

// }) => {

//   return (
//     <div className="overflow-x-scroll flex-grow overflow-y-hidden capitalize min-h-scree rounded-[8px] ">
//       <table className="bg-white w-full min-w-max  ">
//         <thead className="font-bol h-[60px] bg-[#ACEFF5]">
//           <tr>
//             {columns.map((column) => (
//               <th
//                 key={column.key}
//                 className="py-3 px-6 border-b font-semibold text-left" // Increased padding
//               >
//                 {column.label}
//               </th>
//             ))}
//             {actions && (
//               <th className="py-3 px-6 border-b font-semibold text-left">
//                 Actions
//               </th>
//             )}
//           </tr>
//         </thead>

//         <tbody className="mt-">
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <tr
//                 key={index}
//                 className="text-left bg-[#eefdfc] h-[60px] transition duration-200 space-y-2 font-medium" // Optional row spacing
//               >
//                 {columns.map((column) => (
//                   <td
//                     key={column.key}
//                     className={`py-3 px-6 border-b border-[#c7c7c7] ${
//                       viewBtn && "cursor-pointer"
//                     } ${column.key === "email" && "lowercase"} ${
//                       item[column.key] == null ? "text-center" : ""
//                     }`}
//                     onClick={() => {
//                       viewBtn && handleView(item.id);
//                     }}
//                   >
//                     {item[column.key] == null ? (
//                       <span className="text-center">-</span>
//                     ) : column.key === "studentStatus" ? (
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`inline-block w-2 h-2 rounded-full ${
//                             item[column.key] === "completed"
//                               ? "bg-green-500"
//                               : item[column.key] === "active"
//                               ? "bg-blue-500"
//                               : "bg-red-500"
//                           }`}
//                         ></span>
//                         <span>{item[column.key]}</span>
//                       </div>
//                     ) : column.key === "mentor" ? (
//                       item.mentor ? (
//                         item.mentor.map((m) => m.field).join(", ")
//                       ) : (
//                         "-"
//                       )
//                     ) : (
//                       item[column.key]
//                     )}
//                   </td>
//                 ))}
//                 {actions && (
//                   <td className="py-3 px-6 border-b  text-center  border-[#c7c7c7]">

//                     <button className="m-auto action-btn">{icons.verticalDot}</button>
//                   </td>
//                 )}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan={columns.length + 3}
//                 className="text-start sm:text-center w-full py-4 px-6"
//               >
//                 {loading ? (
//                   <p className="w-full flex justify-start md:justify-center">
//                     <MutatingDotsLoder color={"black"} />
//                   </p>
//                 ) : (
//                   <span className="text-gray-500">No data available</span>
//                 )}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React, { useState } from "react";
import Button from "./Button";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import MutatingDotsLoder from "../CustomComponents/MutatingDotsLoder";
import icons from "../data/icons";
import ActionPopup from "../components/mainscreen/ActionPopup";
// import ActionPopup from "../CustomComponents/ActionPopup";

const Table = ({
  columns,
  data,
  handleView,
  handleDelete,
  deleteStudentLoading,
  setEditId,
  setAddPopup = () => {},
  viewBtn = true,
  loading = false,
  actions = true,
  actionPopupStyle,
}) => {
  const [popupVisible, setPopupVisible] = useState(null);

  const togglePopup = (rowId) => {
    setPopupVisible((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <div className="overflow-x-scroll flex-grow overflow-y-hidden capitalize min-h-screen rounded-[8px] relative">
      <table className="bg-white w-full min-w-max">
        <thead className="font-bold h-[60px] bg-[#ACEFF5]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-3 px-6 border-b font-semibold text-left"
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th className="py-3 px-6 border-b font-semibold text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="text-left bg-[#eefdfc] h-[60px] transition duration-200 space-y-2 font-medium"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-3 px-6 border-b border-[#c7c7c7] ${
                      viewBtn && "cursor-pointer"
                    } ${column.key === "email" && "lowercase"} ${
                      item[column.key] == null ? "text-center" : ""
                    }`}
                    onClick={() => {
                      viewBtn && handleView(item.id);
                    }}
                  >
                    {item[column.key] == null ? (
                      <span className="text-center">-</span>
                    ) : column.key === "studentStatus" ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            item[column.key] === "completed"
                              ? "bg-green-500"
                              : item[column.key] === "active"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <span>{item[column.key]}</span>
                      </div>
                    ) : column.key === "mentor" ? (
                      item.mentor ? (
                        item.mentor.map((m) => m.field).join(", ")
                      ) : (
                        "-"
                      )
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
                {actions && (
                  <td className="py-3 px-6 border-b text-center border-[#c7c7c7] relative">
                    {deleteStudentLoading?.includes(item.id) ? (
                      <p className="text-center  flex justify-center">
                        {" "}
                        <MutatingDotsLoder color={"red"} />
                      </p>
                    ) : (
                      <button
                        className="m-auto action-btn"
                        onClick={() => togglePopup(item.id)}
                      >
                        {icons.verticalDot}
                      </button>
                    )}
                    {popupVisible === item.id && (
                      <ActionPopup
                        // styleClass={"top-10  right-24"}
                        onView={() => {
                          handleView(item.id);
                          setPopupVisible(null);
                        }}
                        onEdit={() => {
                          setEditId(item.id);
                          setAddPopup("edit");
                          setPopupVisible(null);
                        }}
                        onDelete={() => {
                          handleDelete(item.id);
                          setPopupVisible(null);
                        }}
                        showView={viewBtn}
                        loading={deleteStudentLoading?.includes(item.id)}
                        styleClass={actionPopupStyle}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-start sm:text-center w-full py-4 px-6"
              >
                {loading ? (
                  <p className="w-full flex justify-start md:justify-center">
                    <MutatingDotsLoder color={"black"} />
                  </p>
                ) : (
                  <span className="text-gray-500">No data available</span>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


