import { observable, action,makeAutoObservable,computed } from 'mobx';
class RoutingStore {
  @observable currentPage = 0;

  constructor() {
   
    makeAutoObservable(this)
}

  @action setcurrentPage(page) {
    this.currentPage = page;
  }


  
  @computed get getcurrentPage() {
    
    return this.currentPage
  

}

}

export default new RoutingStore();
