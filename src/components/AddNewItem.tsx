import { User, useUser } from "@/context/UserProvider"
import wait from "@/lib/wait"
import axios from "axios"
import { useState } from "react"
import { Button, Card, Form, Offcanvas, Spinner } from "react-bootstrap"

interface AddNewItemProps {
  user: User
}

const AddNewItem = ({ user }: AddNewItemProps) => {

  // sidebar
  const [showAddNew, setShowAddNew] = useState(false)
  const handleOpen = () => setShowAddNew(true)
  const handleClose = () => setShowAddNew(false)

  const { updateUser } = useUser();

  // data submission
  const [submitting, setSubmitting] = useState<boolean>(false);

  // handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form.entries()) as any
    setSubmitting(true);
    await wait(1000);
    const response = await axios.post(`/api/items/${user.id}`, formData)
    updateUser(response.data.data)
    setShowAddNew(false);
    setSubmitting(false);
  }

  return (
    <>
      <Card className="add-item p-1" onClick={handleOpen} role="button">
        <Card.Body className="text-center p-1">
          <h6 className="text-secondary m-0">Add New Item To Count</h6>
          <i className="bi bi-plus text-secondary"></i>
        </Card.Body>
      </Card>
      <Offcanvas show={showAddNew} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add New Item To Count</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder={`Give your item a name`} name="name" />
            </Form.Group>
            <Button type="submit" disabled={submitting}>
              Create Item
              { 
                submitting && 
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="ms-2" />
              }
              </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )

}

export default AddNewItem