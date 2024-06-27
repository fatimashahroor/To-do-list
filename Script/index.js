let newtask=document.getElementById('pending')

let btn= document.getElementsByClassName("create")[0]
console.log(btn)
btn.addEventListener('click', addNewTask)
function addNewTask() {
    let ticket=document.createElement('div')
    ticket.classList.add('ticket');

    let titleInput = document.createElement('input')
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('placeholder', 'Task Title')
    titleInput.classList.add('title-input')

    let descriptionInput = document.createElement('textarea')
    descriptionInput.setAttribute('placeholder', 'Task Description')
    descriptionInput.classList.add('description-input')

    let markbtn=document.createElement('button')
    markbtn.textContent = 'Mark Complete'
    markbtn.classList.add('mark')

    let time = document.createElement('span')
    time.textContent = '12:00 PM, Today'
    ticket.appendChild(titleInput)
    ticket.appendChild(descriptionInput)
    ticket.appendChild(time)
    ticket.appendChild(markbtn)
    newtask.append(ticket)
}
