
import { modal ,eventModal } from "./modal.js"
// Recuperons les elements necessaires
export const galleryProjet       = document.querySelector('.gallery')
const buttonTous          = document.querySelector('.active')
const filtre              = document.querySelector('.filtre')
const boutonLogIn         = document.querySelector('.loginLink')

// Données 
let works=[]


const urlWorks ='http://localhost:5678/api/works'
const urlCategories ='http://localhost:5678/api/categories'
const urlLogin      ='http://localhost:5678/api/users/login'
// ***********Utilisateur connecté*********************
function pageEdition(){
    const header         = document.querySelector('.modeEdition')
    const boutonModifier = document.querySelector('.modifier')
    header.style.display ='flex'
    boutonModifier.style.display ='flex'
   
}
const UserLogin = localStorage.getItem('token')
if(UserLogin){
    pageEdition()
    boutonLogIn.textContent ='log Out'   

}
boutonLogIn.addEventListener('click', ()=>{
    if(UserLogin){
        localStorage.removeItem('token')
    }
})


// Generer dynamiquement les projets
function genererWorks(worksData){
     // Ajoutons les dynamiquement à la paje d'acceuil
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

// Recuperer toous les projets
async function donnees (){
    const requete = await fetch(urlWorks)
    if(!requete.ok){
        alert('Une erreur est survenue lors de la récuperation des données')
    }else{
        const reponse = await requete.json()
        // works = reponse
        // console.log(works)

        return reponse
    }
    
}
export async function afficherProjet(){
    works = await donnees()
    genererWorks(works)
    modal(works)
   
}
afficherProjet()

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

    }    

    // ***********Ajouter les evenement sur les boutons*************
    let buttonActive = buttonTous
    const allButton = document.querySelectorAll('.filtre button')
    allButton.forEach( button =>{
        if(UserLogin){
            button.style.display ='none'
        }else {
             button.addEventListener('click', (event)=>{
            galleryProjet.innerHTML =""
            let id = event.target.dataset.id

           
            if(buttonActive !==null){
                buttonActive.classList.remove('active')
            }
            if(id==='0'){
                genererWorks(works)
            }else{
                const gategorie = works.filter( projet=> projet.categoryId == id)
                genererWorks(gategorie)
            }

            // Redefinir le bouton Actié avec le bouton cliqué et le rajouter la classe active
          
            buttonActive= event.target
            buttonActive.classList.add('active')
           
        })
        
        }
       
    })
   
}
filtrerProjet()
eventModal()

