import React, { useEffect } from "react";
import MutatingDotsLoder from "../../CustomComponents/MutatingDotsLoder";
import { useNavigate } from "react-router-dom";
import { refreshDashScroll } from "../../slices/otherSlice";
import icons from "../../data/icons";


const Dasbord = ({ selector, dispatch }) => {
  const navigate = useNavigate();
  const {
    studentsData,
    isLoading,
    totalStudents,
    getStudentCountsLoading,
    allStudentStatus,
  } = selector;

  const navigatePath = (name) => {
    if (name === "totalStudent") {
      navigate(`/all_Student`);
    } else {
      navigate(`/students/${name}`);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      dispatch(refreshDashScroll()); 
    };

    fetchData();
  }, []);
  



  return (
    <div className="dash-board flex-grow flex w-full relative h-full capitalize ">
      <div className="statistics-container grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6  p-3 md:p-6 flex-grow h-fit">
        <div
          className=" w-full p-5 rounded-[15px] flex gap-6 items-center cursor-pointer bg-[#F0F0F0] transition-colors"
          onClick={() => navigatePath("totalStudent")}
        >
          <div className="">
            <div className="w-[45px] h-[45px] ">
              <img src={icons.total} className="w-full h-full" alt="" />
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-medium capitalize text-[#6D6D6D]">
              total students
            </h2>
            {isLoading ? (
              <div className="mt-3">
                <MutatingDotsLoder color={"#000"} />
              </div>
            ) : (
              <p className="text-3xl font-semibold">{totalStudents}</p>
            )}
          </div>
        </div>

        {studentsData.length === 0 && (
          <>
            <div className=" w-full p-5   cursor-pointer flex gap-8 items-center bg-[#F0F0F0] rounded-[15px] transition-colors">
              <div className="w-[45px] h-[45px] ">
                <img src={icons.default} className="w-full h-full" alt="" />
              </div>
              <div className="">
                <h2 className="text-xl font-medium capitalize text-[#6D6D6D]">
                  Active students
                </h2>
                {getStudentCountsLoading || isLoading ? (
                  <div className="mt-3">
                    <MutatingDotsLoder color={"#000"} />
                  </div>
                ) : (
                  <p className="text-3xl font-semibold">{totalStudents}</p>
                )}
              </div>
            </div>

            <div className=" w-full p-5   cursor-pointer flex gap-8 items-center bg-[#F0F0F0] rounded-[15px] transition-colors">
              <div className="w-[45px] h-[45px] ">
                <img src={icons.default} className="w-full h-full" alt="" />
              </div>
              <div className="">
                <h2 className="text-xl font-medium capitalize text-[#6D6D6D]">
                  Completed students
                </h2>
                {getStudentCountsLoading || isLoading ? (
                  <div className="mt-3">
                    <MutatingDotsLoder color={"#000"} />
                  </div>
                ) : (
                  <p className="text-3xl font-semibold">{totalStudents}</p>
                )}
              </div>
            </div>
          </>
        )}

        {allStudentStatus.map((item, ind) => (
          <div
            key={ind}
            className=" w-full min-h-[106px] flex gap-6 items-center  p-5 cursor-pointer bg-[#F0F0F0] rounded-[15px] transition-colors"
            onClick={() => navigatePath(item.feild)}
          >
            <div className={`w-[45px] ${item.feild ==="completed"  ? "h-[45px] ":"h-[55px]"}`}>
              <img src={icons[item.feild]} className="w-full h-full" alt="" />
            </div>

            <div className="">
              <h2 className="text-xl font-medium text-[#6D6D6D] ">{`${item.feild} students `}</h2>
              {getStudentCountsLoading ? (
                <div className="mt-3">
                  <MutatingDotsLoder color={"#000"} />
                </div>
              ) : (
                <p className="text-3xl font-semibold">{item.count}</p>
              )}
            </div>
          </div>
        ))}
        {studentsData.map((item, ind) => (
          <div
            key={ind}
            className=" w-full p-5  min-h-[106px] flex gap-6  items-center   cursor-pointer bg-[#F0F0F0] rounded-[15px] transition-colors"
            onClick={() => navigatePath(item.programType)}
          >
            <div className="w-[45px] h-[45px] ">
              <img
                src={icons[item.feild] || icons.default}
                className="w-full h-full"
                alt=""
              />
            </div>
            <div className="">
              <h2 className="text-xl font-medium text-[#6D6D6D] ">{`${item.programType} students `}</h2>
              {getStudentCountsLoading ? (
                <div className="mt-3">
                  <MutatingDotsLoder color={"#000"} />
                </div>
              ) : (
                <p className="text-3xl font-semibold">{item.count}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dasbord; 