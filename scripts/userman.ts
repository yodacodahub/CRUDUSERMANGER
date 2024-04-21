class User {
    email: string;
    fName: string;
    lName: string;
    password: string;

    constructor(fName: string, lName: string, email: string, password: string) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
    }
}

class Pet {
    name: string;
    kind: string;

    constructor(name: string, kind: string) {
        this.name = name;
        this.kind = kind;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#formInput").addEventListener("submit", addUser);
    document.querySelector("#formPet").addEventListener("submit", addPet);
    renderUserList(); // Initialen Aufruf, um Benutzerliste zu rendern
    renderPetList(); // Initialen Aufruf, um Haustierliste zu rendern
});

function addUser(event: Event): void {
    event.preventDefault();

    const fName: string = (document.querySelector("#formInput [name='firstname']") as HTMLInputElement).value;
    const lName: string = (document.querySelector("#formInput [name='lastname']") as HTMLInputElement).value;
    const email: string = (document.querySelector("#formInput [name='email']") as HTMLInputElement).value;
    const password: string = (document.querySelector("#formInput [name='password']") as HTMLInputElement).value;

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
        .then(response => {
            if (response.ok) {
                renderUserList(); // Nachdem der Benutzer hinzugefügt wurde, aktualisieren Sie die Benutzerliste
            } else {
                console.log("FEHLER!", response.statusText);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function addPet(event: Event): void {
    event.preventDefault();

    const petName: string = (document.querySelector("#formPet [name='petName']") as HTMLInputElement).value;
    const petKind: string = (document.querySelector("#formPet [name='petKind']") as HTMLInputElement).value;

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
        .then(response => {
            if (response.ok) {
                // Nachdem das Haustier hinzugefügt wurde, aktualisieren Sie die Haustierliste
                renderPetList();
            } else {
                console.log("FEHLER!", response.statusText);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function deleteUser(target: HTMLElement) {
    const email: string = target.dataset.email;

    fetch("https://userman.thuermer.red/api/users/" + email, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                renderUserList(); // Nachdem der Benutzer gelöscht wurde, aktualisieren Sie die Benutzerliste
            } else {
                console.log("FEHLER!", response.statusText);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function renderUserList() {
    const tableUser: HTMLElement = document.querySelector("#tableUser");
    tableUser.innerHTML = "";

    fetch("https://userman.thuermer.red/api/users")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("FEHLER!", response.statusText);
                throw new Error("Network response was not ok.");
            }
        })
        .then(users => {
            for (const u of users) {
                const tr: HTMLElement = document.createElement("tr");
                tr.innerHTML = `
                    <td>${u.mail}</td>
                    <td>${u.lastname}</td>
                    <td>${u.firstname}</td>
                    <td>
                        <button class="btn btn-primary delete" data-email="${u.email}" onclick="deleteUser(this)"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tableUser.append(tr);
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function renderPetList() {
    const tablePets: HTMLElement = document.querySelector("#tablePets");
    tablePets.innerHTML = "";

    fetch("https://userman.thuermer.red/api/pets")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("FEHLER!", response.statusText);
                throw new Error("Network response was not ok.");
            }
        })
        .then(pets => {
            for (const pet of pets) {
                const tr: HTMLElement = document.createElement("tr");
                tr.innerHTML = `
                    <td>${pet.name}</td>
                    <td>${pet.kind}</td>
                `;
                tablePets.append(tr);
            }
        })
        .catch(error => {
            console.error('Error fetching pets:', error);
        });
}
