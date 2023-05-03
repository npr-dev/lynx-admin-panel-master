import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OnBoardEmail from '../../OnBoardEmail';

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
       
         <OnBoardEmail 
          color="primary"
          variant="contained"
          onClick={this.continue}
         />           
            <br />
            {/* <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button> */}
          
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;
