var User = /** @class */ (function () {
    function User(fName, lName, email, password) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
    }
    return User;
}());
var Pet = /** @class */ (function () {
    function Pet(name, kind) {
        this.name = name;
        this.kind = kind;
    }
    return Pet;
}());
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#formInput").addEventListener("submit", addUser);
    document.querySelector("#formPet").addEventListener("submit", addPet);
    renderUserList(); // Initialen Aufruf, um Benutzerliste zu rendern
    renderPetList(); // Initialen Aufruf, um Haustierliste zu rendern
});
function addUser(event) {
    event.preventDefault();
    var fName = document.querySelector("#formInput [name='firstname']").value;
    var lName = document.querySelector("#formInput [name='lastname']").value;
    var email = document.querySelector("#formInput [name='email']").value;
    var password = document.querySelector("#formInput [name='password']").value;
    fetch("https://userman.thuermer.red/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstname: fName,
            lastname: lName,
            mail: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
        if (response.ok) {
            renderUserList(); // Nachdem der Benutzer hinzugefügt wurde, aktualisieren Sie die Benutzerliste
        }
        else {
            console.log("FEHLER!", response.statusText);
        }
    })
        .catch(function (error) {
        console.log(error);
    });
}
function addPet(event) {
    event.preventDefault();
    var petName = document.querySelector("#formPet [name='petName']").value;
    var petKind = document.querySelector("#formPet [name='petKind']").value;
    fetch("https://userman.thuermer.red/api/pets", {
        method: "POST",
        body: JSON.stringify({
            name: petName,
            kind: petKind
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
        if (response.ok) {
            // Nachdem das Haustier hinzugefügt wurde, aktualisieren Sie die Haustierliste
            renderPetList();
        }
        else {
            console.log("FEHLER!", response.statusText);
        }
    })
        .catch(function (error) {
        console.log(error);
    });
}
function deleteUser(target) {
    var email = target.dataset.email;
    fetch("https://userman.thuermer.red/api/users/" + email, {
        method: "DELETE"
    })
        .then(function (response) {
        if (response.ok) {
            renderUserList(); // Nachdem der Benutzer gelöscht wurde, aktualisieren Sie die Benutzerliste
        }
        else {
            console.log("FEHLER!", response.statusText);
        }
    })
        .catch(function (error) {
        console.log(error);
    });
}
function renderUserList() {
    var tableUser = document.querySelector("#tableUser");
    tableUser.innerHTML = "";
    fetch("https://userman.thuermer.red/api/users")
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("FEHLER!", response.statusText);
            throw new Error("Network response was not ok.");
        }
    })
        .then(function (users) {
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var u = users_1[_i];
            var tr = document.createElement("tr");
            tr.innerHTML = "\n                    <td>".concat(u.mail, "</td>\n                    <td>").concat(u.lastname, "</td>\n                    <td>").concat(u.firstname, "</td>\n                    <td>\n                        <button class=\"btn btn-primary delete\" data-email=\"").concat(u.email, "\" onclick=\"deleteUser(this)\"><i class=\"fas fa-trash\"></i></button>\n                    </td>\n                ");
            tableUser.append(tr);
        }
    })
        .catch(function (error) {
        console.error('Error fetching users:', error);
    });
}
function renderPetList() {
    var tablePets = document.querySelector("#tablePets");
    tablePets.innerHTML = "";
    fetch("https://userman.thuermer.red/api/pets")
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("FEHLER!", response.statusText);
            throw new Error("Network response was not ok.");
        }
    })
        .then(function (pets) {
        for (var _i = 0, pets_1 = pets; _i < pets_1.length; _i++) {
            var pet = pets_1[_i];
            var tr = document.createElement("tr");
            tr.innerHTML = "\n                    <td>".concat(pet.name, "</td>\n                    <td>").concat(pet.kind, "</td>\n                ");
            tablePets.append(tr);
        }
    })
        .catch(function (error) {
        console.error('Error fetching pets:', error);
    });
}
