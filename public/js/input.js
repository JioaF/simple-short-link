let editButton = document.getElementsByClassName('edit-button');
let modalBox = document.getElementById('edit-modal');
let formInputId = modalBox.getElementsByClassName('link-id');
//let dataId = editButton.getAttribute("data-id");
console.log(editButton)

for (let i = 0; i < editButton.length; i++){
    console.log(editButton.item(i));
    editButton.item(i).addEventListener('click', function () {
        formInputId[0].value = this.attributes['data-id'].value;
        console.log(formInputId);
    })
}

