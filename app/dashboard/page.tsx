import React from 'react'
import userAuth from '../utils/userAuth';
import Navbar from '../components/Navbar';

async function DashboardPage() {
    // const session = await userAuth();

  return (
    <div className=' max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8' >
        <Navbar/>
    </div>
  )
}

export default DashboardPage;