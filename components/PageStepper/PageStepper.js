import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
import Grid from "@material-ui/core/Grid";

import { observer,inject } from "mobx-react";

@inject("routingStore","planetStore")
@observer
export default class PageStepper extends Component {
  static propTypes = {
    classes: PropTypes.object,
   
    theme: PropTypes.object
   
  };
 
  constructor(props) {
    
    super(props);
    this.pagesCount = Math.ceil(props.total / 10);
      props.routingStore.setcurrentPage(1)
   
  }
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  getPlanetDetailsByPage = (pageNo) => {
    this.props.routingStore.setcurrentPage(pageNo)
    this.props.planetStore.searchPlanet(pageNo);
  }

  getDataOnPagination = (pageNo) => {
    this.getPlanetDetailsByPage(pageNo)
  }
 
 

  handleClick(e, index) {
   
    const { pageInfo,routingStore,planetStore } = this.props;
     e.preventDefault();
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    routingStore.setcurrentPage(index)
    
    planetStore.setPlanetDetails(this.getDataOnPagination(index))
  
//    if(routingStore.currentPage === index){
//     Router.push(planetStore.nextLink)
//     //pageInfo.loadSamePage(index);
//    }else if(routingStore.currentPage > index){
//     Router.push(planetStore.previousLink)
//     //    pageInfo.loadPreviousPage(index);
//     }else{
     
//         Router.push(planetStore.nextLink)
//         }

  }

//     handleNextClick = (index) => {
//     const { pageInfo } = this.props;

//     if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }

//     pageInfo.loadNextPage(index);
//   }
 

//   handlePreviousClick = (index) => {
//     const { pageInfo } = this.props;

//     if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }

//     pageInfo.loadPreviousPage(index);
//   }




  render() {
    const { classes, pageInfo,routingStore,total } = this.props;

    return (
      <Grid  container justify="space-between">
        <Grid item>
          {/* {pageInfo.hasPreviousPage &&
            <Button onClick={this.handlePreviousClick}>Previous</Button>
          } */}
        </Grid>
        
        <Grid item>
       
            <Pagination >
            
            <PaginationItem disabled={routingStore.currentPage <= 0}>
              
              <PaginationLink
                  onClick={e => this.handleClick(e, routingStore.currentPage - 1)}
                
                previous
                href="#"
              />
              
            </PaginationItem>

            {[...Array( Math.ceil(total / 10))].map((page, i) => 
              <PaginationItem active={i=== routingStore.currentPage-1} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i+1)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

              <PaginationItem disabled={routingStore.currentPage >= (( Math.ceil(total / 10)) - 1)}>

              <PaginationLink
                  onClick={e => this.handleClick(e, routingStore.currentPage + 1)}
                next
                href="#"
              />
              
            </PaginationItem>
            
          </Pagination>
        </Grid>

        <Grid item>
       
        </Grid>
      </Grid>
    );
  }
}
