import View from "../View"

let view

test("should create and start project view", () => {
    document.body.innerHTML = "<div id='root'></div>"
    const createElementSpy = jest.spyOn(document, "createElement")
    view = new View()
    expect(createElementSpy).toHaveBeenCalledTimes(8)
    expect(createElementSpy.mock.calls[0][0]).toBe("h1")
    expect(createElementSpy.mock.calls[1][0]).toBe("form")
    expect(createElementSpy.mock.calls[2][0]).toBe("input")
    expect(createElementSpy.mock.calls[3][0]).toBe("button")
    expect(createElementSpy.mock.calls[4][0]).toBe("h3")
    expect(createElementSpy.mock.calls[5][0]).toBe("ul")
    expect(createElementSpy.mock.calls[6][0]).toBe("table")
    expect(createElementSpy.mock.calls[7][0]).toBe("h3")
})

test("should display schedule", () => {
    const schedule = ["RENE=MO10:00-12:00","ASTRID=MO10:00-12:00"]
    const scheduleList = view.getElement("ul")
    view.displaySchedules(schedule)
    expect(scheduleList.children.length).toBe(2)
    expect(scheduleList.children[0].textContent).toBe("RENE=MO10:00-12:00")
    expect(scheduleList.children[1].textContent).toBe("ASTRID=MO10:00-12:00")
})

test("should display matches", () => {
    const matches = [{employeesPair: "RENE-ASTRID", matches: 1}]
    const matchesTable = view.getElement("table")
    view.displayCoincidences(matches)
    expect(matchesTable.children.length).toBe(2)
    expect(matchesTable.children[0].children[0].textContent).toBe("Employees Pair")
    expect(matchesTable.children[0].children[1].textContent).toBe("Matches")
    expect(matchesTable.children[1].children[0].textContent).toBe("RENE-ASTRID")
    expect(matchesTable.children[1].children[1].textContent).toBe("1")
})
