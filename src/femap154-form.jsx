// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import * as R from "ramda";

import { Debug } from './formik-debug.jsx';

import * as Fragments from './femap154-form-fragments.jsx';
import { AppContext } from './contexts.js';
import * as Back from './back/back.js';


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
  
  state = { 
    form: undefined,
  };

  componentDidMount() {
    const facilityID = this.props.match.params.id;
    console.log(this)
    const form = this.context.retrieveForm(facilityID);
    this.setState({ form, dirty: false });
  }

  handleOnSave = form => {
    console.log(form);
    const facilityID = this.props.match.params.id;
    this.context.saveForm(facilityID, form); 
  }

  render() {
    const { match, classes } = this.props;

    return (
      <>
        { this.state.form && 
          <FEMA_P154_Form form={this.state.form} onSubmit={this.handleOnSave} /> 
        }
      </>
    );
  }
})


const formStyles = theme => ({
  '@global': {
    'html, body, #app': {
      overflowX: 'hidden'
    }
  },
  root: {
    padding: '2rem 1rem 1rem 1rem'
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
  // container: {
  //   '& > *': {
  //     marginBottom: '10px'
  //   }
  // },
  [theme.breakpoints.down('sm')]: {
    panelTableOverflow: { overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }
  },


  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

const initialValues = { 
  latitude: 0, longitude: 0, storiesAboveGrade: 1, occupancy: { residentialUnits: 0 }, 
  soilType: "DNK",
  hazards: { verticalIrregularity: '' } 
};    

const validationSchema = Yup.object({
  latitude: Yup.number()
    .max(90, "Latitude too high")
    .min(-90, "Latitude too low"),
  longitude: Yup.number()
    .max(180, "Longitude too high")
    .min(-180, "Longitude too low")
});


class FEMA_P154_Form extends React.Component {

  formik = React.createRef();

  constructor(props) {
    super(props);
    const form = R.mergeDeepLeft(props.form, initialValues);
    this.state = { form };
  }

  formValues() { return this.formik.current.getFormikBag().values; }

  handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log({position})
        const values = R.clone(this.formik.current.state.values);
        values.latitude = position.coords.latitude;
        values.longitude = position.coords.longitude;
        this.formik.current.setValues(values);
        
      });
    }
  }

  handleSoilLookup = () => {
    console.log(this.formik)
    const formSubset = R.pick(['latitude', 'longitude'], this.formValues());

    Back.Classify_Soil_FEMA_P154(formSubset)
      .then(result => this.formik.current.setFieldValue('soilType', result));
  }

  handleScore = e => {
    const formSubset = R.pick(['latitude', 'longitude', 'level1'], this.formValues());

    Back.Score_FEMA_P154(formSubset)
      .then(result => {
        // result = R.map(v => {
        //   if (!v) { return 'None'; }
        //   if (R.is(Number, v)) { return v.toFixed(2); } 
        //   return v;
        // }, result);
        result = R.map(R.cond([
          [R.isNil, R.always('None')],
          [R.is(Number), v => v.toFixed(2)],
          [R.T, R.identity]
        ]), result);
        this.setState({ scores: result })
      });
  }

  componentDidMount() {
  }

  render() {
    const { classes, onSubmit } = this.props;
    const { scores, form } = this.state;

    return (
      <Formik
        ref={this.formik}
        initialValues={form}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        { () => {
          console.log('formik child render')
          return (
            <Form className={classes.root}>

              <Fragments.ScoreResultsPanel classes={classes} scores={scores} onRescore={this.handleScore}/>

              <Fragments.LocationPanel classes={classes} onLocationClick={this.handleGeolocation}/>

              <Fragments.DescriptionDetails classes={classes}/>
            
              <Fragments.OccupancySoilTypeDetails classes={classes} onPerformSoilLookup={this.handleSoilLookup} />
            
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

              <Fab className={classes.fab} type="submit" color='primary' >
                <SaveIcon />
              </Fab>

            </Form>
          )
        }}
      </Formik >
    );
  }
}

FEMA_P154_Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

FEMA_P154_Form = withStyles(formStyles)(FEMA_P154_Form);
