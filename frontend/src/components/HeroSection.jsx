import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import setQuery, { setSearchedQuery } from '@/redux/jobSlice';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = () => {
        try {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <div className="text-center px-4">
            <div className="flex flex-col gap-5 my-10 md:my-20 lg:my-30">
                <span className="mx-auto text-xl md:text-2xl px-4 py-2 rounded-full bg-[#000000] text-[#FF5733] font-medium font-bold">
                    No. 1 Job Hunting Website
                </span>
                <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
                    Search, Apply & <br /> Get Your <span className="text-blue-600">Dream Jobs</span>
                </h1>
                <div className="flex w-full max-w-full lg:w-1/2 mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
                    <input
                        type="text"
                        placeholder="Find your dream job?"
                        className="outline-none border-none w-full"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-blue-600 py-2 px-4">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
