import React, { useState, useEffect, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Textarea } from "../ui/textarea";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const {loading} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const textareaRef = useRef();

  const handleInput = (e) => {
    const target = textareaRef.current;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(input);
    
    if (!input.name || !input.description || !input.website || !input.location) {
      console.log("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/admin/companies");
        console.log(res);
        
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 my-10">
        <form onSubmit={submitHandler} className="p-6 border border-gray-200 rounded-lg shadow-md">
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" name="file" accept="image/*" onChange={changeFileHandler} />
            </div>
          </div>
          <div className="mt-4">
            <Label>Description</Label>
            <Textarea
              ref={textareaRef}
              value={input.description}
              className="mt-2 w-full h-10 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 resize-none"
              name="description"
              onInput={handleInput}
              onChange={changeEventHandler}
              placeholder="Enter a description..."
            />
          </div>
          {loading ? (
            <Button className="w-full mt-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6" onClick={submitHandler}>
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
