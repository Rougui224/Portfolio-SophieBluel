import { afficherProjet, galleryProjet } from "./main.js"

export async  function modal(reponse) {
    //  reponse = await donnees()
    // Recuperer dynamiquement les images des projets
    const photoProjet = reponse.map(projet => projet.imageUrl)
    for(let i =0; i< photoProjet.length ; i++) {
        // Créer les éléments ici
      const figure = document.createElement('figure')
      const div    = document.createElement('div')
      const icon      = document.createElement('i')
      const img    =  document.createElement('img')
       //   Personnaliser les ici 
    
       div.className       = "galeriePhoto_photosProjet_icon"
       icon.className      = "fa-solid fa-trash-can"
       div.dataset.id          = reponse[i].id

       img.src          = photoProjet[i]
    //    Les ajouter
       document.querySelector('.galeriePhoto_photosProjet').appendChild(figure)
       figure.append(div,img) 
       div.appendChild(icon)
     
       console.log(div)

    
    
       }
}

export function eventModal(){
    const boutonModifier      = document.querySelector('.modifier')
    const fenetrePhoto        = document.querySelector('.galeriePhoto')
    const galeriePhotoX       = document.querySelector('.galeriePhoto .fa-x')
    const galeriePhotoButton  = document.querySelector('.galeriePhoto button')
    const ajouterPhotoOngletX = document.querySelector('.ajouterPhoto .fa-x')
    const deletebutton        = document.querySelector('.galeriePhoto_photosProjet')
    

    // evenement sur le bouton modifier
    boutonModifier.addEventListener('click', ()=>{
        fenetrePhoto.style.display ='flex'
        document.body.style.background ='#0000004D'
        

    }) 
    // *******************Supprimer projet***********************
    // evenement sur la croix de l'onglet galerie photo

    galeriePhotoX.addEventListener('click', ()=>{
            fenetrePhoto.style.display ='none'
            document.body.style.background ='white'
    })
    deletebutton.addEventListener('click', async (event)=> {
            if(event.target.tagName=='I'){
                const div= event.target.parentElement
                const id = div.dataset.id
                console.log(id)
                const requete = await fetch(`http://localhost:5678/api/works/${id}`,{
                    method:'DELETE',
                    headers : {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'Application/json',
                    }
                })
                if(!requete.ok){
                    alert('error lors de la suppression')
                }else{
                    const  message = confirm('Souhaitez vous supprimer ce projet ?')
                    if(message ===true){
                        galleryProjet.innerHTML=''
                        deletebutton.innerHTML=''
                        afficherProjet()
                    }else{
                        return
                    }
                }
           
        }
        
           
    })  
      // evenement sur le bouton ajouter photo
      galeriePhotoButton.addEventListener('click', ()=>{
        document.querySelector('.ajouterPhoto').style.display ='flex'
        document.body.style.background ='#0000004D'

    })      

    // evenement en dehors de la fenetre
    window.addEventListener('click', (event)=>{
        if(!fenetrePhoto.contains(event.target) && !formAjouterPhoto.contains(event.target)){
            fenetrePhoto.style.display ='none'
            formAjouterPhoto.style.display= 'none'
            document.body.style.background ='white'
            console.log('clique en dehors du boutto')
        }
    } , true)


    // ********************Ajouter projet****************************
     
    const arrowLeft           = document.querySelector('.ajouterPhoto .fa-arrow-left ')
    const inputTitre          = document.querySelector('.ajouterPhoto #titre' )
    const champsVide          = document.querySelector('.ajouterPhoto_erreur')
    const boutonValider       = document.querySelector('.valider')
    const imageElement        = document.querySelector('.ajouterPhoto_photo img')
    const blockInputImage     = document.querySelector('.ajouterPhoto_photo fieldset')
    const inputFile           = document.querySelector('#inputFile')
    console.log(arrowLeft)
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
            console.log('l\'evenement input est lu')

        }
        // Verifier si les autres  champs sont remplis
        if(inputFile.files.length>0 && inputTitre.value!==''){
            boutonValider.style.background='#1D6154'
            champsVide.style.display ='none'

        }else{
            boutonValider.style.background='#A7A7A7'

        }
    
    }
    // inialiser dynamiquement le contenu où dois se charger dynamiquement l'image selectionnée en cas d'ajout
    function initialiserContenuImage(){
       
        blockInputImage.style.display ='flex'
        imageElement.src     = ''
        imageElement.style.display='none'

     
    }
     // Fonction pour faire la requete à l'API
     const envoyerDonneesAPI = async (formaData) => {
       
            try {
                const response = await fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers : {         
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'Application/json',
                    },
                    body: formaData
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Données envoyées avec succès:', data);
                    galleryProjet.innerHTML=''
                    deletebutton.innerHTML=''
                    afficherProjet()
                } else {
                    console.error('Erreur lors de l\'envoi des données:', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la requête fetch:', error);
            }finally{
                // Réinitialisation de formData après la requête
                formaData = new FormData();
            }
       
    };

    // *****************les evenements*********************
    arrowLeft.addEventListener('click',()=>{
        initialiserContenuImage()
        formAjouterPhoto.style.display ='none'
        fenetrePhoto.style.display ='flex'

        document.body.style.background ='#0000004D'
        formAjouterPhoto.reset()

    })
     // evenement sur la croix de l'onglet où on ajoute la photo
     ajouterPhotoOngletX.addEventListener('click', ()=>{
        formAjouterPhoto.style.display ='none'
        fenetrePhoto.style.display ='none'

        document.body.style.background ='white'
        formAjouterPhoto.reset()
       
    })
    // evenement sur la balise input image
    inputFile.addEventListener('change',ajoutPhoto)
    // evenement sur la balise input titre
    inputTitre.addEventListener('input', (event)=>{
        const titreValue = event.target.value
        if(inputFile.files.length>0 && titreValue!==''){
            boutonValider.style.background='#1D6154'
            champsVide.style.display ='none'

        }else{
            boutonValider.style.background='#A7A7A7'

        }
      
    })
   
    // evenement sur la balise form
    const formAjouterPhoto    = document.querySelector('.ajouterPhoto')  
    formAjouterPhoto.addEventListener('submit', (event)=>{
        event.preventDefault()
        if(inputFile.files.length===0 || inputTitre.value===''){
            champsVide.style.display ='block'
            return
        }else{
            champsVide.style.display ='none'
            let formaData = new FormData()
            const element  = event.target
            const image    =element.querySelector('#inputFile').files[0]
            const titre    =element.querySelector('[name=titre]').value
            const category =element.querySelector('[name=choix]').value
            let categoryId
            switch (category) {
                case 'Objets':
                    categoryId=1
                    break;
                case 'Appartements':
                    categoryId=2
                    break;
                case 'Hotels & restaurants':
                    categoryId=3
                    break;
            
                default:
                    break;
            }
            console.log('evenement sur le formulaire')

            if(image && titre && category){
                formaData.append('image',image)
                formaData.append('title',titre)
                formaData.append('category',categoryId)
            }
       
           
            const entries = formaData.entries();
            const hasData = entries.next().done === false;
             // Vérifie si les entrées ne sont pas vides
    
            if (hasData) { 
                 console.log('**********debut***************** ')
                 for (const pair of formaData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                    // Affiche chaque paire clé-valeur dans la console
                }              
    
                console.log('FormData contient des données ajoutées.');
            } else {
                console.log('FormData est vide ou n\'a pas de données ajoutées.');
               
            }
            envoyerDonneesAPI(formaData)
            formAjouterPhoto.reset()
            initialiserContenuImage()
            boutonValider.style.background='#A7A7A7'
        }
       
    })
   
  
}