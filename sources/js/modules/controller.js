export default class Controller {
  constructor(view, model) {
    this.model = model;
    this.view = view;
  }

  onAddTask(e) {
    e.preventDefault();
    let value = this.view.input.value;
    if (value.length >= 5) {
      this.taskCounter('increase');
      this.view.templateAdd(value, this.model.currentTaskId);
      this.view.clearInput();
      this.view.changeNumTask(this.model.currentTaskId);
    }
  }

  onWorksItems(e) {
    e.preventDefault();
    let item = e.target.parentNode,
      el = e.target,
      id = this.getItemId(item);

    if (el.classList.contains('todo__task_remove')) {
      this.onRemove(item, id);

    } else if (el.classList.contains('todo__task_text')) {
      this.onSuccess(item, id);
    }

  }

  onSuccess(el, id) {

    if (this.checkSuccessTask(id)) {
      this.view.addSuccess(el);
      this.model.successTasks.push(id);
    } else {
      this.view.removeSuccess(el);
      this.changeSuccessArr(id);
    }

    this.view.successTitle();
  }

  changeSuccessArr(id) {
    let index = this.model.successTasks.indexOf(id);
    this.model.successTasks.splice(index, id);
  }


  onRemove(item, id) {
    this.model.elementCash = item.cloneNode(true);
    this.taskCounter('remove');
    this.view.changeNumTask(this.model.currentTaskId);
    this.view.removeItem(item);
    this.view.successTitle();
    this.changeIdTasks(id);
  }

  checkSuccessTask(id) {
    if (this.model.successTasks.length > 0) {
      return !this.model.successTasks.some((el) => {
        return el === id;
      });
    } else {
      return true;
    }
  }

  changeIdTasks(currentId) {
    let that = this;
    let items = this.view.$app.querySelectorAll('.todo__task');

    if (items.length > 0) {
      items.forEach(function (el) {
        let id = +el.getAttribute('data-id');

        if (id >= currentId) {
          id--;
          el.setAttribute('data-id', id);
          that.view.changeSerialNumber(el, id);
        }
      });
    }
  }

  getItemId(el) {
    return el.getAttribute('data-id');
  }

  taskCounter(action) {
    if (action === 'increase') {
      this.model.currentTaskId++;
    } else {
      this.model.currentTaskId--;
    }
  }

  init() {
    this.view.onAddTask = this.onAddTask.bind(this);
    this.view.onWorksItems = this.onWorksItems.bind(this);
    this.view.insert();
  }

}
