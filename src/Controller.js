class Controller {
	constructor(model, view) {
		this.model = model
		this.view = view
		this.view.bindSubmitDocument(this.submitDocument.bind(this))
		this.onCoincidencesListChanged(this.model.getScheduleCoincidences())
	}

	onCoincidencesListChanged(coincidences) {
		this.view.displayCoincidences(coincidences)
	}

	submitDocument(document){
		this.model.getDocumentText(document, this.renderInformation.bind(this))
	}

	renderInformation(){
		this.view.displaySchedules(this.model._documentLines)
		this.view.displayCoincidences(this.model._matches)
	}
  
}

export default Controller
