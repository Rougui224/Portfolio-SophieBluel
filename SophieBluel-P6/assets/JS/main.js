
import { modal , eventModal } from "./modal.js"
// Recuperons les elements necessaires
const galleryProjet       = document.querySelector('.gallery')
const buttonTous          = document.querySelector('.active')
const filtre              = document.querySelector('.filtre')




const myToken  ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjEyMDU0NywiZXhwIjoxNzAyMjA2OTQ3fQ.Xe-kOblCvTzMkDGpWTK9NzpkACYKZk4csie64_C3TOc'
const urlWorks ='http://localhost:5678/api/works'
const urlCategories ='http://localhost:5678/api/categories'
const urlLogin      ='http://localhost:5678/api/users/login'

function pageEdition(){
    const header         = document.querySelector('.modeEdition')
    const boutonModifier = document.querySelector('.modifier')
    header.style.display ='flex'
    boutonModifier.style.display ='flex'
   
}

// Generer dynamiquement les projets
function genererWorks(tableau){
     // Ajoutons les dynamiquement à la paje d'acceuil
     for(let i=0; i< tableau.length ; i++ ){
        let figure     = document.createElement('figure')
        let img        = document.createElement('img')
        let figCaption = document.createElement('figCaption')

        img.src = tableau[i].imageUrl
        figCaption.textContent = tableau[i].title

        galleryProjet.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figCaption)
    }

}

// Recuperer toous les projets
async function donnees (){
    const requete = await fetch(urlWorks)
    const reponse = await requete.json()
    return reponse
}
async function afficherProjet(){
    const reponse = await donnees()
    genererWorks(reponse)
    modal(reponse)
}
afficherProjet()

async function filtrerProjet(){
   
    const reponse = await donnees()

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

    }    

    // ***********Ajouter les evenement sur les boutons*************
    let buttonActive = buttonTous
    const allButton = document.querySelectorAll('.filtre button')
    allButton.forEach( button =>{
        button.addEventListener('click', (event)=>{
            galleryProjet.innerHTML =""
            let id = event.target.dataset.id

           
            if(buttonActive !==null){
                buttonActive.classList.remove('active')
            }
            if(id==='0'){
                genererWorks(reponse)
            }else{
                const gategorie = reponse.filter( projet=> projet.categoryId == id)
                genererWorks(gategorie)
            }

            // Redefinir le bouton Actié avec le bouton cliqué et le rajouter la classe active
          
            buttonActive= event.target
            buttonActive.classList.add('active')
           
        })
        
    })
   
}
filtrerProjet()
eventModal()

