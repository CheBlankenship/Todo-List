$(document).ready(function() {
  function updatelist(){
    $.get('/tasks', function(tasks){
      console.log(tasks[0].id);
      tasks.forEach(function(task) {
        if(task.done){
          $('#task-list').append('<li id='+ task.id +'><input type="checkbox" class="checkbox" checked="" >' + task.description + '</li>');
        }
        else{
          $('#task-list').append('<li id='+ task.id +'><input type="checkbox" class="checkbox">' + task.description + '</li>');
        }

      });
    });
  }
  updatelist();


  $('#form').submit(function(event) {
    event.preventDefault();
    var task = $('#new-task').val();
    var data = {
      task: task
    };
    console.log('data', data);
    $.post('/add_task', data, function(result) {
      console.log('Add task :', result);
    });
  });


  $('#task-list').on('click', '.checkbox', function() {
    console.log('checkbox click check');
    var $li = $(this).closest('li');
    var data = {
      id: $li.attr('id'),
      done: $(this).prop('checked')
    };
    $.post('/mark_task', data, function() {
      console.log('marked the task');
    });
  });

  $('#remove-completed').click( function() {
    $.get('/tasks', function(tasks) {
      tasks.forEach(function(task) {
        if(task.done){
            $('#' + 'task.id').remove();
        }
      });
    });
  });
});
