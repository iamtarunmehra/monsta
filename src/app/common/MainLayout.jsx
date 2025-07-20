"use client"
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import myStore from '@/store/store'

export default function MainLayout({ children }) {
  return (
    <Provider store={myStore}>
      <Header />
      {children}
      <Footer />
    </Provider>
  )
}
