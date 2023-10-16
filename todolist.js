const readline = require('readline');
const fs = require('fs');

class TodoList {
  constructor() {
    this.tasks = [];
  }

  AddTask(task) {
    this.tasks.push(task);
  }

  UpdateTask(index, task) {
    this.tasks[index] = task;
  }

  DeleteTask(index) {
    this.tasks.splice(index, 1);
  }

  listTasks() {
    for (let i = 0; i < this.tasks.length; i++) {
      console.log(`${i + 1}. ${this.tasks[i]}`);
    }
  }

  saveTasks() {
    fs.writeFileSync('todo-list.json', JSON.stringify(this.tasks));
  }

  loadTasks() {
    try {
      this.tasks = JSON.parse(fs.readFileSync('todo-list.json'));
    } catch (error) {
      this.tasks = [];
    }
  }
}

const todoList = new TodoList();


todoList.loadTasks();


const reaquestl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reaquestl.question('dooro midka aad doontid ? (ADD UPDATE DELETE LIST ): ', (answer) => {
  switch (answer) {
    case 'ADD':
      reaquestl.question('Enter a new  : ', (task) => {
        todoList.AddTask(task);
        todoList.saveTasks();
        console.log('You added successfully!');
        reaquestl.close();
      });
      break;
    case 'UPDATE':
      reaquestl.question('soo gali index of  update: ', (index) => {
        reaquestl.question('Enter the new : ', (task) => {
          todoList.UpdateTask(index, task);
          todoList.saveTasks();
          console.log(' You updated successfully!');
          reaquestl.close();
        });
      });
      break;
    case 'DELETE':
      reaquestl.question('soo gali index of  delete: ', (index) => {
        todoList.DeleteTask(index);
        todoList.saveTasks();
        console.log('You deleted successfully!');
        reaquestl.close();
      });
      break;
    case 'LIST':
      todoList.listTasks();
      reaquestl.close();
      break;
    default:
      console.log('Invalid option!');
      reaquestl.close();
  }
});