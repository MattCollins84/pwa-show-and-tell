'use client'

import AddNewItem from "@/components/AddNewItem";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useUser } from "@/context/UserProvider";
import ItemCounter from "@/components/ItemCounter";
import Cookies from "js-cookie";

export interface Item {
  name: string
  colour: string
}

export default function Counter() {

  const { user, loadingUser } = useUser();

  const handleLogout = () => {
    Cookies.remove('userID')
    window.location.href = '/'
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-6 text-center">
          <h1>Counter</h1>
          <p>user: { user?.id }</p>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      {
        loadingUser &&
        <Row className="justify-content-center text-center">
          <Col className="col-lg-6">
            <Spinner animation="border" />
          </Col>
        </Row>
      }
      {
        !loadingUser && user &&
        <>
          <Row className="justify-content-center text-center mt-3">
            <Col className="col-lg-6">
              {
                user.items?.map((item, index) => (
                  <ItemCounter key={index} user={user} item={item} />
                ))
              }
              <AddNewItem user={user}/>
            </Col>
          </Row>
        </>        
      }
      
    </Container>
  );
}
