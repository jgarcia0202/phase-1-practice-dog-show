const dogURL = 'http://localhost:3000/dogs'
const dogTable = document.querySelector('#table-body')
const editForm = document.querySelector('#dog-form')
editName = editForm.name
editBreed = editForm.breed
editSex = editForm.sex

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})
function fetchDogs() {
    fetch(dogURL)
    .then(response => response.json())
    .then(dogs => dogs.forEach(dog => addDog(dog)))
}
function addDog(dog) {
    let editButton = document.createElement('button')
    editButton.textContent = ' Edit Dog '
    var row = dogTable.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2)
    cell1.innerHTML = `${dog.name}`;
    cell2.innerHTML = `${dog.breed}`;
    cell3.innerHTML = `${dog.sex}`
    row.appendChild(editButton)
    editButton.addEventListener('click', e => {
        editName.value = dog.name
        editBreed.value = dog.breed
        editSex.value = dog.sex
        editForm.addEventListener('submit', e => {
            e.preventDefault()
            fetch(dogURL+`/${dog.id}`,{
                method: 'PATCH',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    'name': editName.value,
                    'breed': editBreed.value,
                    'sex':editSex.value
                })
            })
            .then(response => response.json())
            .then(dogs => console.log(dogs))
        })
    })
}