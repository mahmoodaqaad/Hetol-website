import { redirect } from 'next/navigation'
import React from 'react'

const HomeDashboard = () => {
  redirect("/dashboard/users?pageNumber=1")
  return (
    <div>

    </div>
  )
}

export default HomeDashboard
