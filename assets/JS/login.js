const url          = 'http://localhost:5678/api/users/login'
const form         = document.querySelector('.logInForm')
const error        = document.querySelector('.logInForm p')


console.log(form)



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
        if(!requete.ok){
            const reponse = await requete.json()
            if(reponse.message =='user not found'){
                error.style.display ='block'
                error.textContent=`L'email ne correspond pas`
                motDePasseInput.className='input'
                emailInput.className='error'
                console.log(reponse.message)
            }
            else{
                error.style.display ='block'    
                error.textContent =`Le mot de passe ne correspond pas`
                emailInput.className='input'
                motDePasseInput.className='error'
            }
            
        }else{
            error.style.display ='none'
            const resultat  = await requete.json()
            const userId    = resultat.id
            const userToken = resultat.token
            localStorage.setItem('token',userToken)
            localStorage.setItem('id',userId)
            console.log(userToken)

            window.location.href ='../../index.html'

        }
       


    }
    
})
