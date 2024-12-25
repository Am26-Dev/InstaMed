import React from 'react'
import Navbar from './Navbar'
import Footer from './footer'

const MainLayout = ( { children } ) => {
  return (
    <div className="mx-4 sm:mx-[10%]">
    <Navbar />
    {children}
    <Footer />
  </div>
  )
}

export default MainLayout