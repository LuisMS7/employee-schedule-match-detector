import Employee from "../Employee"

const employeeString = "ASTRID=MO10:00-12:00"
const otherEmployeeString = "RENE=MO10:00-12:00"

test("should create a new employee", () => {
    const expectedEmployee = {name: "ASTRID", schedule: {MO: [{ start: "10:00", end: "12:00"}]}}
    const receivedEmployee = new Employee(employeeString)
    expect(receivedEmployee).toEqual(expectedEmployee)
})

test("should create a new employee and trim blank spaces", () => {
    const expectedEmployee = {name: "ASTRID", schedule: {MO: [{ start: "10:00", end: "12:00"}]}}
    const receivedEmployee = new Employee("ASTRID = MO 10:00 - 12:00 ")
    expect(receivedEmployee).toEqual(expectedEmployee)
})

test("should compare employees and matches 1", () => {
    const expectedComparison = {employeesPair: "ASTRID-RENE", matches: 1}
    const employee = new Employee(employeeString)
    const otherEmployee = new Employee(otherEmployeeString)
    const receivedComparison = employee.compareEmployeesSchedule(otherEmployee)
    expect(receivedComparison).toEqual(expectedComparison)
})

test("should compare employees and matches 0", () => {
    const expectedComparison = {employeesPair: "ASTRID-RENE", matches: 0}
    const employee = new Employee(employeeString)
    const otherEmployee = new Employee("RENE=TH10:00-12:00")
    const receivedComparison = employee.compareEmployeesSchedule(otherEmployee)
    expect(receivedComparison).toEqual(expectedComparison)
})
