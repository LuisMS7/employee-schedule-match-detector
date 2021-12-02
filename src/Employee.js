class Employee {
	constructor(employeeSchedule){
		this.name = employeeSchedule.split("=")[0].trim()
		this.getScheduleDictionary(employeeSchedule.split("=")[1])
	}

	getScheduleDictionary(scheduleString){
		const schedule = {}
		const scheduleCells = scheduleString.split(",")
		for(const scheduleCell of scheduleCells){
			const day = scheduleCell.trim().substr(0,2)
			const hours = scheduleCell.trim().slice(2).split("-")
			if(day in schedule){
				schedule[day] = schedule[day].push({
					start: hours[0].trim(),
					end: hours[1].trim(),
				})
			} else {
				schedule[day] = [{
					start: hours[0].trim(),
					end: hours[1].trim(),
				}]
			}
		}
		this.schedule =  schedule
	}

	get _name(){
		return this.name
	}

	get _schedule() {
		return this.schedule
	}

	compareEmployeesSchedule(employee){
		const thisEmployeeScheduleKeys = Object.keys(this._schedule)
		const employeeScheduleKeysSet = Object.keys(employee._schedule)
		const daysInCommon = thisEmployeeScheduleKeys.filter( day => employeeScheduleKeysSet.includes(day))
		let matches = 0
		for(const day of daysInCommon){
			for(const hour of this.schedule[day]){
				for(const otherHour of employee._schedule[day]){
					matches += (((hour.start < otherHour.end) && (hour.start >= otherHour.start)) || ((otherHour.start < hour.end) && (otherHour.start >= hour.start))) ? 1 : 0 
				}
			}
		}
		return {employeesPair: `${this.name}-${employee._name}`, matches: matches}
	}
}

export default Employee
