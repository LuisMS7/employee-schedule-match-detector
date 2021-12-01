class View {
	constructor(){
		this.app = this.getElement("#root")
		this.title = this.createElement("h1")
		this.title.textContent = "Schedule matches"
		this.form = this.createElement("form")
		this.input = this.createElement("input")
		this.input.type = "file"
		this.input.accept = ".txt"
		this.input.placeholder = "Submit txt"
		this.input.name = "document"
		this.submitButton = this.createElement("button")
		this.submitButton.textContent = "Submit"
		this.scheduleTitle = this.createElement("h3")
		this.schedule = this.createElement("ul", "schedule")
		this.matches = this.createElement("table")
		this.matchesTitle = this.createElement("h3")
		this.form.append(this.input, this.submitButton)
		this.app.append(this.title, this.form, this.scheduleTitle, this.schedule, this.matchesTitle, this.matches)
	}

	get _document() {
		return this.input.files[0]
	}

	displaySchedules(schedule){
		while (this.schedule.firstChild) {
			this.schedule.removeChild(this.schedule.firstChild)
		}
		if (schedule.length !== 0) {
			this.scheduleTitle.textContent = "Employees' schedule"
			schedule.forEach(scheduleItem => {
				const li = this.createElement("li")
				const p = this.createElement("p")
				p.textContent = scheduleItem
				li.append(p)
				this.schedule.append(li)
			})
		} 
	}

	displayCoincidences(matches){
		while (this.matches.firstChild) {
			this.matches.removeChild(this.matches.firstChild)
		}
		if (matches && matches.length !== 0) {
			this.matchesTitle.textContent = "Matches"
			this.matches.border = 1
			const header = this.createElement("tr")
			const employeesPairTitle = this.createElement("th")
			employeesPairTitle.textContent = "Employees Pair"
			const matchesTitle = this.createElement("th")
			matchesTitle.textContent = "Matches"
			header.append(employeesPairTitle, matchesTitle)
			this.matches.append(header)
			matches.forEach(coincidence => {
				const row = this.createElement("tr")
				const pair = this.createElement("td")
				pair.textContent = coincidence.employeesPair
				const matches = this.createElement("td")
				matches.textContent = coincidence.matches
				row.append(pair, matches)
				this.matches.append(row)
			})
		} 
	}

	bindSubmitDocument(handler) {
		this.form.addEventListener("submit", event => {
			event.preventDefault()
			if (this._document) {
				handler(this._document)
			}
		})
	}

	createElement(tag, className) {
		const element = document.createElement(tag)
		if (className) element.classList.add(className)
		return element
	}
    
	getElement(selector) {
		const element = document.querySelector(selector)
		return element
	}
}

export default View
