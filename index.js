const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "YOUR PASSWORD HERE",
  database: "employeeTracker_db"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  askQuestion();
});

function askQuestion() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add DEPARTMENT",
        "Add ROLE",
        "Add EMPLOYEE",
        "View DEPARTMENTS",
        "View ROLES",
        "View EMPLOYEES",
        "Update EMPLOYEE ROLE ID#",
        // "Delete employee",
        "Quit"
      ],
      message: "Make a Choice:",
      name: "option"
    })
    .then((result) => {
      console.log("You chose: " + result.option);

      switch (result.option) {
        case "Add DEPARTMENT":
          addDepartment();
          break;
        case "Add ROLE":
          addRole();
          break;
        case "Add EMPLOYEE":
          addEmployee();
          break;
        case "View DEPARTMENTS":
          viewDepartment();
          break;
        case "View ROLES":
          viewRoles();
          break;
        case "View EMPLOYEES":
          viewEmployees();
          break;
        case "Update EMPLOYEE ROLE ID#":
          updateEmployee();
          break;
          //DELETE not working
          // case "Delete employee":
          //   deleteEmployee();
          //   break;
        default:
          quit();
      }
    });
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "Name of New DEPARTMENT:",
    name: "deptName"
  }).then((answer) => {
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], (err, res) => {
      if (err) throw err;
      console.table(res)
      askQuestion()
    })
  })
}

function addRole() {
  inquirer
    .prompt([{
        type: "input",
        message: "Name of New ROLE:",
        name: "roleName"
      },
      {
        type: "input",
        message: "SALARY for New ROLE:",
        name: "salary"
      },
      {
        type: "input",
        message: "DEPARTMENT ID#:",
        name: "deptID"
      }
    ])
    .then((answer) => {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salary, answer.deptID], (err, res) => {
        if (err) throw err;
        console.table(res);
        askQuestion();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([{
        type: "input",
        message: "FIRST NAME:",
        name: "firstName"
      },
      {
        type: "input",
        message: "LAST NAME:",
        name: "lastName"
      },
      {
        type: "input",
        message: "EMPLOYEE ROLE ID#:",
        name: "roleID"
      },
      {
        type: "input",
        message: "MANAGER ID#:",
        name: "managerID"
      }
    ])
    .then((answer) => {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], (err, res) => {
        if (err) throw err;
        console.table(res);
        askQuestion();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([{
        type: "input",
        message: "EMPLOYEE to UPDATE (ENTER FIRST NAME):",
        name: "update"
      },
      {
        type: "input",
        message: "New ROLE ID #:",
        name: "updateRole"
      }
    ])
    .then((answer) => {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.update], (err, res) => {
        if (err) throw err;
        console.table(res);
        askQuestion();
      });
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    askQuestion();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    askQuestion();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    askQuestion();
  });
}

// Beginning work on DELETE statment, still not working.
// function deleteEmployee() {
//   connection.query("DELETE FROM employee WHERE id = ?", 1, (err, res) => {
//     if (error)
//       return console.error(error.message);

//     console.log('Deleted Row(s):', results.affectedRows);
//   });
// }

function quit() {
  connection.end();
  process.exit();
}