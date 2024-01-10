import { afficherProjet } from "./main.js"
const emplacementPhotoProjet         = document.querySelector('.galeriePhoto_photosProjet')

// Generer dynamiquement les projets dans la fenêtre modale
export async  function modal(donnees) {
    emplacementPhotoProjet.innerHTML=''

    // Recuperer dynamiquement les images des projets
    const photoProjet = donnees.map(projet => projet.imageUrl)
    for(let i =0; i< photoProjet.length ; i++) {
        // Créer les éléments 
        const figure = document.createElement('figure')
        const div    = document.createElement('div')
        const icon      = document.createElement('i')
        const img    =  document.createElement('img')
       //   Les personnaliser 
    
       div.className       = "galeriePhoto_photosProjet_icon"
       icon.className      = "fa-solid fa-trash-can"
       div.dataset.id          = donnees[i].id
       img.src          = photoProjet[i]
      //    Puis les ajouter
       document.querySelector('.galeriePhoto_photosProjet').appendChild(figure)
       figure.append(div,img) 
       div.appendChild(icon)
    
    
    }
}

export function eventModal(){
    const boutonModifier                 = document.querySelector('.modifier')
    const fenetrePhoto                   = document.querySelector('.galeriePhoto')
    const galeriePhotoX                  = document.querySelector('.galeriePhoto .fa-x')
    const galeriePhotoButton             = document.querySelector('.galeriePhoto button')
    const ajouterPhotoOngletX            = document.querySelector('.ajouterPhoto .fa-x')
    

    function afficherModale(element){
        element.style.display ='flex'
        document.body.style.background ='#0000004D'
    }
    function fermerModale (element) {  
        element.style.display ='none'
        document.body.style.background ='white'
    }

    // evenement sur le bouton modifier
    boutonModifier.addEventListener('click', ()=>{
        afficherModale(fenetrePhoto)
        
    }) 

    // *******************Supprimer projet***********************

   //   Supprimer un projet 
    emplacementPhotoProjet.addEventListener('click', async (event)=> {
            if(event.target.tagName=='I'){
                const div= event.target.parentElement
                const id = div.dataset.id
                const  message = confirm('Souhaitez vous supprimer ce projet ?')
                if(message){
                    try{
                        const requete = await fetch(`http://localhost:5678/api/works/${id}`,{
                            method:'DELETE',
                            headers : {
                                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                                'Content-Type': 'Application/json',
                            }
                        })
                        if(requete.ok){
                            afficherProjet()
                        }else{
                            throw new Error
                        }
                    }catch(error){
                        console.error('Erreur lors de la suppression :', error);
                        alert('Erreur lors de la suppression : ' + error.message);
                    }

                }
                else{
                    return
                }
           
            }
        
           
    })  

    // evenement pour fermer la fenêtre modale "galerie photo"
     galeriePhotoX.addEventListener('click', ()=>{
        fermerModale(fenetrePhoto)
    })
    // evenement sur le bouton ajouter photo
    galeriePhotoButton.addEventListener('click', ()=>{
        afficherModale(formAjouterPhoto)

    })      

    // evenement en dehors de la fenetre Pour fermer toutes les fenêtres modales
    window.addEventListener('click', (event)=>{
        if(!fenetrePhoto.contains(event.target) && !formAjouterPhoto.contains(event.target)){
            fermerModale(fenetrePhoto)
            fermerModale(formAjouterPhoto)
        }
    } , true)


    // ********************Ajouter un projet****************************
     
    const arrowLeft           = document.querySelector('.ajouterPhoto .fa-arrow-left ')
    const inputTitre          = document.querySelector('.ajouterPhoto #titre' )
    const champsVide          = document.querySelector('.ajouterPhoto_erreur')
    const boutonValider       = document.querySelector('.valider')
    const imageElement        = document.querySelector('.ajouterPhoto_photo img')
    const blockInputImage     = document.querySelector('.ajouterPhoto_photo fieldset')
    const inputFile           = document.querySelector('#inputFile')
    const selectCtegorie      = document.querySelector('#categorie')

    // Verifier si tous les champs sont remplis pour le style du bouton valider
    function verifierChampsRempli(){
        if(inputFile.files.length>0 && inputTitre.value!=='' && selectCtegorie.value!=='0'){
            boutonValider.style.background='#1D6154'
            champsVide.style.display ='none'

        }else{
            boutonValider.style.background='#A7A7A7'

        }
    }
    // ajout de la photo
    function ajoutPhoto (event) {
        document.body.style.background ='#0000004D'

        const imageSelictionnee = event.target.files[0]

        if(imageSelictionnee){
            const lecteurImage = new FileReader()
            lecteurImage.onload = (event)=>{
                const imageUrl = event.target.result
                // Personnaliser les éléments html pour l'emplacement de la photo
                blockInputImage.style.display ='none'
                imageElement.src     = imageUrl
                imageElement.style.display='inline-block'                
                }

            lecteurImage.readAsDataURL(imageSelictionnee)

        }
       verifierChampsRempli()
    
    }
    // inialiser dynamiquement le contenu où dois se charger l'image selectionnée en cas d'ajout
    function initialiserContenuImage(){
       
        blockInputImage.style.display ='flex'
        imageElement.src     = ''
        imageElement.style.display='none'

     
    }
  
    // *****************les evenements*********************

    arrowLeft.addEventListener('click',()=>{
        formAjouterPhoto.style.display ='none'
        initialiserContenuImage()
        afficherModale(fenetrePhoto)
        formAjouterPhoto.reset()

    })
    // evenement sur la croix de l'onglet où on ajoute la photo pour quitter la fenêtre
    ajouterPhotoOngletX.addEventListener('click', ()=>{
        fermerModale(formAjouterPhoto)
        fermerModale(fenetrePhoto)
        formAjouterPhoto.reset()
       
    })
    // evenement sur la balise input image
    inputFile.addEventListener('change',ajoutPhoto)
    // evenement sur la balise input titre
    inputTitre.addEventListener('input', ()=>{  
        verifierChampsRempli()    
    })
    // evenement sur la selection de la categorie
    selectCtegorie.addEventListener('change',()=>{   
        verifierChampsRempli()
    })
   
    // evenement sur la balise form
    const formAjouterPhoto    = document.querySelector('.ajouterPhoto')  
    formAjouterPhoto.addEventListener('submit', (event)=>{
        event.preventDefault()
        const champsNonRempli = inputFile.files.length===0 || inputTitre.value==='' || selectCtegorie.value ==='0'
        if(champsNonRempli){
            champsVide.style.display ='block'
            return
        }else{

            champsVide.style.display ='none'
            let formData = new FormData()
            const element  = event.target
            const image    = element.querySelector('#inputFile').files[0]
            const titre    = element.querySelector('[name=titre]').value
            const category = element.querySelector('[name=choix]').value
         

            if(image && titre && category){
                formData.append('image',image)
                formData.append('title',titre)
                formData.append('category',category)

                
            }
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                accept: "application/json",
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            })
            .then((response) => response.json())
            .then(() => {
                formAjouterPhoto.reset()
                initialiserContenuImage()
                boutonValider.style.background='#A7A7A7';
                formAjouterPhoto.style.display ='none'
                fenetrePhoto.style.display ='flex'     
                document.body.style.background ='#0000004D'
                afficherProjet()
            })

            .catch((error)=>{
                 // Gestion de l'erreur 
                 console.error('Erreur lors de la requête fetch :', error);
            })
            
        }
       
    })
   
  
}