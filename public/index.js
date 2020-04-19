/*
JS code for
the To-Do SPA
*/

// .ready() used to wait till DOM loads
$(document).ready(function(){		
	$.getJSON('/api/todos')
	.done(showTodos)
	.fail(function(){
		alert("Something went wrong!");
	});

	$('#todoInput').keypress(function(event){
		// Checking if key Enter was pressed (Enter code: 13)
		if(event.which == 13){
			// create todo
			createTodo();
		}		
	});

	// Listener is added on the LIST since LI isn't generated in the starter DOM
	$('.list').on('click', 'li', function(){
		doneTodo($(this));
	});

	// Listening for a click on a SPAN inside of a LIST class
	// Works even for content generated dynamically
	$('.list').on('click', 'span', function(event){
		event.stopPropagation();		// Used to stop trigger in the previous function
		removeTodo($(this).parent());
	});
});

function showTodos(todos){
	// add all todos to the page
	todos.forEach(function(todo){
		showTodo(todo);
	});
};

function showTodo(todo){
	// adding a todo
	var newToDo = $('<li class="task">' + todo.name + " <span>X</span></li>");
	// jQuery method to store ID (hidden) in the Front End
	// The user won't be able to view the .data() content
	newToDo.data('id', todo._id);				// Storing MongoID asn an attribute for li
	newToDo.data('completed', todo.completed);	// Storing completed reference
	if(todo.completed){
		newToDo.addClass('done');
	}
	$('.list').append(newToDo);
};

function createTodo(){
	// send request to create new todo
	var userInput = $('#todoInput').val();	// Getting value from Form
	$.post('/api/todos', {
		name: userInput
	})
	.done(function(newToDo){		//newToDo is the object returned from the Database
		$('#todoInput').val('');	// Clearing Form
		showTodo(newToDo);
	})
	.fail(function(){
		console.log("ERROR")
	})
};

function removeTodo(todo){
    var clickedId = todo.data('id');
	var deleteUrl = '/api/todos/' + clickedId;
	$.ajax({
		method: 'DELETE',
		url: deleteUrl
	})
	.done(function(data){
		todo.remove(); // For removing content from the DOM but not the Database
	})
	.fail(function(err){
		console.log(err);
	})
};

// Used to check tasks completed
function doneTodo(todo){
	var clickedId = todo.data('id');
	var doneUrl = '/api/todos/' + clickedId;
	var isDone = !todo.data('completed');	// JQuery end completed or not
	var updateData = {completed: isDone};
	$.ajax({
		method: 'PUT',
		url: doneUrl,
		data: updateData
	})
	.done(function(updatedTodo){
		todo.toggleClass("done");
		todo.data('completed', isDone);
	})
	.fail(){
		alert("Checklisting item failed")
	}
};