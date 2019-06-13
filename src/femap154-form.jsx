// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { Formik, Field, Form } from "formik";
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import * as Yup from "yup";

import { Debug } from './formik-debug.jsx';

import * as Fragments from './femap154-form-fragments.jsx';
import { AppContext } from './contexts.js';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px - 48px)'
    }
  },
  item: {
    padding: '20px',
    margin: '5px',
    width: '100%'
  }
});

export default withStyles(styles)(class FEMA_P154 extends React.Component {
  static contextType = AppContext;
  
  state = { form: undefined };

  componentDidMount() {
    const facilityID = this.props.match.params.id;
    console.log(this)
    const form = this.context.retrieveForm(facilityID);
    this.setState({ form });
  }

  render() {
    const { match, classes } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid item className={classes.item}>
          { this.state.form && <FEMA_P154_Form form={this.state.form} /> }
        </Grid>
      </Grid>
    );
  }
})



const formStyles = theme => ({
  '@global': {
    'html, body, #app': {
      overflowX: 'hidden'
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(17.5),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    '& > label': {
      marginBottom: theme.spacing.unit
    },
    '& > div > label > span': {
      paddingTop: theme.spacing.unit / 2,
      paddingBottom: theme.spacing.unit / 2
    }
  },
  button: {
    '& > button': {
      margin: theme.spacing.unit
    }
  },
  textField: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20rem'
    }
  },
  fieldLargeMargin: {
    margin: theme.spacing.unit * 3,
  },
  container: {
    '& > *': {
      marginBottom: '10px'
    }
  }
});

// const initialValues = { 
//   latitude: 0, longitude: 0, storiesAboveGrade: 1, occupancy: { residentialUnits: 0 }, 
  
//   hazards: { verticalIrregularity: '' } 
// };    

const validationSchema = Yup.object({
  latitude: Yup.number()
    .max(90, "Latitude too high")
    .min(-90, "Latitude too low"),
  longitude: Yup.number()
    .max(90, "Longitude too high")
    .min(-90, "Longitude too low")
});


let FEMA_P154_Form = (props) => {
  const { classes } = props;
  return (
    <Formik
      initialValues={props.form}
      validationSchema={validationSchema}
      onSubmit={(e) => { }}
    >
      { (props) => {
            
        console.log(props);

        return (
          <Form className={classes.root}>

            <Fragments.ScoreResultsPanel classes={classes} />

            <Fragments.LocationPanel classes={classes} />

            <Fragments.DescriptionDetails classes={classes}/>
          
            <Fragments.OccupancySoilTypeDetails classes={classes}/>
           
            <Fragments.HazardsDetails classes={classes} />
           
            <Fragments.TextAreaPanel name="comments" label="Comments" classes={classes}/>

            <Fragments.Level1ScorePanel classes={classes} />  

            <Fragments.ExtentOfReviewDetails classes={classes} />
         
            <Fragments.OtherHazardsActionsDetails classes={classes}/>
            
            <Fragments.Level2VerticalDetails classes={classes} />
            
            <Fragments.Level2OtherDetails classes={classes} /> 
        
            <Fragments.Level2NonStructuralDetails classes={classes}/>
      
            <Fragments.TextAreaPanel name="level2comments" label="Level 2 Comments" classes={classes}/>

            <Debug />
          </Form>
        );
      }}
    </Formik >
  );
}

FEMA_P154_Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

FEMA_P154_Form = withStyles(formStyles)(FEMA_P154_Form);
