import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'


function RestaurantLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <SideBar />

      {/* Main Content (All child routes render here) */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>

    </div>
  )
}

export default RestaurantLayout
