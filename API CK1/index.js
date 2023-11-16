

let storage = localStorage
sessionStorage.clear()

function getStorage(event) {
  if (event.target.value === 'session') {
    sessionStorage.clear()
    storage = sessionStorage
  } else {
    storage = localStorage
  }
  updateTable()
}

document.querySelector('#storage').addEventListener('change', (event) => {
    getStorage(event)
    location.reload()
})



function updateTable() {
    const tbody = document.querySelector('.tbody')
    for (let i of Object.entries(storage)) {
        const key = storage.key(i);
        if (key) {
            let tr = document.createElement('tr');
            let tdKey = document.createElement('td');
            let tdValue = document.createElement('td');
            let tdDelete = document.createElement('td');
            tdKey.innerText = i[0]
            tdValue.innerText = i[1]
            tdDelete.innerText = 'x'
            tdKey.className = 'td'
            tdValue.className = 'td'
            tdDelete.className = 'btnDelete'
            tbody.append(tr)
            tr.append(tdKey, tdValue, tdDelete)
        }
    }
}


const btnAdd = document.querySelector('.btnAdd')
const input = document.querySelectorAll('.input')
function saveItem() {
    const data = [];
    input.forEach(elem => {
        data.push(elem.value);
    })
    storage.setItem(data[0], data[1])
    location.reload()
    updateTable()
}
btnAdd.addEventListener('click', saveItem)


const btnDelete = document.querySelectorAll('.btnDelete')
btnDelete.forEach(elem => {
    elem.addEventListener('click', function deleteItem() {
        if (confirm('Вы точно хотите очистить хранилище?')) {
            let keyStorage = elem.parentNode.firstChild.textContent
            storage.removeItem(keyStorage)
            elem.parentNode.remove()
        }
    })
    
})


function clearStorage() {
    if (confirm('Вы точно хотите очистить хранилище?')) {
        storage.clear()
    }
    location.reload()
}

const btnClean = document.querySelector('.btnClean')
btnClean.addEventListener('click', clearStorage)
updateTable()