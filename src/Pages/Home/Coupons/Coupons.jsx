import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const Coupons = () => {

    const axiosPublic = useAxiosPublic();

    const { data: coponsDisplays = [], refetch } = useQuery({
        queryKey: ['coponsDisplays'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/coupon-code`, { withCredentials: true });
            return response.data;
        }
    })

    console.log(coponsDisplay)

    return (
        <div>
            {
                coponsDisplays.map((coponsDisplay)=>
                    <SwiperSlide>

                    </SwiperSlide>
                )
            }
        </div>
    );
};

export default Coupons;