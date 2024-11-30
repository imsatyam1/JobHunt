import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Menu } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi","Noida","Gurugram", "Banglore", "Hyderabad", "Pune", "Chennai", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "FrontEnd Developer",
      "BackEnd Developer",
      "FullStack Developer",
      "Python Developer",
      "ReactJS Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["1-3 LPA", "3-6 LPA", "6-10 LPA", ">10 LPA"],
  },
];

const FilterMenu = ({ selectedValue, changeHandler }) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-md p-4 md:p-6 lg:p-8">
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h1 className="font-bold text-lg pt-2">{data.filterType}</h1>
            {data.array.map((items, index) => (
              <div key={index} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={items} />
                <Label className="px-2">{items}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const FilterCard = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <>
      <div className="lg:hidden">
        <div className="flex">
          <h1 className="px-3 gap-3 font-bold text-lg mb-2">Filter Jobs</h1>
          <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <hr className="mt-3 mb-4" />
        {isFilterMenuOpen && (
          <FilterMenu
            selectedValue={selectedValue}
            changeHandler={changeHandler}
          />
        )}
      </div>
      <div className="hidden lg:block flex flex-col w-full bg-white rounded-md p-4 md:p-6 lg:p-8">
        <h1 className="font-bold text-lg mb-2">Filter Jobs</h1>
        <hr className="mt-3 mb-4" />
        {
          <FilterMenu
            selectedValue={selectedValue}
            changeHandler={changeHandler}
          />
        }
      </div>
    </>
  );
};

export default FilterCard;
