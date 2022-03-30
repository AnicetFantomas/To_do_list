import './style.css';

const tasks = [
  {
    description: 'My project',
    completed: true,
    index: 1,
  },
  {
    description: 'wash dish',
    completed: true,
    index: 2,
  },
  {
    description: 'go to gym',
    completed: true,
    index: 3,
  },
];

const myTasksList = document.querySelector('.tasks-list');

tasks.forEach((element) => {
  myTasksList.innerHTML += `<li><input type="checkbox" name="task" id="my-task">
                             <label for="task">${element.description}</label></li>`;
});
