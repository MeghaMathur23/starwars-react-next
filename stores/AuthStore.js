import { observable, action ,makeAutoObservable} from 'mobx';
import storeAgent from '../serverApi';

class AuthStore {
  @observable inProgress = false;
  @observable errors = "";
 @observable userDetails = []
  @observable values = {
    username: '',
    password: '',
  };

  constructor() {
   
    makeAutoObservable(this)
}
  @action setUsername(username) {
    this.values.username = username;
  }

  @action setUserDeatails(userData) {
    this.userDetails = userData;
  }

  

  @action setPassword(password) {
    this.values.password = password;
  }

  @action setErrors(err) {
    this.errors = err;
  }

  @action reset() {
    this.values.username = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
   return storeAgent.login(this.values.username, this.values.password)
    .then(async(response) => {

      
      const userData = await response.json()
      let finalResult = userData.results;

     
      if (userData.count === 0) {

        this.setErrors('Sorry !! need to register with us')
      
      }else{

            let userFound = false;
        for (let i = 0, len = finalResult.length; i < len; i++) {
           let user = finalResult[i];
           if (user.name === this.values.username &&
              user.birth_year === this.values.password) {
              userFound = true;
              this.setUserDeatails(finalResult)
              this.setErrors(null)
        
           }
        }
        if (!userFound) {
        this.setErrors('Oops!! please check username and password')

        }

      }
   
  })
  .catch(error => this.setErrors(error ? error : "Unable to connect"))
    
    }

 
}

export default new AuthStore();
