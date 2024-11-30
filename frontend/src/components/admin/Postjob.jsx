import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";
import JoditEditor from "jodit-react";
import { Textarea } from "../ui/textarea";
import useGetJobById from "@/hooks/useGetJobById";

const PostJob = () => {
  const params = useParams();
  useGetJobById(params.id);

  const {singleJob} = useSelector(store => store.job);
  
  const [input, setInput] = useState({
    title: singleJob?.title||"",
    description: singleJob?.description||"",
    requirements: singleJob?.requirements||"",
    salary: singleJob?.salary||"",
    location: singleJob?.location||"",
    jobType: singleJob?.jobType||"",
    experience: singleJob?.experience||"",
    jobOverview: singleJob?.jobOverview||"",
    position: singleJob?.position||"",
    companyId: singleJob?.companyId||"",
  });

  const editor = useRef(null);
  const { loading } = useSelector((store) => store.auth);
  const { companies } = useSelector((store) => store.company);
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 100;
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const jobOviewHandler = (e) => {
    const inputText = e.target.value;
    const words = inputText.split(/\s+/).filter(Boolean);
    if(words.length <= wordLimit){
      setInput({...input, jobOverview: inputText});
      setWordCount(words.length);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(input);
    
    if (
      !input.title ||
      !input.description ||
      !input.requirements ||
      !input.salary ||
      !input.location ||
      !input.jobType ||
      ! input.jobOverview || 
      !input.experience ||
      !input.position ||
      !input.companyId
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.message) {
        console.log(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Session expired. Please Login");
        navigate("/login");
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex gap-5 px-6 py-4">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex gap-5 text-gray-500 font-semibold"
            >
              <span>Back</span>
            </Button>
            <h1 className="font-bold px-14 sm: px-6 items-center text-xl text-blue-600">
              Job Details
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mx-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirement</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-red-600 font-bold">
                  *Please register a company first, before posting a job
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 mx-2">
            <Label>Job Overview</Label>
            <Textarea 
              name="jobOverview"
              value={input.jobOverview}
              onChange={jobOviewHandler}
              placeholder="Enter job overview (Max Limit 100 words)"
              className="h-auto"
            />
            <p className="text-sm text-gray-500 mt-1">
              {wordCount}/{wordLimit} words used
            </p>
          </div>

          <div className="mt-3 mx-2">
            <Label>Job Description</Label>
            <JoditEditor
              ref={editor}
              value={input.description}
              onChange={(newContent) => setInput({...input, description: newContent})}
            />
          </div>

          <div className="mx-2">
          {loading ? (
            <Button className="w-full my-4 mx-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4" onClick={submitHandler}>
              Post New Job
            </Button>
          )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
