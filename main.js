const API = "http://localhost:8000/book";
const main = document.querySelector(".main");

const namei = document.querySelector("#inputName");
const sname = document.querySelector("#inputSname");
const mail = document.querySelector("#inputMail");
const phone = document.querySelector("#inputPhone");
const editModal = document.querySelector("#edit-modal");
const closeModal = document.querySelector("#close-modal");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector("#edit-submit");
const editName = document.querySelector("#editName");
const editSname = document.querySelector("#editSname");
const editMail = document.querySelector("#editMail");
const editPhone = document.querySelector("#editPhone");

const addBtn = document.querySelector(".addBtn");

getProducts();

async function getProducts() {
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

async function addCard(card) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(card),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getProducts();
}
async function deleteCard(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  getProducts();
}

async function getOneCard(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}
async function editCard(id, editedCard) {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedCard),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getProducts();
}

function render(arr) {
  main.innerHTML = "";
  arr.forEach((item) => {
    main.innerHTML += `<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <p class="title">${item.name} ${item.sname}</p>
            <p>${item.phone}</p>
        </div>
        <div class="flip-card-back">
            <p class="title">${item.email}</p>
            <button id="${item.id}" class= "btn-delete">DELETE</button>
            <button id="${item.id}" class= "btn-edit">EDIT</button>
        </div>
    </div>
</div>`;
  });
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    deleteCard(e.target.id);
  }
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !namei.value.trim() ||
    !sname.value.trim() ||
    !mail.value.trim() ||
    !phone.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  const card = {
    name: namei.value,
    sname: sname.value,
    email: mail.value,
    phone: phone.value,
  };
  addCard(card);

  namei.value = "";
  sname.value = "";
  mail.value = "";
  phone.value = "";
});

let id = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-edit")) {
    id = e.target.id;
    editModal.style.visibility = "visible";

    const card = await getOneCard(e.target.id);

    editName.value = card.name;
    editSname.value = card.sname;
    editMail.value = card.email;
    editPhone.value = card.phone;
  }
});

editSubmit.addEventListener("click", () => {
  if (
    !editName.value.trim() ||
    !editSname.value.trim() ||
    !editMail.value.trim() ||
    !editPhone.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  const editedCard = {
    name: editName.value,
    sname: editSname.value,
    email: editMail.value,
    phonel: editPhone.value,
  };
  //? вызываем функцию для изменения
  editCard(id, editedCard);
});

function modalClose() {
  editModal.style.visibility = "hidden";
  editName.value = "";
  editSname.value = "";
  editMail.value = "";
  editPhone.value = "";
}
closeModal.addEventListener("click", modalClose);
editCancel.addEventListener("click", modalClose);

editSubmit.addEventListener("click", () => {
  if (
    !editName.value.trim() ||
    !editSname.value.trim() ||
    !editMail.value.trim() ||
    !editPhone.value.trim()
  ) {
    return;
  }

  modalClose();
  editCard(id, editedCard);
  render();
});
