import React from 'react'
import Header from '../../components/Header/Header.jsx'
import PopularMeals from '../../components/PopularMeals/PopularMeals.jsx'
import Category from '../../components/Category/Category.jsx'
import Meals from '../../components/Meals/Meals.jsx'
import Footer from '../../components/Footer/Footer.jsx'

function CustomerHome() {
  return (
    <div>
      <Header/>
      <PopularMeals/>
      <Category/>
      <Meals/>
      <Footer/>
    </div>
  )
}

export default CustomerHome
