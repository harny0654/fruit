let userSelected = null;

function Read() {
    let data = {};
    data["txtName"] = document.getElementById("txtName").value;
    data["txtAge"] = document.getElementById("txtAge").value;
    data["txtEmail"] = document.getElementById("txtEmail").value;
    data["txtImage"] = document.getElementById("txtImage").files[0];
    return data;
}

function Create(data) {
    const cardContainer = document.getElementById("card-container");

    const card = document.createElement("div");
    card.className = "card";

    const reader = new FileReader();
    reader.onload = function (e) {
        card.innerHTML = `
            <img src="${e.target.result}" alt="Image">
            <div class="card-content">
                <h3>${data.txtName}</h3>
                <p>price: ${data.txtAge}</p>
                <p>Email: ${data.txtEmail}</p>
                <br>
                <button onclick="Edit(this)">Edit</button>
                <button onclick="Delete(this)">Delete</button>
            </div>
        `;
        cardContainer.appendChild(card);
    };
    reader.readAsDataURL(data.txtImage);
}

function Edit(button) {
    const card = button.parentElement.parentElement;
    userSelected = card;
    document.getElementById("txtName").value = card.querySelector("h3").innerText;
    document.getElementById("txtAge").value = card.querySelector("p:nth-child(2)").innerText.split(': ')[1];
    document.getElementById("txtEmail").value = card.querySelector("p:nth-child(3)").innerText.split(': ')[1];
    // Image update handling can be implemented if required
}

function Update(formData) {
    const reader = new FileReader();
    reader.onload = function (e) {
        userSelected.querySelector("img").src = e.target.result;
        userSelected.querySelector("h3").innerText = formData.txtName;
        userSelected.querySelector("p:nth-child(2)").innerText = "price: " + formData.txtAge;
        userSelected.querySelector("p:nth-child(3)").innerText = "Email: " + formData.txtEmail;
    };
    reader.readAsDataURL(formData.txtImage);
}

function Delete(button) {
    if (confirm('คุณต้องการลบข้อมูลหรือไม่')) {
        const card = button.parentElement.parentElement;
        card.remove();
        ClearForm();
    }
}

function FormSubmit() {
    let formData = Read();

    if (userSelected == null) {
        Create(formData);
    } else {
        Update(formData);
    }
    ClearForm();
}

function ClearForm() {
    document.getElementById("txtName").value = "";
    document.getElementById("txtAge").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtImage").value = "";

    userSelected = null;
}
