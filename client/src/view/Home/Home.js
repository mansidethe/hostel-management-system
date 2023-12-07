import React, { useState,useEffect } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import './Home.css'
import Footer from '../../component/Footer/Footer'
import axios from 'axios'
import user from './user.png'


const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') ||'{}')

  const[reviews ,setReview]=useState([])

  const [description,setDescription]=useState('')
  const[rating,setRating]=useState('')


const loadAllReview = async() =>{

    const response = await axios.get('api/v1/reviews')

    console.log(response?.data?.data)

   setReview(response?.data?.data)

  }


  useEffect(()=>{
    loadAllReview()

  },[])


  

 

  const Postreview = async()=>{

    const response = await axios.post('api/v1/reviews',{
      user:user?._id,
      description:description,
      rating:rating

    })



    alert(response?.data?.message)

  }



  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user') || '{}')




  },[])
  return (
    <div>
      <Navbar />

     

      <div className='p-1 home-container mt-5 py-5'>
        <div className=' row'>

          <div className='col-md-6'>

            <div className='ps-3'>
              <h2>HOSTELBOOK</h2>
              <p className='fs-2 '>Amazing hostel for students .....</p>
              <p className='fs-5 text-dark '>A hostel is a lower-priced inn of sorts that offers basic, shared accommodations. Typically, a hostel features a large room with separate beds, a shared bathroom, and a communal kitchen. Some hostels have private rooms, but the lower-cost ones generally offer bunk beds.</p>
            </div>

          </div>

          <div className='col-md-6'>

            <div className=''>

             <img src="https://www.greenvilleonline.com/gcdn/presto/2021/02/22/PGRE/dfe5ab88-a835-4f9a-873a-d40e7708881c-0321_TG_Modal_02.JPG?crop=2399,1350,x0,y0&width=660&height=372&format=pjpg&auto=webp" alt="hostel-img" className='home-hostel-img'/>
            </div>

          </div>


        </div>
      </div><br/>


<div>
        <h1 className='text-center'>What People Say About Us </h1>

  <div className='d-flex justify-content-evenly flex-wrap'>
  {
        reviews?.map((review,i)=>{

          return(
            <div  className='container-review' >
               <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"  height="60px"alt="user"/>  <span className='fs-4'>{review?.user?.name}</span>
               <p className='mt-3'>{review.description}</p>
               <h3>{review.rating}</h3>
            </div>
           
          )
        })
      }
  </div>
     
     
  <div className='review-container m-2'>
        <form>
       <input  placeholder='Enter your review here....'  className='input-box' type="text" value={description} onChange={(e)=>{
            setDescription(e.target.value)
          }} />
          <input   placeholder=' Enter rating here ....'  className='input-box'  type="text" value={rating} onChange={(e)=>{
            setRating(e.target.value)
          }}/>
          <button className='btn btn-primary ms-3' type="button" 

        
onClick={()=>{
  Postreview()
}}
  >Add Review</button>
        </form>
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Home
