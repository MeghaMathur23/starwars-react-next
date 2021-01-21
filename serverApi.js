
/* ServerAPI talks REST with the backend server.

*/


const URL_STARWARS = "https://swapi.dev/api/";

class ServerAPI {

  

  async  login(userName, password){
       
        return fetch(`${URL_STARWARS}people/?search=${userName}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
               'Content-Type': 'application/json',
               'User-Agent': 'swapi-javascript'
            },
          })

    }

      searchPlanet(pageNo){
       
        return fetch(`${URL_STARWARS}planets/?page=${pageNo}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
               'Content-Type': 'application/json',
               'User-Agent': 'swapi-javascript'
            },
          })

    }

    searchPlanetName(Name){
       
        return fetch(`${URL_STARWARS}planets/?name=${Name}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
               'Content-Type': 'application/json',
               'User-Agent': 'swapi-javascript'
            },
          })

    }

    allPlanet(){
       
        return fetch(`${URL_STARWARS}planets/`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
               'Content-Type': 'application/json',
               'User-Agent': 'swapi-javascript'
            },
          })

    }

   
}

// export singleton API
const api = new ServerAPI();
export default api;
