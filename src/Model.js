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
			this.employees.push(new Employee(line))
		}
		this.getScheduleCoincidences()
		handler()
	}

	getScheduleCoincidences() {
		this.matches = []
		for(let i=0; i < this._employees.length; i++){
			for(let j=i+1; j < this._employees.length; j++){
				this.matches.push(this._employees[i].compareEmployeesSchedule(this._employees[j]))
			}
		}
	}
}

export default Model
