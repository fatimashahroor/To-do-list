let newtask=document.getElementById('pending')
let done=document.getElementById('completed')
let past=document.getElementById('past-due')

function markComplete(refreshbtn,ticket,markbtn) {
    done.append(ticket)
    ticket.classList.toggle('complete')
    markbtn.textContent = 'Completed'
    if (refreshbtn) {
        refreshbtn.removeEventListener('click', updateTime)
        refreshbtn.disabled= true
    }
    let assignBtn = ticket.querySelector('.assign')
    let assignTo = ticket.querySelector ('.assign-to')
    if (assignBtn) {
        assignBtn.remove()
        assignTo.remove()
    }
}

function updateTime(dueInput) {
    let now = new Date()
    document.querySelectorAll('.ticket').forEach(ticket =>{
        let timeSpan = ticket.querySelector('.time-span')
        let dueTime = new Date(ticket.dataset.dueTime)
 
        if (dueInput && !ticket.classList.contains('complete') && now>= dueTime) {
            past.appendChild(ticket)
        }
        let hours = now.getHours()
        let minutes = now.getMinutes().toString().padStart(2, '0')
        let period = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12
        let time = `${hours}:${minutes} ${period}`

        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, '0')
        let day = now.getDate().toString().padStart(2, '0')
        let date = `${month}-${day}-${year}`
        if (timeSpan) {
            timeSpan.textContent = `${date} / ${time}`
        }
    })
}

updateTime()
setInterval(updateTime, 1000)

let btn= document.getElementsByClassName("create")[0]
btn.addEventListener('click', addNewTask)

function addNewTask() {
    let ticket=document.createElement('div')
    ticket.classList.add('ticket')
    
    let dueTime = new Date()
    ticket.setAttribute('data-due-time', dueTime.toISOString())

    let titleInput = document.createElement('input')
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('placeholder', 'Task Title')
    titleInput.classList.add('title-input')

    let descriptionInput = document.createElement('textarea')
    descriptionInput.setAttribute('placeholder', 'Task Description')
    descriptionInput.classList.add('description-input')

    let refreshbtn = document.createElement('button')
    refreshbtn.textContent = 'refresh'
    refreshbtn.classList.add('refresh')
    refreshbtn.addEventListener('click', updateTime)

    let markbtn=document.createElement('button')
    markbtn.textContent = 'Mark Complete'
    markbtn.classList.add('mark')

    let dueInput = document.createElement('input')
    dueInput.setAttribute('type', 'datetime-local')
    dueInput.classList.add('due-input')

    let timeSpan = document.createElement('span')
    timeSpan.classList.add('time-span')

    let taskInfo = document.createElement('div')
    taskInfo.classList.add('task-info')
    taskInfo.appendChild(timeSpan)
    taskInfo.appendChild(refreshbtn)

    let assignBtn = document.createElement('button')
    assignBtn.textContent = 'Assign Task'
    assignBtn.classList.add('assign')
    assignBtn.addEventListener('click', function() {
        let assignTo=document.createElement('input')
        assignTo.setAttribute('type', 'email')
        assignTo.setAttribute('placeholder', 'Enter user(s) email(s)')
        assignTo.classList.add('assign-to')
        ticket.appendChild(assignTo)
    })
    

    ticket.appendChild(titleInput)
    ticket.appendChild(descriptionInput)
    ticket.appendChild(dueInput)
    ticket.appendChild(taskInfo)
    ticket.appendChild(markbtn)   
    newtask.append(ticket)
    ticket.appendChild(assignBtn)
    
    markbtn.addEventListener('click', function() {
    markComplete (refreshbtn,ticket,markbtn)
})
}
