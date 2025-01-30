import React from 'react'
import userAuth from '../utils/userAuth';

async function DashboardPage() {
    const session = await userAuth();

  return (
<><p>This is the dashboard</p></>
    
  )
}

export default DashboardPage;