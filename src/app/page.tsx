'use client'

import wait from "@/lib/wait";
import { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie'
import { useUser } from "@/context/UserProvider";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const { user, loadingUser } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    const id = uuidv4()
    Cookies.set('userID', id)
    await wait(2000);
    setLoading(false);
    window.location.href = '/counter'
  }

  if (!loadingUser && user) {
    window.location.href = '/counter'
    return
  }

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col className="col-lg-6 text-center">
          <h1>Counter360...</h1>
          { user && <p>user: { user?.id }</p> }
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
        !loadingUser && !user &&
        <Row className="justify-content-center text-center">
          <Col className="col-lg-6">
            <Button variant="primary" disabled={loading} onClick={handleLogin}>
              Login
              { 
                loading && 
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="ms-2" />
              }
            </Button>
          </Col>
        </Row>
      }
      
    </Container>
  );
}
