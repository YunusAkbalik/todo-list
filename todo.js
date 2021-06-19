// Nesneleri tanımlama
const form = document.getElementById("todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector("ul")
const firstCardbody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
eventListeners()
function eventListeners() { // Tüm event listenerlar
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    secondCardBody.addEventListener("click", deleteTodo)
    filter.addEventListener("keyup", filterTodos)
}
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase()
    const listItems = document.querySelectorAll("li")
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase()
        if (text.indexOf(filterValue) === -1) { // Eğer içinde geçiyorsa 0 geçmiyorsa -1 döndürüyor indexof
            //Bulamadı
            listItem.setAttribute("style", "display : none !important")
        }
        else {
            listItem.setAttribute("style", "display : block")
        }
    })
}
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showalert("info", "Silme işlemi başarılı")
    }
    if (e.target.id === "clear-todos") { // Tüm taskları temizle butonu tetikleme
        if (confirm("Tüm todoları silmek istediğinize emin misiniz ?")) {
            let check = document.querySelectorAll("li")
            if (check.length >= 1) {
                document.querySelectorAll("li").forEach(function (e) { // tüm li etiketlerin seçimi
                    localStorage.removeItem("todos")
                    e.remove()
                })
                showalert("success", "Tüm Todolar başarıyla silindi")
            }
            else {
                showalert("danger", "Silinecek bir todo bulunamadı.")
            }
        }
    }
}
function deleteTodoFromStorage(todo) {
    let todos = getTodosFromStorage()
    todos.forEach(function (e, index) {
        if (e === todo) {
            todos.splice(index, 1) // Arrayden değeri sil
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage()
    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim()
    if (newTodo === "") {
        showalert("danger", "Lütfen bir todo girin...")
    }
    else {
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
        showalert("success", "Başarıyla eklendi")
    }
    e.preventDefault()
}
function getTodosFromStorage() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}
// Alert oluşturma 
function showalert(type, message) {
    var alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.setAttribute("role", "alert")
    alert.textContent = message
    firstCardbody.appendChild(alert)
    setTimeout(function () {
        alert.remove()
    }, 1000)
}
// Storage'e aktarma
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
// Arayüze ekleme
function addTodoToUI(newTodo) {
    const newItem = document.createElement("li")
    const link = document.createElement("a")
    const x = document.createElement("i")
    x.className = "fa fa-remove"
    link.href = "#"
    link.className = "delete-item"
    newItem.className = "list-group-item d-flex justify-content-between"
    link.appendChild(x)
    newItem.appendChild(document.createTextNode(newTodo))
    newItem.appendChild(link)
    // Todo List'e Item'ı ekleme
    todoList.appendChild(newItem)
    todoInput.value = ""
}
