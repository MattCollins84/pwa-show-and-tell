import { User, UserItem, useUser } from "@/context/UserProvider"
import wait from "@/lib/wait"
import axios from "axios"
import { useState } from "react"
import { Button, Card, Col, Form, Offcanvas, Row, Spinner } from "react-bootstrap"

interface ItemCounterProps {
  user: User
  item: UserItem
}

const ItemCounter = ({ user, item }: ItemCounterProps) => {

  const { updateUser } = useUser();

  const handleAdd = async () => {
    const response = await axios.put(`/api/items/${user.id}`, { name: item.name, action: 'add' })
    updateUser(response.data.data)
  }

  const handleSubtract = async () => {
    const response = await axios.put(`/api/items/${user.id}`, { name: item.name, action: 'subtract' })
    updateUser(response.data.data)
  }

  return (
    <>
      <Card className="p-1 mb-2">
        <Card.Body className="text-center p-1">
          <Row className="justify-content-between">
            <Col className="col-3">
              <Button variant="link" className="text-secondary">
                <h2 role="button" onClick={handleSubtract}><i className="bi bi-dash"></i></h2>
              </Button>
            </Col>
            <Col className="col-6">
              <h6 className="text-secondary m-0">{ item.name }</h6>
              <h2>{ item.count }</h2>
            </Col>
            <Col className="col-3">
              <Button variant="link" className="text-secondary">
                <h2 role="button" onClick={handleAdd}><i className="bi bi-plus"></i></h2>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )

}

export default ItemCounter