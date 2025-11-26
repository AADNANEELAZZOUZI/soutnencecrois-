const AjouterMember = document.getElementById("AjouterMember");
const modalConferenceRoom = document.getElementById("modalConfernceRoom");
const modalReception = document.getElementById("modalReception");
const modalServiceRoom = document.getElementById("modalServiceRoom");
const modalSecuretyRoom = document.getElementById("modalSecuretyRoom");
const modalStaffRoom = document.getElementById("modalStaffRoom");
const modalvault = document.getElementById("modalConfernceRoom");
let conterexperience = 0;
let contercapacitéReception = 0
let membersX =[]
let idMember = 1;
let dataId ;
let jsonMember = 0;
document.getElementById("addExp").addEventListener('click', ajouterExperience)

// =================================================
AjouterMember.addEventListener('click', ajouterMember)
function ajouterMember() {
    const nom = document.querySelector("input[name='nom']").value;
    const role = document.querySelector("input[name='role']").value;
    const photo = document.querySelector("input[name='photo']").value;
    const email = document.querySelector("input[name='email']").value;
    const numero = document.querySelector("input[name='telephone']").value
    let regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regexnumerotel = /^\d{10}$/;
    let regexName =  /^[a-zA-Z]+ [a-zA-Z]{3,19}$/;
    if(!regexName.test(nom)) {
        alert("nom invalid")
    }
    if(!regexemail.test(email)) {
        alert("email invalid")
    }
    if(!regexnumerotel.test(numero)) {
        alert("numero invalid")
    }
    else{
        idMember++
        const newMember = { id:idMember, name: nom, role: role, photo: photo, email: "HFJBFVBJB@GMOAL.com", numero: "2222222222" };
        membersX.push(newMember);
        afficherMemberUnassigned(newMember);
        afficherCardMOdal(newMember,modalConferenceRoom);
        if(newMember.role == "réceptionniste" || newMember.role == "Manager"){
            afficherCardMOdal(newMember,modalReception);
        }
    }
    
}
async function loadDataJson() {
    try{
        const response = await fetch("data.json")
        const members = await response.json();
            members.forEach(member => {
            afficherMemberUnassigned(member);
            membersX.push(member);
        });
        
            membersX.forEach(member => {
                    afficherCardMOdal(member,modalConferenceRoom);
                });
            
    }catch(error){
        console.log("error lors de loading json")
    }
}

loadDataJson();


// fonction pour ajouter formulere dynamic pour experience
function ajouterExperience() {
    conterexperience++
    const div = document.createElement("div");
    div.className = "experiences";
    div.innerHTML = `
            <h4>Expérience</h4>

            <label>Poste :</label><br>
            <input type="text" name="poste_${conterexperience}" required><br><br>

            <label>Entreprise :</label><br>
            <input type="text" name="entreprise_${conterexperience}" required><br><br>

            <label>Description :</label><br>
            <textarea name="description_${conterexperience}" rows="3"></textarea><br><br>

            <button class="btn btn-danger deleteBtn">Supprimer</button>
        `;
    div.querySelector(".btn.btn-danger.deleteBtn").addEventListener('click', () => div.remove())
    document.getElementById("experiences").appendChild(div);
}




document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addBtn")) {
        const id = e.target.dataset.id;
        ajouterAuZone(id);
        dataId = $('#addBtn').attr('data-id');
    }
});


function ajouterAuZone(id){
    const membre = membersX.find(m => m.id == id);

    if (!membre){return alert("Membre introuvable !");} 
    if (membre.id == id)
        {
                membersX.forEach(member => {
                    if(membersX.id == id)
                memberCardContainer1.remove();
        });
        }
    let zone;

    switch(zoneClicked){
        case "conferenceRoom":
            zone = document.getElementById("conferenceRoom");
            break;

        case "reception":
            zone = document.getElementById("reception");
            break;

        case "serviceRoom":
            zone = document.getElementById("modalServiceRoom");
            break;

        default:
            return alert("Sélectionne une zone d'abord !");
    }

    renderCardZone(membre, zone);
    alert(jsonMember)
}

function inputBlur(){
    const nomInput = document.querySelector("input[name='nom']");
    const roleInput = document.querySelector("input[name='role']");
    const emailInput = document.querySelector("input[name='email']");
    const nomAlert = document.getElementById("nomAlert");
    const roleAlert = document.getElementById("roleAlert");
    const emailAlert = document.getElementById("emailAlert");


    nomInput.addEventListener('blur', () => {
        if(nomInput.value.trim() === ""){
            nomInput.style.border = "1px solid red";
            nomAlert.innerHTML = "Input is empty";     
        }
        else{
            nomInput.style.border = "";
            nomAlert.innerHTML = "";  
        }
    })
    nomInput.addEventListener('focus' , () => {
        nomInput.style.border = "";
        nomAlert.innerHTML = "";
    })
    roleInput.addEventListener('blur', () => {
        if(roleInput.value.trim() === ""){
            roleInput.style.border = "1px solid red";
            roleAlert.innerHTML = "Input is empty";     
        }
        else{
            roleInput.style.border = "";
            roleAlert.innerHTML = "";  
        }
    })
    roleInput.addEventListener('focus' , () => {
        roleInput.style.border = "";
        roleInput.innerHTML = "";
    })
    emailInput.addEventListener('blur', () => {
        if(emailInput.value.trim() === ""){
            emailInput.style.border = "1px solid red";
            emailAlert.innerHTML = "Input is empty";     
        }
        else{
            emailInput.style.border = "";
            emailAlert.innerHTML = "";  
        }
    })
    emailInput.addEventListener('focus' , () => {
        emailInput.style.border = "";
        emailAlert.innerHTML = "";
    })
}
inputBlur();
let zoneClicked = null;

function zoneClick(){
    document.getElementById("ajouterAuConferenceRoom").addEventListener('click', ()=> zoneClicked = "conferenceRoom");
    document.getElementById("ajouterAureception").addEventListener('click', ()=> zoneClicked = "reception");
    document.getElementById("ajouterAuServicesRoom").addEventListener('click', ()=> zoneClicked = "serviceRoom");
}
zoneClick();



// fonction d'affichage
function renderCardZone(member,zone){
    const zoneCard = document.createElement("div")
    zoneCard.className = "memberCardContainer1"
    zoneCard.innerHTML = `
        <div class="imgMember"><img class="imgMemberIn" src="${member.photo}"></div>
        <div class="descrepsion">
            <h5>${member.name}</h5>
            <p>${member.role}</p>
        </div>
        <div class="buttonEdit">
            <button class="btn btn-danger removeBtn">x</button>
        </div>
    `
    zone.appendChild(zoneCard);

    zoneCard.querySelector(".removeBtn").addEventListener("click", ()=> zoneCard.remove());
}


function afficherCardMOdal(member,zone){
    const smallCard = document.createElement("div")
    smallCard.className = "memberCardContainer1"
    smallCard.innerHTML = `
        <div class="imgMember"><img class="imgMemberIn" src="${member.photo}"></div>
        <div class="descrepsion">
            <h5>${member.name}</h5>
            <p>${member.role}</p>
        </div>
        <div class="buttonEdit">
            <button id ="addBtn" class="btn btn-success addBtn" data-id="${member.id}">Add</button>
        </div>
    `
    zone.appendChild(smallCard);

}
function afficherMemberUnassigned(member) {
    const cardLeft = document.getElementById("MembersCard")
    const memberCardContainer1 = document.createElement("div")
    memberCardContainer1.className = "memberCardContainer1"
    memberCardContainer1.innerHTML =
        `
    <div class="imgMember"><img class="imgMemberIn" src="${member.photo}"></div>
                        <div class="descrepsion">
                            <h5>${member.name}</h5>
                            <P>${member.role}</P>
                        </div>
                        <div class="buttonEdit">
                            <button type="button" class="btn btn-warning">Edit</button>
                        </div>
    `
    cardLeft.appendChild(memberCardContainer1);
}
/* =====================*/
