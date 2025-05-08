import type React from "react"
import Img from "../../assets/Ai-containerImg.png"
import Img2 from "../../assets/Ai-LandingImg1.png"
import { useNavigate } from "react-router-dom"

const Landing:React.FC = () => {
    const navigate =useNavigate()
  return (
    <>
 <div className="relative w-full bg-[#080F17] min-h-screen overflow-x-hidden">
  <img
    src={Img}
    alt="Background"
    className="w-full h-full object-contain absolute inset-0 z-0"
  />

  <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 max-w-full mx-auto mt-12">
    <h1 className="text-[48px] md:text-[95px] font-bold leading-none mb-8 max-w-4xl mx-auto">
      Revolutionize Your Business with Canary Eye
    </h1>

    <button onClick={()=>navigate('/dashboard')} className="bg-[#F1EF7E] text-[20px] text-black font-semibold px-6 py-3 rounded-[8px] mb-10">
      Get started
    </button>

    <img
      src={Img2}
      alt="Feature"
      className="max-w-full md:max-w-[80%] w-auto h-auto object-contain border rounded-[18px] border-gray-500 mb-10"
    />

  </div>
</div>

</>
  )
}

export default Landing