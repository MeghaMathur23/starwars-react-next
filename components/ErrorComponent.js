import React from 'react';

class ErrorComponent extends React.Component {

  render() {
   
    const errors = this.props.errors;
    if (errors) {
      return (
        <ul className="error-messages">
          {
                <li > {errors}
                </li>
              
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ErrorComponent;
