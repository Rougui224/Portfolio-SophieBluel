const url          = 'http://localhost:5678/api/users/login'
const form         = document.querySelector('.logInForm')
const error        = document.querySelector('.logInForm p')
function gererErreur(elementA,elementB){
    error.style.display ='block'    

    elementA.className='input'
    elementB.className='error'
}
form.addEventListener('submit',async (event)=>{
    event.preventDefault()
    const emailInput      = document.querySelector('[ name=email]')
    const motDePasseInput = document.querySelector('[ name=password]')
    const email           = emailInput.value
    const motDePasse      = motDePasseInput.value

    if(email==''||motDePasse==''){
         error.style.display ='block'
         emailInput.className='error'
         motDePasseInput.className='error' 
         error.textContent ='Entrez vos identifiant.'

        return
    }else{
        const identifiant  = {
            email      :email ,
            password   : motDePasse
        }

        const requete = await fetch(url,{
            method: 'POST',
            headers : {
                'Content-Type': 'Application/json',
                },
            body: JSON.stringify(identifiant)
        })
        if(requete.ok){
            const resultat  = await requete.json()
            const userToken = resultat.token
            sessionStorage.setItem('token',userToken)

            window.location.href ='../../index.html'
         
        }else{
            const reponse = await requete.json()
            if(reponse.message =='user not found'){
                gererErreur(motDePasseInput,emailInput)
                error.textContent=`L'email ne correspond pas`
            }
            else{
                gererErreur(emailInput,motDePasseInput)
                error.textContent =`Le mot de passe ne correspond pas`

            }

        }
       


    }
    
})
