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
    const imageContainer = document.querySelector('.ajouterPhoto .ajouterPhoto_photo')
    

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

    
    // ********************Ajouter projet****************************
     
   
    const inputTitre          = document.querySelector('.ajouterPhoto #titre' )
    const champsVide       = document.querySelector('.ajouterPhoto_erreur')
    const selectElement       = document.getElementById('choix');
    const formAjouterPhoto    = document.querySelector('.ajouterPhoto')  
    const boutonValider       = document.querySelector('.valider')

    let formaData = new FormData()
    // ajout de la photo
    function ajoutPhoto (event) {
        document.body.style.background ='#0000004D'

        const imageSelictionnee = event.target.files[0]
        formaData.append('image',imageSelictionnee)

        if(imageSelictionnee){
            const lecteurImage = new FileReader()
            lecteurImage.onload = (event)=>{
                const imageUrl = event.target.result

                // Créons un element image et définissons son attribut avec l'url
                const imageElement   = document.createElement('img')
                imageElement.src     = imageUrl
                imageContainer.style.padding ='0px 10px'
                imageContainer.innerHTML=""
                imageContainer.appendChild(imageElement)
                
                }

            lecteurImage.readAsDataURL(imageSelictionnee)
            console.log('l\'evenement input est lu')

        }

    
    }
    // inialiser dynamiquement le contenu où dois se charger dynzmiquement l'image selectionnée en cas d'ajout
    function initialiserContenuImage(){
        const contenuParDefaut =`
        <i class="fa-regular fa-image"></i>

        </div>
        <label for="inputFile" class="custom-file-upload">
        <span>+ Ajouter une photo</span>
        </label>
        <input type="file" id="inputFile" accept="image/*" required >
        <p>jpg, png : 4mo max</p>`

        imageContainer.innerHTML= contenuParDefaut


     
    }
    // evenement sur la balise input titre
    inputTitre.addEventListener('input', (event)=>{
        const titreValue = event.target.value
        if(formaData.get('image')){
            formaData.set('title',titreValue)

        }
    })
    // evenement sur la balise form
    formAjouterPhoto.addEventListener('click', (event)=>{
        const element = event.target

       
        if(element.className =='fa-x'){
            initialiserContenuImage()
        }
        else if(element.id==='inputFile'){
            element.addEventListener('change',ajoutPhoto)
           
        }
       

        boutonValider.addEventListener('click', ()=>{
            event.preventDefault()
        })
        // console.log(formaData)
        if(formaData.get('title') && !formaData.get('category')){
            formaData.append('category', selectElement.value)
            boutonValider.style.background='#1D6154'
            champsVide.style.display ='none'


        }else if(formaData.get('title') && formaData.get('category')){
            formaData.delete('category')
            formaData.append('category', selectElement.value)

        }
        const entries = formaData.entries();
        const hasData = entries.next().done === false; // Vérifie si les entrées ne sont pas vides

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
    })
    // Fonction pour vérifier et faire la requete à l'API
    const envoyerDonneesAPI = async () => {
        const image    = formaData.get('image');
        const titre    = formaData.get('title');
        const category = formaData.get('category');

        if (image && titre && category) {
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
        } else {
            boutonValider.style.background='#A7A7A7'
            champsVide.style.display ='inline'
            console.log('Assurez-vous de remplir tous les champs avant d\'envoyer.');
        }
    };
    // evenement pour valider la requete
    boutonValider.addEventListener('click', (event)=>{
        event.preventDefault()
        envoyerDonneesAPI()
    })
    
  
   
    // evenement sur l'emplacement de l'image
    // fenetreAjouterPhoto.addEventListener('submit',async(event)=>{

    //     const element   = event.target

    //     let imageUrl =''
    //     if(element.id =='inputFile') {
    //         element.addEventListener('change', ajoutPhoto)
    //         imageUrl= element.files[0]
    //     }
    //     console.log(imageUrl)
    //     const image       = imageContainer.querySelector('img') !==null
    //     const titreRempli = inputTitre.value
    //     if (image && titreRempli!=='') {
    //         boutonValider.style.background = '#1D6154';
    //         boutonValider.disabled = false;
    //         champsVide.style.display = 'none';
    //     } else {
    //         boutonValider.style.background = '#A7A7A7';
    //         boutonValider.disabled = true;
    //         champsVide.style.display = 'inline';
    //     }
    //     // console.log(image.files[0])
    // //    console.log(event.target)
    //    if(element.tagName==='BUTTON'){
    //         event.preventDefault()
    //         const categorie = selectElement.value;
    //         const formaData = new FormData()
    //         formaData.append('image',imageUrl)
    //         formaData.append('title',titreRempli)
    //         formaData.append('category',categorie)
    //         try{
    //             const requete = await fetch('http://localhost:5678/api/works',{
    //                 method:'POST',
    //                 headers: {
    //                     // 'Content-Type': 'multipart/form-data',
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`
    //                 },
    //                 body:formaData
    //             })
    //             if(requete.ok){
    //                 const reponse = await requete.json()
    //                 galleryProjet.innerHTML=''
    //                 deletebutton.innerHTML=''
    //                 afficherProjet()
    //                 console.log('projet ajouté')
    //             }else{
    //                 console.error('Erreur lors de la soumission de l\'image:', requete.status)
    //             }
    //         }catch(error){
    //             console.error('Erreur lors de la requête fetch:', error);
    //         }
          
    //    }
    // })
    
   
       


    // evenement sur la croix de l'onglet où on ajoute la photo
    ajouterPhotoOngletX.addEventListener('click', ()=>{
        formAjouterPhoto.style.display ='none'
        fenetrePhoto.style.display ='flex'

        document.body.style.background ='#0000004D'
        console.log('l\'evenement x est lu')
        
       
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

}