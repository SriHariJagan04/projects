import React from 'react'
import AuthProvider from './contexts/AuthContext'

const Store = ({children}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default Store