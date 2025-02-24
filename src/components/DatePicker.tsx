import getUserDateFormat from "@/lib/getUserDateFormat";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

interface CounterDatePickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

const CounterDatePicker = ({ selectedDate, setSelectedDate}: CounterDatePickerProps) => {

  const incrementDate = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  const decrementDate = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  const dateFormat = getUserDateFormat()

  return (
    <>
      <i className="bi bi-caret-left-fill me-1" role="button" onClick={() => decrementDate()}></i>
      <DatePicker selected={selectedDate} onChange={setSelectedDate} dateFormat={dateFormat} className="border rounded text-center" />
      <i className="bi bi-caret-right-fill ms-1" role="button" onClick={() => incrementDate()}></i>
    </>
  )

}

export default CounterDatePicker