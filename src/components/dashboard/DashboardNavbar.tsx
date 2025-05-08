import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

const DashboardNavbar :React.FC= () => {
  return (
    <div className='bg-[#080F17] w-full px-8 py-5'>
        <div className='w-full flex justify-end'>

      <FaRegUserCircle size={34} />
        </div>
    </div>
  )
}

export default DashboardNavbar
