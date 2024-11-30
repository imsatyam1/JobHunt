import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registrationCompany = async () => {
        try {
            console.log(companyName);

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            console.log(res);
            
            
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            if(error.response && error.response.status === 401){
                console.log("Session expired. Please Login");
                
                dispatch(setUser(null));
                navigate("/login");
              }
              else{
                console.log(error);
              }
        }
    }
    return(
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10 mx-2">
                    <h1 className="font-bold text-2xl">Your company Name</h1>
                    <p className="text-gray-500">What would you like to give your company name?</p>
                </div>

                <Label className="mx-2">Company Name</Label>
                <Input 
                    type = "text"
                    className= "my-2 mx-2"
                    name= "companyName"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10 mx-2'>
                    <Button variant="outline" onClick = {() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick= {registrationCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
