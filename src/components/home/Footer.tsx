import type React from "react"
import Logo from "../../assets/Ai-Logo.png"
const Footer:React.FC = () => {
  return (
    <>
  <div className="flex flex-col md:flex-row bg-[#080F17] pb-10">
    <div className="w-full md:w-60 flex justify-center md:justify-start">
      <img src={Logo} alt="Logo" className="h-36 w-auto" />
    </div>
    <div className="w-full pt-10">
    <div className="flex-grow bg-[#080F17] border-t border-[#FFFFFF33] flex justify-end">
    
        <div className="mt-12 pt-6 text-center text-[#D6DDE6] text-sm  w-48">
          <p>© {new Date().getFullYear()} Built and Maintained by Canary Digital.AI</p>
        </div>
     
    </div>
    </div>
  </div>
</>
  )
}

export default Footer