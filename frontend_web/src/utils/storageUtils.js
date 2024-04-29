
export let setLocalStorage = (key, value)=>{
    if(value && typeof value === "string"){
        localStorage.setItem(key,value);
    }else{
        localStorage.setItem(key, JSON.stringify(value));
    }
}
export let getLocalStorage = (key)=>{
    const data = localStorage.getItem(key);
    return data;
    // try{
    //     return JSON.parse(data);
    // }catch(err){
    //     return err;
    // }
}

export let removeLocalStorage = (key) => localStorage.removeItem(key);



export const getCookie = (name) => {
    const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith(name + '='));
    
    return cookie ? cookie.substring(name.length + 1) : null;
  };
  