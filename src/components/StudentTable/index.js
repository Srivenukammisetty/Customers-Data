import {Component} from 'react'
import './index.css'

const generateDummyData = () => {
  const currentDate = new Date()
  return Array.from({length: 50}, (_, i) => {
    const number = i + 1
    const date = new Date(currentDate.getTime() - i * 86400000)
      .toISOString()
      .slice(0, 10)
    const time = new Date(currentDate.getTime() - i * 86400000)
      .toISOString()
      .slice(11, 19)

    const minAge = 18
    const maxAge = 40

    const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge
    // creating phone number
    function generateRandomIndianPhoneNumber() {
      const countryCode = '+91' // India country code
      // const areaCode = Math.floor(Math.random() * 90) + 10 // Random 2-digit area code
      const subscriberNumber =
        Math.floor(Math.random() * 9000000000) + 1000000000 // Random 10-digit subscriber number

      return `${countryCode}-${subscriberNumber}`
    }

    // Example usage
    const phoneNumber = generateRandomIndianPhoneNumber()
    console.log(phoneNumber)

    return {
      number,
      age,
      phoneNumber,
      date,
      time,
      name: `Student ${i + 1}`,
      location: `Location ${((i + 1) % 5) + 1}`,
    }
  })
}

class StudentTable extends Component {
  state = {
    students: generateDummyData(),
    searchTerm: '',
    pageNumber: 1,
    recordsPerPage: 20,
  }

  handleSearch = e => {
    this.setState({searchTerm: e.target.value, pageNumber: 1})
  }

  handlePrevPage = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(prevState => ({pageNumber: prevState.pageNumber - 1}))
    }
  }

  handleNextPage = () => {
    const {students, searchTerm, recordsPerPage, pageNumber} = this.state
    const filteredStudents = students.filter(
      student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const totalPages = Math.ceil(filteredStudents.length / recordsPerPage)

    if (pageNumber < totalPages) {
      this.setState(prevState => ({pageNumber: prevState.pageNumber + 1}))
    }
  }

  render() {
    const {searchTerm, pageNumber, recordsPerPage} = this.state
    const {students} = this.state
    const filteredStudents = students.filter(
      student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const paginatedStudents = filteredStudents.slice(
      (pageNumber - 1) * recordsPerPage,
      pageNumber * recordsPerPage,
    )

    return (
      <div className="student-table-container">
        <input
          type="text"
          value={searchTerm}
          onChange={this.handleSearch}
          placeholder="Search by name or location"
          className="search-input"
        />
        <table className="student-table">
          <thead>
            <tr>
              <th className="table-header">Sno</th>
              <th className="table-header">Customer Name</th>
              <th className="table-header">Age</th>
              <th className="table-header">Phone Number</th>
              <th className="table-header">Location</th>
              <th className="table-header">Created At</th>
              <th className="table-header">Time</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map(student => (
              <tr
                key={
                  student.date + student.time + student.name + student.location
                }
                className="table-row"
              >
                <td className="table-data">{student.number}</td>
                <td className="table-data">{student.name}</td>
                <td className="table-data">{student.age}</td>
                <td className="table-data">{student.phoneNumber}</td>
                <td className="table-data">{student.location}</td>
                <td className="table-data">{student.date}</td>
                <td className="table-data">{student.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={this.handlePrevPage}
          disabled={pageNumber === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={this.handleNextPage}
          disabled={
            pageNumber >= Math.ceil(filteredStudents.length / recordsPerPage)
          }
          className="pagination-button"
        >
          Next
        </button>
      </div>
    )
  }
}

export default StudentTable
