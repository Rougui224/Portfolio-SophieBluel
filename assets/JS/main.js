
import { modal ,eventModal } from "./modal.js"
const urlWorks ='http://localhost:5678/api/works'
const urlCategories ='http://localhost:5678/api/categories'
// Recuperer les éléments necessaires
const galleryProjet       = document.querySelector('.gallery')
const buttonTous          = document.querySelector('.active')
const filtre              = document.querySelector('.filtre')
const boutonLogIn         = document.querySelector('.loginLink')
const UserLogin           = sessionStorage.getItem('token')

// Données 
let works=[] 


// ***********Utilisateur connecté*********************

function pageUtilisateurConnecte(){
    if(UserLogin){
        boutonLogIn.textContent = 'log Out'   
        filtre.style.display    = 'none'
        const header            = document.querySelector('.modeEdition')
        const boutonModifier    = document.querySelector('.modifier')
        header.style.display    = 'flex'
        boutonModifier.style.display ='flex'
    }
   
   
}
// Se deconnecter
boutonLogIn.addEventListener('click', ()=>{
    if(UserLogin){
        sessionStorage.removeItem('token')
    }
})


// *********************Generer dynamiquement les projets **********
// Recuperer tous les projets
async function donnees (){
    const requete = await fetch(urlWorks)
    if(requete.ok){
        const reponse = await requete.json()
        return reponse 
    }else{
        alert('Une erreur est survenue lors de la récuperation des données')

    }
    
}
function genererWorks(worksData){
    galleryProjet.innerHTML =""

     // Generer dynamiquement les projets
    for(let i=0; i< worksData.length ; i++ ){
        let figure     = document.createElement('figure')
        let img        = document.createElement('img')
        let figCaption = document.createElement('figCaption')

        img.src = worksData[i].imageUrl
        figCaption.textContent = worksData[i].title

        galleryProjet.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figCaption)
    }

}

//  Afficher tous les projets
export async function afficherProjet(){
    works = await donnees()
    genererWorks(works)
    modal(works)
   
}


//***************Filtrer projet*********************
// Gerer le style du bouton activé
function boutonActiveStyle(id){
    const allButton = document.querySelectorAll('.filtre button')
    allButton.forEach(bouton =>{
        if(bouton.dataset.id===id){
            bouton.classList.add('active')
        }else{
            bouton.classList.remove('active')

        }
    })
}

// Filtrer le projet par categorie
async function filtrerProjet(){
   
    const requeteCategorie = await fetch(urlCategories)
    const reponseCategorie = await requeteCategorie.json()
    // Créer dynamiquement les boutons en fonction des categorie
    for(let i=0; i< reponseCategorie.length ; i++ ){
        let li            = document.createElement('li')
        let button        = document.createElement('button')
        button.dataset.id = reponseCategorie[i].id
        button.textContent = reponseCategorie[i].name
      

        filtre.appendChild(li)
        li.appendChild(button)
        // evenement sur chaque bouton
        button.addEventListener('click', (event)=>{

            let id = event.target.dataset.id          
            const gategorie = works.filter( projet=> projet.categoryId == id)
            genererWorks(gategorie)
            boutonActiveStyle(id)
        })
        
        // Créer les balises option pour la fenêtre modale "ajouter un projet"
        let option       = document.createElement('option')
        option.value     = reponseCategorie[i].id
        option.textContent = reponseCategorie[i].name
        document.querySelector('#categorie').appendChild(option)
    }
   
}
// Evenement sur le bouton "tous"
buttonTous.addEventListener('click',()=>{
    genererWorks(works)
    boutonActiveStyle('0')
})

// *************************************************************************
afficherProjet()
filtrerProjet()
pageUtilisateurConnecte()
eventModal()

