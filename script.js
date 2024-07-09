let $todoInput;
let $alertInfo;
let $addBtn;
let $ulList;
let $newTasks;
let $allTasks;
let $idNumber;
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $DeleteAllStorage


const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	Tasks();
}

const prepareDOMElements = () => {
	$todoInput = document.querySelector('.todoInput');
	$alertInfo = document.querySelector('.alert-info');
	$addBtn = document.querySelector('.addBtn');
	$ulList = document.querySelector('.tasks ul');
	$allTasks = document.getElementsByTagName('li');
	$popup = document.querySelector('.popUp');
	$popupInfo = document.querySelector('.popUpInfo');
	$popupInput = document.querySelector('.popUpInput');
	$addPopupBtn = document.querySelector('.popUpOk');
	$closeTodoBtn = document.querySelector('.popUpCancel');
	$DeleteAllStorage = document.querySelector('.btnDeletestorage');
}

const prepareDOMEvents = () => {
	$addBtn.addEventListener('click', addNewTask);
	$todoInput.addEventListener('keyup', enterCheck);
	$ulList.addEventListener('click', checkClick);
	$addPopupBtn.addEventListener('click', changeTodo);
	$closeTodoBtn.addEventListener('click', close);
	$DeleteAllStorage.addEventListener('click', DeleteAllLocalStorage);
}

const Tasks = () => {
	if(window.localStorage.length!=0){
		console.log("essa");
		for(let i=1; i<=localStorage.length; i++){
			console.log(window.localStorage.getItem(i));
			$newTask = document.createElement('li');
			$newTask.innerText = window.localStorage.getItem(i);
			$newTask.setAttribute('id', `todo-${i}`)
			$ulList.appendChild($newTask);
			createToolsArea();
		}

	}
	else {
		console.log("pusto!");
		$alertInfo.innerText = 'Brak zadań na liście!';
	}
}



const addNewTask = () => {
	if ($todoInput.value !== ''){
		const x = localStorage.length;
		$idNumber=x;
		$idNumber+=1;
		$newTask = document.createElement('li');
		$newTask.innerText = $todoInput.value;
		$newTask.setAttribute('id', `todo-${$idNumber}`)
		window.localStorage.setItem($idNumber, $newTask.innerText);
		console.log(x);
		$ulList.appendChild($newTask);
		$alertInfo.innerText = '';
		$todoInput.value='';
		createToolsArea();
	}
	else {
		$alertInfo.innerText = 'Wpisz treść zadania!';
	}
}

const createToolsArea = () => {
	
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	$newTask.appendChild(toolsPanel);
	
	const CompleteBtn = document.createElement('button');
	CompleteBtn.classList.add('complete');
	CompleteBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
	
	const EditBtn = document.createElement('button');
	EditBtn.classList.add('edit');
	EditBtn.innerHTML = 'EDIT'
	
	const DeleteBtn = document.createElement('button');
	DeleteBtn.classList.add('delete');
	DeleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
	
	toolsPanel.appendChild(CompleteBtn);
	toolsPanel.appendChild(EditBtn);
	toolsPanel.appendChild(DeleteBtn);
	
//	<div class="tools">
//		<button class="complete"><i class="fa-solid fa-check"></i></button>
//		<button class="edit">EDIT</button>
//		<button class="delete"><i class="fa-solid fa-xmark"></i></button>
//	</div>
				
}



const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.value==='complete'){
			
			e.target.closest('li').classList.toggle('completed');
			e.target.closest('button').classList.toggle('completed');
			
		} else if (e.target.classList.value==='edit') {
			editTask(e);
		} else if (e.target.closest('button').classList.value==='delete') {
			deleteTask(e);
		}
	}
}

const editTask = e => {
	const oldTodo = e.target.closest('li').id;
	$editedTodo = document.getElementById(oldTodo);
	$popupInput.value = $editedTodo.firstChild.textContent;
	
	$popup.style.display = 'flex';
}

const changeTodo = () => {
	if ($popupInput.value !==''){
		$editedTodo.firstChild.textContent=$popupInput.value;
		$popup.style.display = 'none';
		$popupInfo.innerText = '';
	}else {
		$popupInfo.innerText = 'Wpisz tekst!';
	}
}

const deleteTask = e => {
	deleteToDo = e.target.closest('li');
	deleteToDo.remove();
	
	const text = e.target.closest('li').id
	const newId = text.substring(5);
	window.localStorage.removeItem(newId);


	if (($allTasks.length === 0)){
		$alertInfo.innerText = 'Brak zadań na liście!';
		console.log(window.localStorage.length);
	}
}

const close = () => {
	$popup.style.display = 'none';
	$popupInfo.innerText = '';
	
}

const enterCheck = () => {
	if (event.code === 'Enter') {
		addNewTask();
	}
}

const DeleteAllLocalStorage = () => {
	window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', main); //Wczytanie całego html i css i dopiero potem JS