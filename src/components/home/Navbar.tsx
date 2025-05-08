import Logo from "../../assets/Ai-Logo.png"
const Navbar:React.FC = () => {
  return (
    <>
<div className="flex flex-col md:flex-row bg-[#080F17] pb-10">
    <div className="w-full md:w-60 flex justify-center md:justify-start">
      <img src={Logo} alt="Logo" className="h-36 w-auto" />
    </div>
    <div className="w-full pt-10">
    <div className="flex-grow bg-[#080F17] border-b border-[#FFFFFF33]">
    
    <div className="pr-8 flex justify-end pb-6">
      <button className="bg-[#F1EF7E] px-4 py-1 rounded-[8px] text-black font-semibold">
        View Now
      </button>
    </div>
     
    </div>
    </div>
  </div>

    </>
  )
}

export default Navbar