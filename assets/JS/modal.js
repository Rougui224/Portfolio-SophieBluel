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

    //   div.addEventListener('click', async ()=> {
    //     const id = div.dataset.id
    //     console.log(id)
    //     const requete = await fetch(`${urlWorks}/${id}`,{
    //         method:'DELETE',
    //         headers : {
    //              Authorization: `Bearer ${myToken}`,
    //             'Content-Type': 'Application/json',
    //         }
    //     })
    //     if(!requete.ok){
    //         alert('error lors de la suppression')
    //     }
    //     const result = await requete.json()
    //     console.log(result)
    //   })
    }
    
}
export function eventModal(){
    const boutonModifier      = document.querySelector('.modifier')
    const fenetrePhoto        = document.querySelector('.galeriePhoto')
    const fenetreAjouterPhoto = document.querySelector('.ajouterPhoto')
    const galeriePhotoX       = document.querySelector('.galeriePhoto .fa-x')
    const galeriePhotoButton  = document.querySelector('.galeriePhoto button')
    const ajouterPhotoOngletX = document.querySelector('.ajouterPhoto .fa-x')
    const iconImage           = document.querySelector('.ajouterPhoto .fa-image')
    const inputImage          = document.querySelector('#inputFile')
    // evenement sur le bouton modifier
boutonModifier.addEventListener('click', ()=>{
    fenetrePhoto.style.display ='flex'
    document.body.style.background ='#0000004D'
    

}) 
 // evenement sur la croix de l'onglet galerie photo

galeriePhotoX.addEventListener('click', ()=>{
        fenetrePhoto.style.display ='none'
        document.body.style.background ='white'
})
// evenement sur le bouton ajouter photo
galeriePhotoButton.addEventListener('click', ()=>{
    document.querySelector('.ajouterPhoto').style.display ='flex'
    document.body.style.background ='#0000004D'

})
// evenement sur la croix de l'onglet où on ajoute la photo
ajouterPhotoOngletX.addEventListener('click', ()=>{
    fenetreAjouterPhoto.style.display ='none'
    fenetrePhoto.style.display ='flex'

    document.body.style.background ='#0000004D'
    console.log('l\'evenement x est lu')
    

})
// ajout de la photo
function ajoutPhoto (event) {
    document.body.style.background ='#0000004D'

       const imageSelictionnee = event.target.files[0]
       if(imageSelictionnee){
           const lecteurImage = new FileReader()
           lecteurImage.onload = (event)=>{
               const imageUrl = event.target.result

               // Créons un element image et définissons son attribut avec l'url
               const imageElement   = document.createElement('img')
               imageElement.src     = imageUrl
               const imageContainer = document.querySelector('.ajouterPhoto .ajouterPhoto_photo')
               imageContainer.style.padding ='0px 10px'
               imageContainer.innerHTML=""
               imageContainer.appendChild(imageElement)
              
            }

           lecteurImage.readAsDataURL(imageSelictionnee)
           console.log('l\'evenement input est lu')

        }
  
}
// evenement pour charger l'image
inputImage.addEventListener('change', ajoutPhoto)

// evenement en dehors de la fenetre
window.addEventListener('click', (event)=>{
    if(!fenetrePhoto.contains(event.target) && !fenetreAjouterPhoto.contains(event.target)){
        fenetrePhoto.style.display ='none'
        fenetreAjouterPhoto.style.display= 'none'
        document.body.style.background ='white'
        console.log('clique en dehors du boutto')
    }
} , true)

}