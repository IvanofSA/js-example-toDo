let app = document.getElementById('app'),
  btn = app.querySelector('.btn');


btn.addEventListener('click', addTask);


let tasks = {
  success: [],
  currentSuccess: 0,
  allTasks: 0

};

let data = {
  currentNum: 0,
  resultTask: 0,
  successTask: 0,
  successTasks: []
};

function addTask(e) {
  e.preventDefault();
  let input = app.querySelector('.todo__input'),
    list = app.querySelector('.js-list-tasks');

  if (input.value.length >= 5) {
    renderItem(list, 'li', input.value, 'todo__task');
    input.value = '';
  }
}






function changeAll(type, id) {
  if (type == 'remove') {
    data.resultTask--;
    checktask(id);
    let index = data.successTasks.indexOf(id);
    data.successTasks.splice(index, id);
    checkSuccessNum();
  } else {
    data.resultTask++;
  }

  let resultHtml = app.querySelector('.js-info-all');
  resultHtml.innerHTML = '' + data.resultTask;
}


function renderItem(parentEl, tagEl, textEl, classEl) {
  data.currentNum++;

  let task = document.createElement(tagEl),

    text = document.createElement('span'),
    removeBtn = document.createElement('span'),
    number = document.createElement('span');

  task.setAttribute('class', classEl);
  task.setAttribute('data-id', data.currentNum);
  removeBtn.setAttribute('class', classEl + '_remove');
  number.setAttribute('class', classEl + '_number');
  text.setAttribute('class', classEl + '_text');

  removeBtn.innerHTML = 'x';
  number.innerHTML = data.currentNum;
  text.innerHTML = textEl;


  task.appendChild(number);
  task.appendChild(text);
  task.appendChild(removeBtn);
  parentEl.appendChild(task);
  changeAll();
}

app.addEventListener('click', function (e) {

  if (e.target.classList.contains('todo__task_remove')) {
    let id = e.target.parentNode.getAttribute('data-id');
    e.target.parentNode.remove();
    data.currentNum--;
    changeAll('remove', id);

  } else if (e.target.classList.contains('todo__task')) {
    let id = e.target.getAttribute('data-id');
    successTask(e.target, id);
  }

});
//ToDO чисть массив с success при удалении елемента

function successTask(el, id) {
  console.log(data.successTasks);
  if (checkSuccess(id)) {
    el.classList.add('success');
    data.successTask++;
    data.successTasks.push(id);

    checkSuccessNum();

  } else {
    data.successTask--;
    el.classList.remove('success');
    id = '' + id;
    let index = data.successTasks.indexOf(id);
    data.successTasks.splice(index, id);
    checkSuccessNum();
  }
}




function checkSuccessNum() {
  let list = app.querySelectorAll('.success');
  let score = app.querySelector('.js-info-success');
  score.innerHTML = '' + list.length;
}



//ToDO При удалении елмента удалять и из data.successTasks!!!!

function checkSuccess(id) {
  if (data.successTasks.length > 0) {
    return !data.successTasks.some((el)=>{
      return el === id;
    });
  } else {
    return true;
  }
}


function checktask(removeId) {
  let taskList = app.querySelectorAll('.todo__task');

  if (taskList.length > 0) {
    taskList.forEach(function (el) {
      let id = +el.getAttribute('data-id');
      if (id >= removeId) {
        id--;
        el.setAttribute('data-id', id);
        number(el, id);
      }
    });
  }
}

function number(el, id) {
  let number = el.querySelector('.todo__task_number');
  number.innerHTML = id;
}
