const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const formElement = $(".todo__form");
const addBtn = $(".todo__btn");
const completedBtn = $(".completed");
const uncompletedBtn = $(".uncompleted");
const inputElement = $(".todo__input");
const listItem = $(".todo__list");
const optionItem = $$(".todo__option");
const category = $("select");

const initList = JSON.parse(localStorage.getItem("list")) || [];

const renderList = (filter = false) => {
  const html = initList.map(
    (item, idx) => `
    <div class="todo__box todo__box--${idx} ${item.completed ? "faded" : ""}">
          <li class="todo__item">${item.todo}</li>
          <button class="completed" onclick="completeTodo(${idx})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="todo__icon icon-uncomplete"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <button class="uncompleted" onclick="deleteItem(${idx})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="todo__icon icon-complete"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
  `
  );
  listItem.innerHTML = html.join("");
};

document.addEventListener("DOMContentLoaded", renderList);

const resetInput = () => {
  inputElement.value = "";
  inputElement.blur();
};

const deleteItem = (idx) => {
  const item = $(`.todo__box--${idx}`);
  item.classList.add("removed");
  item.addEventListener("transitionend", () => {
    item.remove();
  });
  initList.splice(idx, 1);
  localStorage.setItem("list", JSON.stringify(initList));
};

const completeTodo = (idx) => {
  const item = $(`.todo__box--${idx}`);
  console.log(item);
  initList[idx].completed
    ? (initList[idx].completed = false)
    : (initList[idx].completed = true);
  localStorage.setItem("list", JSON.stringify(initList));
  item.classList.toggle("faded");
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputElement.value.length) return;

  const newItem = document.createElement("div");
  const className = `todo__box todo__box--${initList.length}`;
  newItem.setAttribute("class", className);
  newItem.innerHTML = `
  <li class="todo__item">${inputElement.value}</li>
  <button class="completed" onclick="completeTodo(${initList.length})">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="todo__icon icon-uncomplete"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </button>
  <button class="uncompleted" onclick="deleteItem(${initList.length})">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="todo__icon icon-complete"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </button>
  `;
  initList.push({
    todo: inputElement.value,
    completed: false,
  });
  listItem.insertAdjacentElement("beforeend", newItem);
  localStorage.setItem("list", JSON.stringify(initList));
  resetInput();
});

console.log(optionItem);

category.addEventListener("click", (e) => {
  const items = listItem.children;

  console.log(items[0].classList.contains("faded"));
  for (const item of items) {
    switch (e.target.value) {
      case "All":
        item.style.display = "flex";
        break;
      case "Completed":
        if (item.classList.contains("faded")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "Uncompleted":
        if (item.classList.contains("faded")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      default:
        break;
    }
  }
});
