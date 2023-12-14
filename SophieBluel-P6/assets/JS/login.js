const url          = 'http://localhost:5678/api/users/login'
const form         = document.querySelector('.logInForm')

const myToken  ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjEyMDU0NywiZXhwIjoxNzAyMjA2OTQ3fQ.Xe-kOblCvTzMkDGpWTK9NzpkACYKZk4csie64_C3TOc'


console.log(form)
// async  function initialiserCompte(){
    

    
//         const identifiant  = {
//             email      : 'sophie.bluel@test.tld',
//             motDePasse : 'S0phie'
//         }
//         const objet = JSON.stringify(identifiant)
//         console.log(identifiant.email)

//         const requete = await fetch(url,{
//             method: 'POST',
//             headers : { 'Content-Type': 'Application/json'},
//             body: objet
//         } )
//         const reponse = await requete.json()
//         console.log(reponse)
 

// }
// initialiserCompte()

form.addEventListener('submit',async (event)=>{
    event.preventDefault()

    // const identifiant  = {
    //     email      : document.querySelector('[ name=email]').value,
    //     motDePasse : document.querySelector('[ name=password]').value
    // }
    // console.log(identifiant.email + identifiant.motDePasse)

    // const requete = await fetch(url,{
    //     method: 'POST',
    //     // mode:'cors',
    //     // credentials: 'same-origin',
    //     headers : {
    //          'Content-Type': 'Application/json',
    //         },
    //     body: JSON.stringify(identifiant)
    // })
    // if(!requete.ok){
    //     alert('une erreur est survenu')
    // }
    // const reponse = await requete.json()
    // console.log(reponse)

    window.location.href ='../../index.html'

})
