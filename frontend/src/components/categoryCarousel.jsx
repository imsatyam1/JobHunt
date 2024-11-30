import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
    "Frontend Developer", "Backend Developer", "Data Science", "Python Developer", "Reactjs Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="overflow-x-hidden">
            <Carousel className="w-full max-w-2xl mx-auto mt-3 lg:mt-10">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/3">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full text-sm md:text-base lg:text-lg">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="text-gray-500 hover:text-gray-900" />
                <CarouselNext className="text-gray-500 hover:text-gray-900" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
