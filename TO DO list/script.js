// seleçao de elementos
// input de enviar o formulario tarefa
const todoForm = document.querySelector('#todo-form') 
// input de pesquisa que vai receber tarefa
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editform = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')

let oldinputValue;

// funcs

// func pra recriar a div pra inserir o text no todo
const saveTodo = (text) =>{

    // criando a div
    const todo = document.createElement('div')
    todo.classList.add('todo')
    
    const todoTitle = document.createElement('h3')

    todoTitle.innerHTML = text
    todo.appendChild(todoTitle)

    // criando os botoes de criar deletar e editar
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML ='<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)


    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML ='<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)


    const deleteTodo = document.createElement('button')
    deleteTodo.classList.add('remove-todo')
    deleteTodo.innerHTML ='<i class="fa-solid fa-remove"></i>'
    todo.appendChild(deleteTodo)

    // incrementando nosso TODO create dentro do nosso todo com os bottoes
    todoList.appendChild(todo)

    todoInput.value = '';
    todoInput.focus()
}


// criar func que vai fazer sumir o input de adicionar tarefas e aparecer o de editar
const toggleForms = ()=>{
    editform.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')

}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo")


    todos.forEach((todo) => {

    let todoTitle = todo.querySelector('h3')

    if(todoTitle.innerText === oldinputValue){
        todoTitle.innerText = text

    }
    })
}


// events
// evento pra fazer o envio do form
todoForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)
        // salvar todo
    }
})


// evento pra selecionar o botao clicado e fazer algo
document.addEventListener('click', (e)=>{

    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText;
    }
// botao de finalizar
    if(targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done')
    }
    if(targetEl.classList.contains('edit-todo')) {
        toggleForms()
// salvando variavel pra depoisfazer a alteraçao
        editInput.value = todoTitle;
        oldinputValue = todoTitle;
    }
    if(targetEl.classList.contains('remove-todo')) {
        parentEl.remove()
    }
})

// colocando evento no botao de input pra cancelar açao de edit
cancelEditBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    toggleForms()
})

// evento pra trocar o valor da nossa lista em edit
editform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const editInputvalue = editInput.value

    if(editInputvalue){
        updateTodo(editInputvalue)
    }
    toggleForms()
})
