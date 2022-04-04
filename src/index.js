import './style.css';
import AddRemove from './modules/AddRemove';

class TaskObj {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

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



