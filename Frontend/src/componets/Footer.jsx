import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t text-center'>
        <div className='container mx-auto p-4 flex flex-col gap-2 lg:flex-row lg:justify-between'>
            <p>© All Right reserved 2025.</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='' className='hover:text-[#1877F2]'>
                    <FaFacebook/>
                </a>
                <a href=""
                    className="rounded hover:bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45] inline-flex items-center justify-center">
                    <FaInstagram className="hover:text-white" />
                </a>

                <a href='' className='hover:text-[#0A66C2]'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
