
import {getCurrentUser} from './AuthorizationService';

export async function get(path){
    const user = getCurrentUser();
    let headers = {};
    if(user){
        headers['Authorization'] = "Bearer "+ user.token
    }
    const response = await fetch(path,{
        method:"GET",
        headers:headers
    })
    return await response.json()
}

export async function post(path,body){
    const user = getCurrentUser();
    let headers = {"Content-Type":"application/json"};
    if(user){
        headers['Authorization'] = "Bearer "+ user.token
    }
    const response = await fetch(path,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    })
    return await response.json()
}
export async function put(path,body){
    const user = getCurrentUser();
    let headers = {"Content-Type":"application/json"};
    if(user){
        headers['Authorization'] = "Bearer "+ user.token
    }
    const response = await fetch(path,{
        method:"PUT",
        headers:headers,
        body:JSON.stringify(body)
    })
    return await response.json()
}

export async function remove(path){
    const user = getCurrentUser();
    let headers = {};
    if(user){
        headers['Authorization'] = "Bearer "+ user.token
    }
    const response = await fetch(path,{
        method:"DELETE",
        headers:headers
    })
    return await response.json()
}