import { Blob } from 'blob-polyfill'
import Employee from "../Employee"
import Model from "../Model"

const model = new Model()
const documentMockTest = `RENE=MO10:00-12:00
ASTRID=MO10:00-12:00`
const mockBlob = new Blob([documentMockTest],  { type: "application/txt" })

test("should generate employees array when document text is gotten", () => {
    const expectedEmployees = [new Employee("RENE=MO10:00-12:00"), new Employee("ASTRID=MO10:00-12:00")]
    const mockHandler = jest.fn()
    return model.getDocumentText(mockBlob, mockHandler).then(() => {
        expect(model._employees).toEqual(expectedEmployees)
    })
})

test("should call handler once when document text is gotten", () => {
    const mockHandler = jest.fn()
    return model.getDocumentText(mockBlob, mockHandler).then(() => {
        expect(mockHandler).toHaveBeenCalledTimes(1)
    })
})

test("should call getScheduleCoincidences once when document text is gotten", () => {
    const mockHandler = jest.fn()
    const spyOn = jest.spyOn(model, 'getScheduleCoincidences')
    return model.getDocumentText(mockBlob, mockHandler).then(() => {
        expect(spyOn).toHaveBeenCalledTimes(1)
        spyOn.mockRestore()
    })
})

test("should generate matches array when document text is gotten", () => {
    const expectedMatches = [{employeesPair: "RENE-ASTRID", matches: 1}]
    const mockHandler = jest.fn()
    return model.getDocumentText(mockBlob, mockHandler).then(() => {
        expect(model._matches).toEqual(expectedMatches)
    })
})

test("should call compareEmployeesSchedule of first employee once", () => {
    const mockHandler = jest.fn()
    const spyOn = jest.spyOn(Employee.prototype, 'compareEmployeesSchedule')
    return model.getDocumentText(mockBlob, mockHandler).then(() => {   
        expect(spyOn).toHaveBeenCalledTimes(1)
        spyOn.mockRestore()
    })
})

test("should call compareEmployeesSchedule of second employee zero", () => {
    const mockHandler = jest.fn()
    return model.getDocumentText(mockBlob, mockHandler).then(() => {
        const secondEmployee = model._employees[1]
        const spyOn = jest.spyOn(secondEmployee, 'compareEmployeesSchedule')
        expect(spyOn).toHaveBeenCalledTimes(0)
        spyOn.mockRestore()
    })
})
