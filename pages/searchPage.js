import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import PageStepper from "../components/PageStepper";
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import _ from "lodash"
import Cookies from "js-cookie";
import Navigation from "../components/Navigation/Navigation";

const MAX_LIMIT = 15;
const USERNAME = 'Luke Skywalker';
const TIME_LIMIT = 60000;


@inject("routingStore","planetStore","authStore")

@observer
export default class SearchPage extends Component {
  
    static propTypes = {
     
       planetDetails:PropTypes.array
     
    }
  constructor(props) {
    
    super(props);

    this.state={
        details : props.planetStore.planetDetails,
        filterdValue:"",
        value: '',
        suggestions: []
    }
  
  }

 
  /** Holds previous searches time */
  userSearchArray = [];

componentDidMount() {
      
        this.props.planetStore.allPlanets().then(()=> this.setState({Totals:this.props.planetStore.planetTotal}));
        this.props.planetStore.searchPlanet(1).then(() => {}
        );

        this.props.planetStore.setPlanetDetails(this.props.planetStore.planetDetails)
}

componentDidUpdate(previousProps){


  if(previousProps.planetStore.planetDetails != this.props.planetStore.planetDetails){
     this.props.planetStore.setPlanetDetails(this.props.planetStore.planetDetails)
  }

}



 getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  if(inputLength ===0){
      return []
  }else{
    let p =  this.props.planetStore.planetDetails.filter(planet=>{
        return planet.name.toLowerCase().includes(value.toLowerCase())
       })
       this.props.planetStore.setPlanetDetails(p)
     return  _.reverse(_.sortBy(p,this.byKey("population")))

  }
 
  };

    getSuggestionValue = suggestion => suggestion.name;

    

   renderSuggestion = (suggestion,{query}) => {
    const matches = AutosuggestHighlightMatch(suggestion.name, query);
    const parts = AutosuggestHighlightParse(suggestion.name, matches);

   
    return (
      <span>
        {parts.map((part, index) => {
          
          return (
            part.highlight ?(
            <span key={index} className="react-autosuggest__suggestion-match" style={{ fontSize:suggestion.population === "unknown"?"10px":"26px",fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={index} style={{ fontSize:suggestion.population === "unknown"? "16px":(suggestion.population >=1000 || suggestion.population <100000 )?"20px":(suggestion.population >=200000 || suggestion.population <200000 )?"24px":"28px",fontWeight: 500 }}>
            {part.text}
          </strong>
        )
          );
        })}
      </span>
    );
    }
  
 
  renderFilmInfo(data){
    return( <div className="">
    <h4><b>{data.name}</b></h4> 
    <p>{data.population}</p> 
  </div>)
}



 onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    let today = Date.now();
    if(!newValue){
        this.props.planetStore.searchPlanet(1).then(() => {
 
                     })
        }

    if (this.userSearchArray.length === MAX_LIMIT &&
       Cookies.get("username") !== USERNAME) {
        let lastSearchedTime = this.userSearchArray.shift();
        if (today - lastSearchedTime < TIME_LIMIT) {
           this.setState({
              error: `More than ${MAX_LIMIT} searches not allowed`
           });
           alert("max limit done ")
        //    this.userSearchArray.push(today);
           return;
        } else {
           this.setState({
              error: ''
           });
        }
     }
     this.userSearchArray.push(today);

     let p =  this.props.planetStore.planetDetails.filter(planet=>{
        return planet.name.toLowerCase().includes(newValue.toLowerCase())
       })
    
       this.props.planetStore.setPlanetDetails(p)

  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  byKey =(key)=> {
    return function (o) {
        var v = parseInt(o[key], 10);
        return isNaN(v) ? 0 : v;
    };
}


  render() {
      const {planetStore:{planetDetails,planetTotal}} = this.props

      const { value, suggestions } = this.state;

      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'Planet Search',
        value,
        onChange: this.onChange
      };

    return (
      <Fragment>
         <Grid  container>
             <Grid item xs={12}>
                 <Navigation />

             </Grid>

             <Grid item xs={12}>
          
                  <div className = "row " style={{margin:"0",justifyContent:"center"}}>
                    <div className="input-group" style={{marginLeft:"200px",marginRight:"200px",marginBottom:"100px"}}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}

                            />
                            <div className="req-mark">Planet Search</div>
                    </div>
                </div>
             </Grid>

     
             <Grid item xs={12}>
                 
           
     <div className="row" style={{margin:"0",justifyContent:"center"}}>

         
         { planetDetails && _.reverse(_.sortBy(planetDetails,this.byKey("population"))).map((data, idx) => (
             <div className="card" style={{margin:"20px"}} key={idx}>
              
                 <div className="single-product-box" style={{cursor:"pointer" ,border:"1px solid #f2f2f2"}}>
                 <Link 
                         href="#"
                         
                         style={{textDecoration:"none"}}
                     >
                     <div className="product-image" >
                     <img src="https://images.newscientist.com/wp-content/uploads/2011/10/dn21066-1_600.jpg?width=350" alt="Avatar"/>
  
                     </div>
                    </Link>
                    

                     <div className="product-content">
                                                                                
                         {this.renderFilmInfo(data) }

                        
                        
                
                        </div>

                    
                                                                             
                 </div>
                 
                         
             </div>
         ))}
         </div>
        
     </Grid>
 

</Grid>
        <PageStepper {...this.props} pageInfo={planetDetails} total={planetTotal}  />
      </Fragment>
    );
  }
}

