function countListLength() {
  const todoListEl = document.querySelector('#todo-list');
  const allItemCount = todoListEl.querySelectorAll('.todo-item').length;
  const todoItemCount = todoListEl.querySelectorAll('.todo-item:not(.completed)').length;
  const completedItemCount = todoListEl.querySelectorAll('.todo-item.completed').length;

  document.querySelector("#all-list-count").innerText = allItemCount;
  document.querySelector("#todo-list-count").innerText = todoItemCount;
  document.querySelector("#completed-list-count").innerText = completedItemCount;
}

function onClickCreateBtn() {
  let inputText = document.querySelector('#create-todo');
  // 입력한 텍스트 없을 땐 바로 종료
  if (!inputText.value) return;

  const template = document.querySelector('#todo-item-template');
  const todoListEl = document.querySelector('#todo-list');

  const newTodoItem = template.content.cloneNode(true);
  // 새로 만든 아이템에 텍스트 추가 및 이벤트 바인딩
  newTodoItem.querySelector('.todo-item-text').innerText = inputText.value;
  newTodoItem.querySelector('.toggle-btn').onclick = onClickToggleBtn;
  newTodoItem.querySelector('.delete-btn').onclick = onClickDeleteBtn;

  // 새로운 목록 생성 후 input 초기화
  inputText.value = '';

  todoListEl.appendChild(newTodoItem);
  countListLength();
}

function onClickDeleteBtn(e) {
  // 클릭한 버튼에서 가장 가까운 item을 찾아 요소 제거
  e.target.closest('.todo-item').remove();
  countListLength();
}

function onClickToggleBtn(e) {
  // 클릭한 버튼에서 가장 가까운 item을 찾아 토글 클래스 적용
  e.target.closest('.todo-item').classList.toggle('completed');
  countListLength();
}

function onClickTab(params) {
  const todoListEl = document.querySelector('#todo-list');
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach((el) => el.classList.remove('selected'))
  let selectedTab;

  // 각 상황에 따라 클래스, 선택된 탭 변경
  if (params === 'all') {
    todoListEl.classList.remove('show-todo');
    todoListEl.classList.remove('show-completed');
    selectedTab = document.querySelector('#all-list-tab')
  } else if (params === 'todo') {
    todoListEl.classList.add('show-todo');
    todoListEl.classList.remove('show-completed');
    selectedTab = document.querySelector('#todo-list-tab')
  } else if (params === 'completed') {
    todoListEl.classList.remove('show-todo');
    todoListEl.classList.add('show-completed');
    selectedTab = document.querySelector('#completed-list-tab')
  }

  selectedTab.classList.add('selected');
}

function onClickDateBtn() {
  const dateBtn = document.querySelector('#date-btn');
  const todoListEl = document.querySelector('#todo-list');

  dateBtn.classList.toggle('active')
  todoListEl.classList.toggle('show-date')
}

// btn event listening
document.querySelector('#create-todo-btn').addEventListener('click', onClickCreateBtn);
document.querySelectorAll('.toggle-btn').forEach(button => button.addEventListener('click', onClickToggleBtn));
document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', onClickDeleteBtn));
document.querySelector('.date-btn').addEventListener('click', onClickDateBtn);

// tab event listening
document.querySelector('#all-list-tab').addEventListener('click', () => onClickTab('all'));
document.querySelector('#todo-list-tab').addEventListener('click', () => onClickTab('todo'));
document.querySelector('#completed-list-tab').addEventListener('click', () => onClickTab('completed'));

// onload
countListLength();