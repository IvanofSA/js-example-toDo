export default class View {
  constructor(conf) {
    this.$app = conf.$app;
    this.onAddTask = null;
    this.onWorksItems = null;
    this.btn = this.$app.querySelector('.btn');
    this.input = this.$app.querySelector('.todo__input');
    this.list = this.$app.querySelector('.js-list-tasks');
    this.numTask = this.$app.querySelector('.js-info-all');
    this.score = this.$app.querySelector('.js-info-success');

    this.defaultTemplate = '<li data-id="{{id}}" class="todo__task">'
      + '<span class="todo__task_number">{{num}}</span>'
      + '<span class="todo__task_text">{{text}}</span>'
      + '<span class="todo__task_remove"></span>'
      +	'</li>';
  }
  templateAdd(text, id) {
    let template = this.defaultTemplate;
    template = template.replace('{{id}}', id);
    template = template.replace('{{num}}', id);
    template = template.replace('{{text}}', text);
    this.list.insertAdjacentHTML('beforeEnd', template);
    this.addEvent();

  }
  addEvent() {
    let items = this.$app.querySelectorAll('.todo__task');
    for(let i = 0; i < items.length; i++){
      items[i].addEventListener('click', this.onWorksItems);
    }
  }
  removeItem(item){
    this.list.removeChild(item);
  }
  clearInput() {
    this.input.value = '';
  }
  changeNumTask(id) {
    this.numTask.innerHTML = id;
  }
  successTitle(){
    let list = app.querySelectorAll('.success');
    this.score.innerHTML = '' + list.length;
  }
  addSuccess(el) {
    el.classList.add('success');
  }
  removeSuccess(el) {
    el.classList.remove('success');
  }
  changeSerialNumber(el, id) {
    let number = el.querySelector('.todo__task_number');
    number.innerHTML = id;
  }
  insert() {
    this.btn.addEventListener('click', this.onAddTask);
  }

}
