import './style.css';

class TaskObj {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const myTasksList = document.querySelector('.tasks-list');
/* eslint-disable max-classes-per-file: "error" */
class AddRemove {
  tasks = [];

  addTask(myTask) {
    this.tasks.push(myTask);
    this.#updateList(myTask);
  }

  removeTask(myTask) {
    this.tasks = this.tasks.filter((oneTask) => oneTask.description !== myTask.description);

    this.#updateList();
  }

  #updateList() {
    myTasksList.innerHTML = '';

    let TaskHtml = '';

    for (let i = 0; i < this.tasks.length; i += 1) {
      const taskItem = myTasksList.appendChild(document.createElement('li'));
      taskItem.classList.add('a-task');
      TaskHtml = `<input type="checkbox" id = "${this.tasks[i].completed} ${this.tasks[i].index}" name="task" id="my-task">
      <input type="text" id = ${i} class="li-description" value = "${this.tasks[i].description}" required> <i id = ${i} class="fa fa-trash remove-btn" aria-hidden="true"></i>`;
      taskItem.innerHTML = TaskHtml;

      this.tasks[i].index = i + 1;
      this.tasks[i].completed = false;
    }

    const removeBtn = document.querySelectorAll('.remove-btn');
    const inputValue = document.querySelectorAll('.li-description');

    inputValue.forEach((input, index) => {
      input.addEventListener('keyup', (e) => {
        if (e.target.value !== '') {
          this.tasks[index].description = e.target.value;
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      });
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    removeBtn.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.removeTask(this.tasks[event.target.id]);
      });
    });
  }
}
//----------------------------------------------------
const myUiTask = new AddRemove();
const inputBox = document.querySelector('.input-field');

inputBox.addEventListener('keyup', (event) => {
  if (event.keyCode == '13' && inputBox.value !== '') {
    const myDescription = inputBox.value;
    const NewTask = new TaskObj(myDescription);
    inputBox.value = '';
    myUiTask.addTask(NewTask);
  }
});

const localstoretasks = localStorage.getItem('tasks');
const TasksObjects = JSON.parse(localstoretasks);
if (TasksObjects !== null) {
  TasksObjects.forEach((myTask) => myUiTask.addTask(myTask));
}
