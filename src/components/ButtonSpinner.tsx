import { Button, Spinner } from "react-bootstrap"

interface ButtonSpinnerProps {
  label: string
  loading: boolean
  onClick?: () => void
  variant?: string
  className?: string
  type?: "button" | "submit" | "reset"
}

const ButtonSpinner = ({ loading, onClick, label, variant, className, type }: ButtonSpinnerProps) => {
  
  return (
    <Button variant={variant} disabled={loading} onClick={onClick} className={className} type={type || 'button'}>
      { label }
      { 
        loading && 
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="ms-2" />
      }
    </Button>
  )
}

export default ButtonSpinner