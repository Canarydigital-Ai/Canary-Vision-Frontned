import type React from "react"
import Navbar from "../../components/home/Navbar"
import Landing from "../../components/home/Landing"
import PowerfulFeatures from "../../components/home/PowerfulFeatures"
import Footer from "../../components/home/Footer"


const LandingPage:React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <PowerfulFeatures />
      <Footer/>
    </div>
  )
}

export default LandingPage