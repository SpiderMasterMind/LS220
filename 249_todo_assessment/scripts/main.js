// update main numberin blue
// make save retain current state of todo (currently it sets it as new)
// toggling doesnt work
var toDoList = {
  init: function() {
    this.mainItemsSource = $('#todo-item').html();
    this.mainItemsTemplate = Handlebars.compile(this.mainItemsSource);
    this.toDosSource = $('#nav-todos-template').html();
    this.completedSource = $('#completed-todos-template').html();
    this.initialiseStorage();
    this.refreshPage('all', 1);
    this.sortedAllToDosByDate;
    this.sortedCompletedByDate;
    this.sortedAllToDos;
    this.completedToDos;
    this.listType = 'all';
    this.itemClicked = 1;
  },
  refreshPage: function() {
    this.renderViewportItems();
    this.bindEvents();
  },
  initialiseStorage: function() {
    if (localStorage.getItem('todolist') === null) {
      localStorage.setItem('todolist', '[]');
    }
  },
  bindEvents: function() {
    // this var affects how the modal is invoked, new todo = undefined, todo id x = x
    var toDoIdForEdit;
    this.bindDeletions.call(this);
    this.bindToDoEdits();
    $('.main_table thead th').on('click', this.invokeModal.bind(this, toDoIdForEdit));
    $('.toggle').on('click', this.toggleCompletion.bind(this));
    $('nav dl').on('click', this.selectFromNav.bind(this));
  },
  bindToDoEdits: function() {
    $('.item').on('click', this.openTodo.bind(this));
  },
  bindDeletions: function() {
    $('.delete').on('click', this.deleteItem.bind(this));
  },
  renderViewportItems: function() {
    console.log(this.listType, this.itemClicked);
    var data = JSON.parse(localStorage.getItem('todolist'));
    this.markCompleteItems(data);
    this.renderNav(data); //
    this.setNavHighlight();
    this.renderMainTable(data);
  },
  renderMainTable: function(data) {
    if (this.listType === 'all' && this.itemClicked === 1) {
      $('.main_table tbody').html(this.mainItemsTemplate(data));
    } else if (this.listType === 'all') {
      // $('.main_table tbody').html(this.mainItemsTemplate(this.sortedAllToDosByDate[itemClicked - 1]));
    }
  },
  markCompleteItems: function(data) {
    $.each(data, function(index, obj) {
      var thisLabelElement = $('.main_table').find('input#' + obj.id).next();
      thisLabelElement.removeClass('completed');
      if (obj.completed === true) {
        thisLabelElement.addClass('completed');
      }
    });
  },
  setNavHighlight: function() {
    $('nav dl').removeClass('selection');
    if (this.listType === 'all') {
      $('.nav_todos').children('dl').eq(this.itemClicked - 1).addClass('selection')
    } else if (this.listType === 'completed') {
      $('.completed_todos').children('dl').eq(itemClicked - 1).addClass('selection')
    }
  },
  toggleCompletion: function(event) {
    console.log('toggling');
    event.stopImmediatePropagation();
    event.preventDefault();
    $(event.target).find('label').toggleClass('completed');
    var thisId = Number($(event.target).find('input').attr('id'));
    var collection = JSON.parse(localStorage.getItem('todolist'));
    var result = collection.map(function(obj) {
      if (obj.id === thisId) {
        obj.completed = !(obj.completed);
      }
      return obj;
    });
    localStorage.setItem('todolist', JSON.stringify(result));
    this.refreshPage();
  },
  deleteItem: function(event) {
    console.log('delete event');
    event.preventDefault();
    event.stopImmediatePropagation();
    var thisId = Number($(event.target).parents('tr').find('input').attr('id'));
    var collection = JSON.parse(localStorage.getItem('todolist'));
    var result = collection.filter(function(obj) {
      if (obj.id !== thisId) {
        return obj;
      }
    });
    localStorage.setItem('todolist', JSON.stringify(result));
    this.refreshPage(); // use this to retain place
  },
  openTodo: function(event) {
    console.log('open');
    event.preventDefault();
    event.stopImmediatePropagation();
    this.invokeModal(Number($(event.target).attr("for")));
  },
  invokeModal: function(todoId) {
    $('.background').fadeIn('slow');
    $('.background').css('background', 'rgba(0,0,0,0.5)');
    Object.create(Modal).init(todoId);
  },
  updateTotalItems: function(data) {
    $('#nav_todos_heading').next().text(data.length.toString());
  },
  selectFromNav: function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    //$(event.target).closest($('nav dl')).addClass('selection');

    if ($(event.target).closest($('div')).hasClass('completed_todos')) {
      this.displayFromCompletedList()
    } else {
      this.displayFromToDoList();
    }
  },
  displayFromToDoList: function() { // 'click'? (naming)
    this.itemClicked = $(event.target).closest($('dl')).index();
    this.listType = 'all';
    this.refreshPage();
  },
  displayFromCompletedList: function() {
    this.itemClicked = $(event.target).closest($('dl')).index();
    this.listType = 'completed';
    this.refreshPage();
  },
  renderNav: function(data) {
    var dataCompleted = [];
    data.forEach(function(obj) {
      if (obj.completed) {
        dataCompleted.push(obj);
      }
    });
    this.sortedAllToDos = this.sortDataByDate(data);
    debugger;
    this.sortedAllToDosByDate = this.convertToHbarsObj(this.sortedAllToDos);

    //[{date: "", count: ""}]
    //this.convertToHbarsObj(this.sortedAllToDos);

    this.completedTodos = this.sortDataByDate(dataCompleted);
    this.sortedCompletedByDate = this.convertToHbarsObj(this.completedTodos);
    //[{date: "", count: ""}]
    //this.convertToHbarsObj(this.completedTodos);

    this.populateNavItems(this.sortedAllToDosByDate, this.sortedCompletedByDate, data, dataCompleted);
  },
  sortDataByDate: function(data) {
    var result = [];
    var todos = [];
    var dates = [];
    data.forEach(function(obj) {
      if (dates.indexOf(obj.date) === -1) {
        dates.push(obj.date);
        todos.push([obj]);
      } else {
        todos.forEach(function(todoSet, index) { // otherwise we go through our todos (only 1)
          if (todoSet[0].date === obj.date) {
            todoSet.push(obj);
          }
        });
      }
    });
    result.push(dates, todos);
    result[1] = result[1][0];
    debugger;
    return result; 
  },
  convertToHbarsObj: function(data) {
    debugger;
    if (data[0].length === 0) {
      return [{date: "", count: ""}]
    }
    var result = [];
    for (var i = 0; i < data.length; i += 1) {
      var newObj = {};
      newObj["date"] = data[i][0];
      newObj["count"] = data[1].length;
      result.push(newObj);
    }
    return result;
  },
  populateNavItems: function(toDosObj, completedObj, data, dataCompleted) {
    this.populateToDos(toDosObj);
    this.populatedCompleteds(completedObj);
    this.updateCompletedTotal(dataCompleted);
    this.updateTotalItems(data);
  },
  populateToDos: function(toDosObj) {
    if (toDosObj.length === 0) {
      toDosObj = {test: "test"};
    }
    this.toDosTemplate = Handlebars.compile(this.toDosSource);
    $('.nav_todos').html(this.toDosTemplate(toDosObj));
  },
  populatedCompleteds: function(completedObj) {
    if (completedObj.length === 0) {
      completedObj = {test: "test"};
    };
    this.completedSourceTemplate = Handlebars.compile(this.completedSource);
    $('.completed_todos').html(this.completedSourceTemplate(completedObj));
  },
  updateCompletedTotal: function(dataCompleted) {
    $('#completed_todos_heading').next().text(dataCompleted.length.toString())
  },
};

var Modal = {
  init: function(todoId) {
    this.bindModalEvents(todoId);
    this.populateForm(todoId);
  },
  bindModalEvents: function(todoId) {
    $('.background').on('click', this.hideModal.bind(this));
    $('.form').click(function(event) {event.stopPropagation()});    
    $('#save').on('click', this.submitFormSave.bind(this, todoId));
    $('#complete').on('click', this.submitFormComplete.bind(this, todoId));
  },
  getNextId: function() {
    var data = JSON.parse(localStorage.getItem('todolist'));
    if (data.length === 0) { 
      return 1 
    } else {
      var data = JSON.parse(localStorage.getItem('todolist')).map(function(obj) {
        return obj.id;
      });
      return Math.max.apply(null, data) + 1;
    }
  },
  populateForm: function(todoId) {
    if (todoId) {
      var data = (JSON.parse(localStorage.getItem('todolist')));
      data = data.filter(function(todoObj) {
          return todoObj.id === todoId;
      })[0];
      this.setInputFields(data);
      $('#title').attr('placeholder', 'Item ' + todoId);
    } else if (todoId === undefined) {
      this.setInputFields();
      $('#title').attr('placeholder', 'Item ' + this.getNextId());
    }
  },
  setInputFields: function(data) {
    if (data) {
    $('#title').val(data.title);
      $('#day').val(data.day);
      $('#month').val(data.month);
      $('#year').val(data.year);
      $('#description').val(data.description);
    } else {
      $('#title').val('');
      $('#day').val('');
      $('#month').val('');
      $('#year').val('');
      $('#description').val('');
    }
  },
  submitFormSave: function(id, event) {
    console.log('save', id);
    event.preventDefault();
    event.stopImmediatePropagation();
    if (id) {
      this.updateInStorage(id);
    } else if (id === undefined) {
      this.createNewToDo();
    }

    this.hideModal();
  },
  submitFormComplete: function(id, event) {
    console.log('mark complete')
    event.preventDefault();
    event.stopImmediatePropagation();
    if (id === undefined) {
      alert("The ToDo must be created first!")
    } else {
      this.hideModal();
      this.setItemComplete(id);
    }
  },
  setItemComplete: function(id) {
    var thisId = id;
    var collection = JSON.parse(localStorage.getItem('todolist'));
    var result = collection.map(function(obj) {
      if (obj.id === thisId) {
        obj.completed = true;
      }
      return obj;
    });
    localStorage.setItem('todolist', JSON.stringify(result));
    this.hideModal();
  },
  updateInStorage: function(id) {
    var todo = $('form').serializeArray();
    var thisId = id;
    todo.push({
      name: "id",
      value: thisId,
    });
    var newToDo = Object.create(ToDo).init(todo);
    var collection = (JSON.parse(localStorage.getItem('todolist')));
    var result = collection.map(function(todo) { 
      if (todo.id !== thisId) {
        return todo;
      } else {
        return newToDo;
      }
    });
    localStorage.setItem('todolist', JSON.stringify(result));
  },
  createNewToDo: function() {
    var todo = $('form').serializeArray();
    var thisId = this.getNextId();
    todo.push({
      name: "id",
      value: thisId,
    });
    var newToDo = Object.create(ToDo).init(todo);
    var collection = (JSON.parse(localStorage.getItem('todolist')));
    collection.push(newToDo);
    localStorage.setItem('todolist', JSON.stringify(collection));
  },
  hideModal: function(event) {
    $('.background').fadeOut('fast');
    $('.background').css('background', 'rgba(0,0,0,0)');
    $('#save').off();
    $('#complete').off();
    toDoList.refreshPage();
  },
};

var ToDo = {
  init: function(parameters) {
    this.result = {};
    for (var i = 0; i < parameters.length; i += 1) {
      this.result[parameters[i].name] = parameters[i].value;
    }
    this.result.completed = false;
    this.result.date = this.fillMissingDate(this.result);
    return this.result;
  },
  fillMissingDate: function(todo) {
    if (todo.month !== "" && todo.year !== "") {
      return todo.month + '/' + todo.year.replace(/^\d\d/, '');
    } else {
      return "No Due Date";
    }
  },
};

$(function () {
  toDoList.init();
});