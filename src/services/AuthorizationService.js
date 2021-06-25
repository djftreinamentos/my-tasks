

export async function authenticate(credential){
    let response = null;
    let result = false;
        try{
            response = await fetch('/api/v1/authenticate',{
                headers:{"Content-Type":"application/json"},
                method:"POST",
                body:JSON.stringify(credential)
            })
            if (response.status === 401){
               return result;
            }else if (response.status === 200){
                const data = await response.json();
                //preciso armazenar os dados em algum lugar

                const localStorage = window.localStorage;

                //adicionar os dados do data no localStorage
                localStorage.setItem("CURRENT_USER",objectToString(data))
                result = true;
            }

        }catch(err){
            console.log(err);
        }
        return result;
}

export async function hasAuthorization(role){
    const currentUser = getCurrentUser();
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(currentUser != null)
        },3000)
    });
}

export function getCurrentUser(){
    const localStorage = window.localStorage;
    let data =  localStorage.getItem("CURRENT_USER");
    const currentUser = stringToObject(data);
    return currentUser;
}

export function logout(){
    const localStorage = window.localStorage;
    localStorage.removeItem("CURRENT_USER");
}

function objectToString(object){
    if(object){
        return JSON.stringify(object);
    }
    return null;
}
function stringToObject(stringValue){
    if(stringValue){
        return JSON.parse(stringValue);
    }
    return null;
}