
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import BookingModal from './BookingModal';

const ProductCard = ({ product , setProductForModal}) => {
    // console.log(product);

    const { user } = useContext(AuthContext)
    const [isVerifiedSeller, setIsVerifiedSeller] =useState(false)
    
   
    // console.log(productForModal);
   
    const {
        _id,
        category_id,
        car_model, img,
        resale_price, original_price,
        years_of_use, seller,
        posting_time,  condition, 
        sellerEmail


    } = product;

    
    // const postTime = format(posting_time, "PP")
    // console.log(postTime);
    

    // useEffect(()=>{

    //     fetch(`https://wamp-server.vercel.app/product?id=${_id}`)
    //     .then(res => res.json())
    //     .then(data => {

    //         setProductForModal(data);
           
    //     })

    // },[])
    // console.log(productForModal);

    // useEffect(()=>{

    //     fetch(`https://wamp-server.vercel.app/product?id=${_id}`)
    //     .then(res => res.json())
    //     .then(data => {

    //         setProductForModal(data);
           
    //     })

    // },[])



    
    useEffect(()=>{

        fetch(`https://wamp-server.vercel.app/verifiedseller?email=${
            sellerEmail}`)
        .then(res => res.json())
        .then(data => {

            if(data.length > 0 ){
                setIsVerifiedSeller(true)
               
            }
           
        })

    },[])


    

    

    return (
        <div className="card w-96 bg-base-100 shadow-xl m-5 ">
    
           <figure><img src={img} alt={car_model} /></figure>
           


            
            <div className="card-body h">

                
                <h2 className="card-title">
                    {car_model}
                    <div className="badge badge-secondary">{category_id}</div>
                </h2>
                <p>Used: {years_of_use} years.</p>
                <p>Condition: {condition}</p>
                <p>Location: {seller.location}</p>
                <p>Posted on: {
                  posting_time
                }</p>

                <div className="card-actions flex justify-between">
                    <div className="badge badge-outline badge-info text-white font-bold">Original price: {original_price} BDT</div>
                    <div className="badge badge-secondary   badge-outline font-bold">Resale Price: {resale_price} BDT</div>
                </div>
                <div className='flex justify-between my-auto mt-3'>
                    <div className='flex justify-between'>
                        <div className="avatar max-w-3/4">
                            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={seller.img_url} />
                            </div>

                        </div>
                        <div>
                            <div className='flex items-center'>
                                <div>
                                    <h1 className='mx-3 font-semibold flex-1'>{seller.name}</h1>
                                </div>
                                <div>

                                    {
                                        isVerifiedSeller ?
                                            <>
                                                <img className='w-4' src='https://cdn-icons-png.flaticon.com/512/6364/6364343.png' />
                                            </>
                                            :
                                            <>


                                            </>
                                    }

                                </div>

                            </div>


                            <h1 className='mx-3 
                    '>Seller</h1>




                        </div>
                    </div>

                    <div className='flex flex-col-reverse'>
                        <label onClick={()=> setProductForModal(product)} htmlFor="bookingModal" className="btn btn-sm btn-success text-white">Book now</label>
                        <button className="btn btn-xs btn-error mb-2 text-white">Report</button>
                    </div>
                    
                </div>

            </div>
            

        </div>
    );
};

export default ProductCard;