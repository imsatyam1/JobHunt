import React, { useEffect, useState, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Eye, Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import defaultProfilePic from "../../assets/defaultProfilePic.png"

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    workstatus: "",
    profilePic: null,
  });
  const [passwordSeen, setPasswordSeen] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if(file){
        const previewURL = URL.createObjectURL(file);
        setInput({...input, file, profilePic: previewURL});
    }
  };

  useEffect(() => {
    return() => {
        if(input.profilePic){
            URL.revokeObjectURL(input.profilePic);
        }
    };
  }, [input.profilePic]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("workstatus", input.workstatus);
    if (input.file) {
      formData.append("profilePic", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col my-8 lg:my-20 justify-center items-center h-screen w-full max-w-screen-lg mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-3/4 lg:w-2/3 border border-gray-300 p-5 rounded-lg bg-white"
        >
          <h1 className="text-lg lg:text-2xl font-bold mb-5">
            Create your <span className="text-blue-600">Job</span> Profile
          </h1>
          <div className="flex items-center justify-center">
            <Avatar className="h-16 w-16 lg:h-20 lg:w-20 cursor-pointer">
              <AvatarImage 
                src = {input.profilePic || defaultProfilePic}
                alt = "Profile Photo"
                style={{borderRadius: "50%"}}
              />
            </Avatar>
          </div>

          <div className="mb-5 font-bold flex items-center justify-center">
            <p
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300 cursur-pointer hover:underline"
                onClick={handleButtonClick}
            >
                <span>Upload Image</span>
            <Input
              accept="image/*"
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={changeFileHandler}
              className="hidden"
            />
            </p>
          </div>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name!"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <div className="relative">
            <Input
              type={passwordSeen ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <Eye
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:text-gray-700 ${
                  passwordSeen ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setPasswordSeen(!passwordSeen)}
              />
            </div>
          </div>
          <Label>Work Profile</Label>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="workstatus"
                  value="employee"
                  checked={input.workstatus === "employee"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Employee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="workstatus"
                  value="recruiter"
                  checked={input.workstatus === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className= "w-full py-2 rounded-md text-white  bg-gradient-to-r from-blue-900 via-blue-700 to-blue-300"
            >
              {" "}
              SignUp
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
