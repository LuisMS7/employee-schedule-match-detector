import Employee from "./Employee"

class Model{
	constructor(){
		this.employees = []
		this.matches = []
		this.documentLines = []
	}

	get _employees() {
		return this.employees
	}

	get _matches() {
		return this.matches
	}

	get _documentLines() {
		return this.documentLines
	}

	async getDocumentText(document, handler){
		const text = await document.text()
		this.documentLines = text.split("\n")
		this.employees = []
		for(const line of this._documentLines){
            if(line !==""){
                this.employees.push(new Employee(line))
            }
		}
		this.getScheduleCoincidences()
		handler()
	}

	getScheduleCoincidences() {
		this.matches = []
		for(let employeePivotIndex=0; employeePivotIndex < this._employees.length; employeePivotIndex++){
			for(let employeeToCompareIndex=employeePivotIndex+1; employeeToCompareIndex < this._employees.length; employeeToCompareIndex++){
				this.matches.push(this._employees[employeePivotIndex].compareEmployeesSchedule(this._employees[employeeToCompareIndex]))
			}
		}
	}
}

export default Model
