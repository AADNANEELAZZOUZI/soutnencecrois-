const AjouterMember = document.getElementById("AjouterMember");
const modalConferenceRoom = document.getElementById("modalConfernceRoom");
const modalReception = document.getElementById("modalReception");
const modalServiceRoom = document.getElementById("modalServiceRoom");
const modalSecuretyRoom = document.getElementById("modalSecuretyRoom");
const modalStaffRoom = document.getElementById("modalStaffRoom");
const modalvault = document.getElementById("modalConfernceRoom");
let conterexperience = 0;
let membersX =[]
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
        const newMember = { name: nom, role: role, photo: photo, email: "HFJBFVBJB@GMOAL.com", numero: "2222222222" };
        membersX.push(newMember);
        afficherMemberUnassigned(newMember);
                    
                    afficherCardMOdal(newMember,modalConferenceRoom);
                
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
                if(member.role == "réceptionniste"){
                    afficherCardMOdal(member,modalConferenceRoom);
                }
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


function afficherCardMOdal(member,zone){
    const smallCard = document.createElement("div")
    smallCard.className = "memberCardContainer1"
        smallCard.innerHTML = `
    <div class="imgMember"><img class="imgMemberIn" src="${member.photo}"></div>
    <div class="descrepsion">
    <h5>${member.name}</h5>
    <P>${member.role}</P>
    </div>
    <div class="buttonEdit">
    <button type="button" class="btn btn-success">Add</button>
    </div>
    `

zone.appendChild(smallCard);
    
}
function afficherCardMOdalPourChaqueElement(){

}
afficherCardMOdalPourChaqueElement()




// function ajouterSalle(){
//         const conferenceRoom = document.getElementById('conferenceRoom');
//         const smallCard = document.createElement("div");
//         smallCard.className = "memberCardContainer1"
//         smallCard.innerHTML = `
//         <div class="imgMember"><img id="imgMember2" class="imgMemberIn" src="memberimg.webp">
//                                     </div>
//                                     <div class="descrepsion">
//                                         <h6>ALEX</h6>
//                                         <small>Technicien IT</small>
//                                     </div>
//                                     <div class="buttonEdit">
//                                         x
//                                     </div>
    
//         `
//     }




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
console.log(membersX)
inputBlur();