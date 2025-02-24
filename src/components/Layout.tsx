'use client'

import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';


const Layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {


  return (
    <html lang="en">
      
      <body>
        { children }        
      </body>
    </html>
  )
}

export default Layout