/* Your Code Here */

function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map((employeeData) => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const [hour, minutes] = time.split(":");
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const [hour, minutes] = time.split(":");
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find((event) => event.date === date);
    const timeOut = this.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate.call(this, date);
    }, 0);
    return totalWages;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeArray) {
    return employeeArray.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll,
  };
  
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

