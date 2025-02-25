'use client'

import AddNewItem from "@/components/AddNewItem";
import { Button, Col, Container, Row, Spinner, Tooltip } from "react-bootstrap";
import { UserItem, useUser } from "@/context/UserProvider";
import ItemCounter from "@/components/ItemCounter";
import Cookies from "js-cookie";
import PushNotificationManager, { PushNotificationManagerHandle } from "@/components/PushNotificationManager";
import ButtonSpinner from "@/components/ButtonSpinner";
import { Bar, BarChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useRef } from "react";

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

  const pushRef = useRef<PushNotificationManagerHandle>(null)
  const handleSend = () => {
    pushRef.current?.sendTestNotification("foo")
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-6 text-center">
          <h1>Counter!</h1>
          <p>user: { user?.id }</p>
          <ButtonSpinner variant="primary" onClick={handleLogout} loading={false} label="logout" className="mx-1" />
          <PushNotificationManager ref={pushRef} />
          <Button onClick={handleSend} className="mx-1">click</Button>
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
        !loadingUser && user && user.items.length &&
        <Row className="justify-content-center text-center mt-3">
          <Col className="col-lg-6" style={{height: "300px"}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={user.items}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          </Col>
        </Row>
      }
      {
        !loadingUser && user &&
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
      }
      
    </Container>
  );
}
