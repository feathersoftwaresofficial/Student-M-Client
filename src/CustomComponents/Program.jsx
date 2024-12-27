
// import React from 'react';
// import Button from '../CustomComponents/Button';
// import icons from '../data/icons';

// const Program = ({
//   heading,
//   btnName,
//   addBtn,
//   editBtn,
//   deleteBtn,
//   programType,
//   deleteProgramLoading,
//   deleteId,
//   getProgramLoading,
//   inputValueError,
// }) => {
//   return (
//     <div className="w-full flex flex-col gap-4 m-0  p-4  bg-[#D3F8FA]    rounded-[8px] h-fit  ">
//       <div className=" flex justify-between items-center ">
//         <p className="text- font-semibold text-[18px] ">{heading}</p>

//         <Button
//           value={btnName}
//           onClick={() => addBtn(heading)}
//           className="bg-white  text-[#6D6D6D] px-4  rounded "
//           loading={getProgramLoading}
//         />
//       </div>

//       {getProgramLoading ? (
//         ""
//       ) : programType && programType.length > 0 ? (
//         <div className="space-y-2 capitalize">
//           {programType.map((programTypeItem, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-white rounded-[8px]  py-2 px-4  "
//             >
//               <div className="w-full  ">
//                 {programTypeItem.programType || programTypeItem.program}
//               </div>
//               <div className="cursor-pointer">{icons.verticalDot}</div>

//               <div className="flex gap-2">
//                 <Button
//                   value={icons.edit}
//                   onClick={() => editBtn(programTypeItem)}
//                   className="px-4 py-1 text-[#509CDB] border bg-white border-[#509CDB] rounded hover:bg-[#509CDB] hover:text-white"
//                 />
//                 <Button
//                   value={icons.delete}
//                   loading={
//                     deleteId.includes(programTypeItem.id) &&
//                     deleteProgramLoading
//                   }
//                   animationColor={"red"}
//                   onClick={() => deleteBtn(programTypeItem)}
//                   className="px-4 py-1 border bg-white border-red-500 rounded text-[#EF4444] hover:text-white hover:bg-[#EF4444]"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default Program;
import React, { useState } from "react";
import Button from "../CustomComponents/Button";
import icons from "../data/icons";
import ActionPopup from "../components/mainscreen/ActionPopup";
import MutatingDotsLoder from "./MutatingDotsLoder";


const Program = ({
  heading,
  btnName,
  addBtn,
  editBtn,
  deleteBtn,
  programType,
  deleteProgramLoading,
  deleteId,
  getProgramLoading,
  inputValueError,
}) => {
  const [popupVisibleIndex, setPopupVisibleIndex] = useState(null);

  const togglePopup = (index) => {
    setPopupVisibleIndex((prev) => (prev === index ? null : index));
  };

  const handleView = (programTypeItem) => {
    console.log("View clicked:", programTypeItem);
    setPopupVisibleIndex(null);
  };

  const handleEdit = (programTypeItem) => {
    editBtn(programTypeItem);
    setPopupVisibleIndex(null);
  };

  const handleDelete = (programTypeItem) => {
    deleteBtn(programTypeItem);
    setPopupVisibleIndex(null);
  };

  return (
    <div className="w-full flex flex-col gap-4 m-0 p-4 bg-[#D3F8FA] rounded-[8px]  ">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[18px]">{heading}</p>
        <Button
          value={btnName}
          onClick={() => addBtn(heading)}
          className="bg-white text-[#6D6D6D] px-4 rounded"
          loading={getProgramLoading}
        />
      </div>

      {getProgramLoading ? (
        ""
      ) : programType && programType.length > 0 ? (
        <div className="space-y-2 capitalize">
          {programType.map((programTypeItem, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between bg-white rounded-[8px] py-2 px-4"
            >
              <div className="w-full">
                {programTypeItem.programType || programTypeItem.program}
              </div>

              {deleteId.includes(programTypeItem.id) ? (
                <MutatingDotsLoder color={"red"} />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => togglePopup(index)}
                >
                  {icons.verticalDot}
                </div>
              )}

              {popupVisibleIndex === index && (
                <ActionPopup
                  styleClass={"top-3  right-10"}
                  showView={false}
                  onEdit={() => handleEdit(programTypeItem)}
                  onDelete={() => handleDelete(programTypeItem)}
                  loading={
                    deleteId.includes(programTypeItem.id) &&
                    deleteProgramLoading
                  }
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Program;
