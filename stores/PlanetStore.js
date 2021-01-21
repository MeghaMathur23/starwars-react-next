import { makeAutoObservable,observable, action,computed,autorun, reaction ,runInAction } from 'mobx';
import storeAgent from '../serverApi';

class PlanetStore {

 @observable planetDetails = []
 @observable planetTotal =0
@observable nextLink =""
@observable previousLink =""

constructor() {
   
    makeAutoObservable(this)
}

@action setPlanetDetails(PlanetData) {
    this.planetDetails = PlanetData;
  }
  @action setNextLink(link) {
    this.nextLink = link;
  }

  @action setPreviousLink(link) {
    this.previousLink = link;
  }
  


  @computed get planetDetails() {
    
      return this.planetDetails
    

  }

  @action setPlanetTotal(count) {
    this.planetTotal = count;
  }

  @action async allPlanets(){
    

    return await storeAgent.allPlanet()
    .then(async(response) => {

      
      const PlanetData = await response.json()

     
      let finalResult = PlanetData.count;
      this.setPlanetTotal(finalResult)
   
   
  })
  .catch(error =>alert(error ? error : "Unable to connect"))
    
  }

  @action async searchPlanet(page) {
 
   return await storeAgent.searchPlanet(page)
    .then(async(response) => {

      
      const PlanetData = await response.json()
      let finalResult = PlanetData.results;
    

      runInAction(() => {
        this.planetDetails =finalResult;
      })
        this.setPlanetDetails(finalResult)
  
  })
  .catch(error =>alert(error ? error : "Unable to connect"))
    
    }
   
       @action async searchPlanetsList(name,page){
        return await storeAgent.searchPlanetName(name)
        .then(async(response) => {
    
          
          const PlanetData = await response.json()
          let finalResult = PlanetData.results;
        
    
          runInAction(() => {
            this.planetDetails =finalResult;
          })
            this.setPlanetDetails(finalResult)
      
      })
      .catch(error =>alert(error ? error : "Unable to connect"))
        

       }
    
    
   
    
}

export default new PlanetStore();

