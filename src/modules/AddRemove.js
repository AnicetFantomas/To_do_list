const myTasksList = document.querySelector('.tasks-list');

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
        TaskHtml = `<input type="checkbox" class="checkbox" id = "${this.tasks[i].completed} " name="task" id="my-task">
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

      const getCheckBox = document.querySelectorAll('input[type=checkbox]');

      getCheckBox.forEach((element, id) => {
        element.addEventListener('change', () => {
          if (element.checked) {
            this.tasks[id].completed = true;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          } else {
            this.tasks[id].completed = false;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        });
      });

      const removeBtnAll = document.querySelector('.clear-all-btn');

      removeBtnAll.addEventListener('click', () => {
        this.tasks = this.tasks.filter((task) => task.completed == false);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.#updateList();
      });

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      removeBtn.forEach((button) => {
        button.addEventListener('click', (event) => {
          this.removeTask(this.tasks[event.target.id]);
        });
      });
    }
}

export default AddRemove;