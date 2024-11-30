import React, { useState, useEffect, use } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Eye, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ForgotPassword() {
  const [input, setInput] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [passwordSeen, setPasswordSeen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [input]);

  const validateForm = () => {
    let tempErrors = {};

    const isEmpty = Object.values(input).some(
      (value) => value === "" || value === null
    );

    if (!isEmpty) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!emailRegex.test(input.id) && !phoneRegex.test(input.id)) {
        tempErrors.id = "Wrong Input!";
      }

      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

      if (!passwordRegex.test(input.password)) {
        tempErrors.password =
          "Password must have at least 1 letter, 1 digit, 1 special character, and be >6 characters";
      }

      if (input.password !== input.confirmPassword) {
        tempErrors.confirmPassword == "PassWords do not match!";
      }
    } else {
      tempErrors.general = "All fiels are required!!";
    }

    setErrors(tempErrors);
    setIsFormValid(Object.keys(tempErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    if (isFormValid) {
      try {
        dispatch(setLoading(true));
        const res = await axios.post(
          `${USER_API_END_POINT}/forgot-password`,
          input,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div>
      <div className="sm:mt-8 flex flex-col lg:my-20 justify-center items-center w-full max-w-screen-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-3/4 lg:w-2/3 border border-gray-300 p-5 rounded-lg bg-white"
        >
          <h1 className="text-lg lg:text-2xl font-bold mb-5">
            Reset Your<span className="text-blue-600">Password</span>
          </h1>

          {/* Email Input */}
          <div className="mb-2">
            <Label className="block mb-2 font-bold">Email/Phone Number</Label>
            <Input
              type="text"
              name="id"
              placeholder="Tell us your Email ID"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.id}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <Label className="block mb-2 font-bold">Password</Label>
            <div className="relative">
              <Input
                type={passwordSeen ? "text" : "password"}
                name="password"
                placeholder="Minimum 6 characters"
                className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={input.password}
                onChange={handleChange}
                required
              />
              <Eye
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:text-gray-700 ${
                  passwordSeen ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setPasswordSeen(!passwordSeen)}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <Label className="block mb-2 font-bold">Confirm Password</Label>
            <div className="relative">
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.confirmPassword}
              onChange={handleChange}
              required
            />
            <Eye
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:text-gray-700 ${
                  passwordSeen ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setPasswordSeen(!passwordSeen)}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              type="submit"
              className="w-full py-2 rounded-md text-white g-gradient-to-r from-blue-900 via-blue-700 to-blue-300"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${
                isFormValid
                  ? "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-300"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              {" "}
              Reset Password
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
