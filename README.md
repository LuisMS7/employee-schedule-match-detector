# Scheduler matches

## Prerequisites
- Install https://github.com/creationix/nvm
- Node 13.13.0

## Initial setup
1. In the root folder of the project, once nvm is installed, run `nvm install v13.13.0`
2. In the root folder of the project, run  `npm install`
3. In the root folder of the project, run `npm start`
4. For run the tests, in the root folder of the project run `npm test`

## Project
The app presents a form where the user can upload a txt document with the work schedules of the employees. When the submit button is clicked, the app prints the schedules of each employee and a table with the number of matches of each employee pair.

## Architecture
The project follows MVC and OOP patterns. The scripts of the projects are:
- Employee: the class that represents an employee. It has two attributes: name and schedule. In the constructor, it is passed a string with the information of its attributes (represents a line of the uploaded document). Then, the data is processed for obtain its name and schedule. In this class is defined a comparison method for compare two employees schedules that returns an object with the employees pair   and the number of matches in their schedules.
- Model: it contains the data of the app: the employees and the matches. Here the user uploaded document is passed in for processing to get the employees and then the matches.
- View: it is in charge of rendering the app according to the data of the model. It also captures the document uploaded by the user and passes it to the model. It has two main methods: displaySchedules that renders a list with the lines of the documents and displayCoincidences that renders a table with the schedule matches.
- Controller: it is in charge of connect the model and the view.

![C4 Diagrama](/diagram.png)

## Approach
To compare two schedules it is used the method `compareEmployeesSchedule` of the Employee class. First, it checks the days that the two employees works together. To do this, it obtains the keys of each schedule (the schedule is an object with days as attributes) and finds the keys that are equal in both schedule. Then, for each day in common, it checks that the entry hour of the first employee is between the working hours of the second employee and vice versa. It is important to note that each day may contains more than one pair of work hours so each day has an array of work hours and each pair is compare to another pair of another array of work hours. If one of the above conditions is true, the number of matches increase by one. Finally, the method returns an object with the name of the employee pair and the number of matches.

To obtain the matches from the document it is used first the method `getDocumentText` where the document is read and the text is spit at each line break. Then, it verifies that the line is not empty, proceeds to create an employee with the text of the line and adds it to the array of employees. Finally, calls the method `getScheduleCoincidences` for get the schedule matches of each employee in the array. For this, it uses a double loop *for* which compares the schedules for the first element in the array to the schedules of the other employees, then goes on to use the second employee as the pivot employee to compare and continues like this until the ends of the array.
