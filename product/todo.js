const renderTodo = () => {
  let todos = '';
  for (let i = 0; i< todolist.length; i++){
    const {time, task, done} = todolist[i];
    todos += `
        <li class="list-group-item todoItem" data-id="${i}">
          <span class="taskTime">${formatTodoDate(new Date(time))}</span><br>
          <span style="color:navy;" class="fas ${done?'fa-check-square':'fa-square'} fa-fw "></span> <span class="${done?'done':''}">${task}</span>
        </li>`;
  }
  $('#mytodolist').html(todos);
}

$('#newTask').on('submit', function(e){
  e.preventDefault();
  const T = $('#taskDate').val();
  const task = $('#task').val();
  if(T||task){
    todolist.push({
      time : T,
      task : task,
      done : false,
    });
    $('#taskDate').val("");
    $('#task').val("");
    renderTodo();
  }
});

$('#mytodolist').on('click', '.todoItem', function(){
  const id= $(this).data('id');
  const done = todolist[id].done;
  const newToDo = {
    time : todolist[id].time,
    task : todolist[id].task,
    done : !done,
  }
  todolist.splice(id,1,newToDo);
  renderTodo();
  //console.log(newToDo);
});
