import { redirect } from 'next/navigation'
import React from 'react'

const HomeDashboard = () => {
  redirect("/dashboard/users")
  return (
    <div>

    </div>
  )
}

export default HomeDashboard
