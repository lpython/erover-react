
import React, { PureComponent } from 'react';
import PropTypes, { array } from 'prop-types';
import classNames from 'classnames';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Field, FieldArray } from "formik";
import { TextField, Checkbox, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import * as Yup from "yup";

import { Debug } from './formik-debug.jsx';




export class ScoreResultsPanel extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Score Results</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container justify="space-around" >
            <Grid item> <Typography> SS:             </Typography> </Grid>
            <Grid item> <Typography> S1:             </Typography> </Grid>
            <Grid item> <Typography> Building Type:  </Typography> </Grid>
            <Grid item> <Typography> Level 1 Score:  </Typography> </Grid>
            <Grid item> <Typography> Level 2 Score:  </Typography> </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}


export class LocationPanel extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Location</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column" className={classes.container} >
            <Grid item > <Typography> Address : </Typography> </Grid>
            <Grid item >
              <Grid container spacing={16}>
                <Grid item xs={6} sm={2} md>
                  <Field name="latitude" type="number" label="Latitude" fullWidth component={TextField} />
                </Grid>
                <Grid item xs={6} sm={2} md>
                  <Field name="longitude" type="number" label="Longitude" fullWidth component={TextField} />
                </Grid>
                <Grid item   style={{ flexGrow: 1 }}>
                  <Grid container direction="column" spacing={8}>
                    <Grid item> <Typography> Get Lat/Lon from : </Typography> </Grid>
                    <Grid item >
                      <Grid container spacing={8}>
                        <Grid item > <Button variant="contained" >Present location</Button> </Grid>
                        <Grid item > <Button variant="contained" >Address</Button> </Grid>
                        <Grid item > <Button variant="contained" >Map</Button> </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export class DescriptionDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}> Description </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16} className={classes.container}>
            <Grid item >
              <Field name="storiesAboveGrade" type="number" label="Stories Above Grade"  component={TextField} />
            </Grid>
            <Grid item >
              <Field name="storiesBelowGrade" type="number" label="Stories Below Grade"  component={TextField} />
            </Grid>
            <Grid item >
              <Field name="yearBuilt" type="number" label="Year Built"  component={TextField} />
            </Grid>
            <Grid item >
              <Field name="yearBuilt" Label={{ label: 'Year Built is an Estimate' }} component={CheckboxWithLabel} />
            </Grid>
            <Grid item >
              <Field name="floorArea" type="number" label="Floor Area"  component={TextField} />
            </Grid>
            <Grid item >
              <Field name="codeYear" type="number" label="Code Year"  component={TextField} />
            </Grid>
            <Grid item  >
              <FormControl component="fieldset" className={classNames(classes.formControl, classes.fieldLargeMargin)}>
                <FormLabel > Are There additions? </FormLabel>
                <Field name="description.areThereAdditions" component={RadioGroup}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio disabled={false} />}
                    label="Yes"
                    disabled={false}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio disabled={false} />}
                    label="No"
                    disabled={false}
                  />
                </Field>
              </FormControl>
            </Grid>
            <Grid item >
              <AdditionalYears />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const AdditionalYears = withStyles(theme => ({
  button: {
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2
  }
}))(class AdditionalYears extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
      
        <Grid container direction="column" spacing={8}>
          <FieldArray
            name="additionalYears"
            render={arrayHelpers => {
              const { form, name } = arrayHelpers;
              const values = form.values;
              return (
                <>
                  <Typography>Additional Years: </Typography>

                  {values.additionalYears && values.additionalYears.length > 0 ? (
                    values.additionalYears.map((friend, index) => (
                      <Grid item key={index}>
                        <Field name={`additionalYears.${index}`} type="text" component={TextField} />
    
                        <Button
                          type="button" variant="outlined" size="small" className={classes.button}
                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                        >
                          +
                        </Button>
    
                        <Button
                          type="button" variant="outlined" size="small" className={classes.button}
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </Button>
                      </Grid>
                    ))
                  ) : (
                    <Grid item>
                      <Button type="button" onClick={() => arrayHelpers.push('')}>
                        {/* show this when user has removed all friends from the list */}
                        Add additional year(s)
                      </Button>
                    </Grid>
                  )}
                </>
              )
            }
          }
          />
        </Grid>
      </Paper>
    );
  }
})

export class OccupancySoilTypeDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}> Occupancy & Soil Type </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Grid container>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Occupancy </FormLabel>
                  <Grid item xs={12}>
                    <Field name="occupancy.Assembly" Label={{ label: 'Assembly' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Commercial" Label={{ label: 'Commercial' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.EmergencyServices" Label={{ label: 'Emer. Services' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Industrial" Label={{ label: 'Industrial' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Office" Label={{ label: 'Office' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.School" Label={{ label: 'School' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Utility" Label={{ label: 'Utility' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Warehouse" Label={{ label: 'Warehouse' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Residential" Label={{ label: 'Residential' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Historic" Label={{ label: 'Historic' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Shelter" Label={{ label: 'Shelter' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="occupancy.Government" Label={{ label: 'Government' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field name="occupancy.residentialUnits" type="number" label="# Residential Units" component={TextField} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Soil Type </FormLabel>
                <Field name="soilType" component={RadioGroup}>
                  <FormControlLabel value="Hard Rock" label="Hard Rock" control={<Radio />} />
                  <FormControlLabel value="Avg Rock" label="Avg Rock" control={<Radio />} />
                  <FormControlLabel value="Dense Soil" label="Dense Soil" control={<Radio />} />
                  <FormControlLabel value="Stiff Soil" label="Stiff Soil" control={<Radio />} />
                  <FormControlLabel value="Soft Soil" label="Soft Soil" control={<Radio />} />
                  <FormControlLabel value="Poor Soil" label="Poor Soil" control={<Radio />} />
                  <FormControlLabel value="DNK" label="DNK" control={<Radio />} />
                </Field>
              </FormControl>
            </Grid>
          </Grid>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export class HazardsDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Hazards </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>

            <Grid item>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Liquefaction </FormLabel>
                <Field name="hazards.liquefaction" component={RadioGroup}>
                  <FormControlLabel value="yes" label="Yes" control={<Radio />} />
                  <FormControlLabel value="no" label="No" control={<Radio />} />
                  <FormControlLabel value="DNK" label="DNK" control={<Radio />} />
                </Field>
              </FormControl>
            </Grid>
            
            <Grid item>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Landslide </FormLabel>
                <Field name="hazards.landslide" component={RadioGroup}>
                  <FormControlLabel value="yes" label="Yes" control={<Radio />} />
                  <FormControlLabel value="no" label="No" control={<Radio />} />
                  <FormControlLabel value="DNK" label="DNK" control={<Radio />} />
                </Field>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Surface Rupture </FormLabel>
                <Field name="hazards.surfaceRapture" component={RadioGroup} >
                  <FormControlLabel value="yes" label="Yes" control={<Radio />} />
                  <FormControlLabel value="no" label="No" control={<Radio />} />
                  <FormControlLabel value="DNK" label="DNK" control={<Radio />} />
                </Field>
              </FormControl>
            </Grid>

            <Grid item>
              <Grid container >
                <FormControl component="fieldset"  className={classes.formControl}>
                  <FormLabel > Exterior Falling Hazards </FormLabel>
                  <Grid item xs={12}>
                    <Field name="hazards.exteriorFalling.unbraced Chimneys" Label={{ label: 'Unbraced Chimneys' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="hazards.exteriorFalling.claddingOrVeneer"
                      Label={{ label: 'Heavy Cladding or Heavy Veneer' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Adjacency </FormLabel>
                  <Grid item xs={12}>
                    <Field name="hazards.adjacency.pounding" Label={{ label: 'Pounding' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="hazards.adjacency.tallerBuilding"
                      Label={{ label: 'Falling Hazards from Taller Adjacent Building' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item className={classes.textField}>
              <Field
                type="text"
                name="hazards.verticalIrregularity"
                label="Vertical Irregularity"
                rows="10"
                multiline
                fullWidth
                component={TextField} />
            </Grid>

            <Grid item className={classes.textField}>
              <Field
                type="text"
                name="hazards.planIrregularity"
                label="Plan Irregularity"
                rows="10"
                multiline
                fullWidth
                component={TextField} />
            </Grid>

            <Grid item className={classes.textField}>
              <Field
                type="text"
                name="hazards.otherExteriorFalling"
                label="Other Exterior Falling Hazards"
                rows="10"
                multiline
                fullWidth
                component={TextField} />
            </Grid>

          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    );
  }
}


const CustomTableCell = withStyles(theme => ({
  root: {
    padding: '4px 15px 4px 7px'
  },
  head: {
    // backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export let Level1ScorePanel = withStyles(theme => ({
  // table: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   height: '100%',
  //   "&>thead, &>tbody": {
  //     display: 'block',
  //   },
  //   '&>thead': {
  //     //margin-right: 0px, //margin to align correctly to scrollbar in table body
  //   } ,
  //   '&>tbody': {
  //     flex: 1, //variable height
  //     overflowY: 'scroll'
  //   },
  //   '&>tr': {
  //     width: '100%',
  //     display: 'flex',
  //     '&>td, &>th': {
  //       display: 'block',
  //       flex: 1
  //     }
  //   }
  // }
  [theme.breakpoints.down('sm')]: {
    panelDetails: { overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }
  }
}))(class Level1ScorePanel extends PureComponent {
  render() {
    const { classes } = this.props;

    const rows = [ 'W1', 'W1A', 'W2', 'S1', 'S2', 'S3', 'S4', 'S5', 'C1', 'C2', 'C3', 'PC1', 'PC2', 'RM1', 'RM2', 'URM' ];

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Level 1 Score </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Building Type</CustomTableCell>
                <CustomTableCell >Severe Vertical Irregularity</CustomTableCell>
                <CustomTableCell >Moderate Vertical Irregularity</CustomTableCell>
                <CustomTableCell >Plan Irregularity</CustomTableCell>
                <CustomTableCell >Pre Code</CustomTableCell>
                <CustomTableCell >Post Benchmark</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow className={classes.row} key={i}>
                  <CustomTableCell component="th" scope="row">
                    {row}
                  </CustomTableCell>

                  <CustomTableCell >
                    <Field name={"level1." + row + ".severe"} component={Checkbox} />
                  </CustomTableCell>
                  <CustomTableCell >
                    <Field name={"level1." + row + ".moderate"} component={Checkbox} />
                  </CustomTableCell>
                  <CustomTableCell >
                    <Field name={"level1." + row + ".plan"} component={Checkbox} />
                  </CustomTableCell>
                  <CustomTableCell >
                    <Field name={"level1." + row + ".preCode"} component={Checkbox} />
                  </CustomTableCell>
                  <CustomTableCell >
                    <Field name={"level1." + row + ".postBench"} component={Checkbox} />
                  </CustomTableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
})

export class ExtentOfReviewDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Extent of Review </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <Grid item>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <FormControl component="fieldset" style={{ marginTop: '16px' }} className={classes.formControl}>
                    <FormLabel > Exterior </FormLabel>
                    <Grid item xs={12}>
                      <Field name="extentOfReview.exterior.partial" Label={{ label: 'Partial' }} component={CheckboxWithLabel} />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="extentOfReview.exterior.allSides"
                        Label={{ label: 'All sides' }} component={CheckboxWithLabel} />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="extentOfReview.exterior.DNK"
                        Label={{ label: 'DNK' }} component={CheckboxWithLabel} />
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset" style={{ marginTop: '16px' }} className={classes.formControl}>
                    <FormLabel > Interior </FormLabel>
                    <Grid item xs={12}>
                      <Field name="extentOfReview.interior.none" Label={{ label: 'None' }} component={CheckboxWithLabel} />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="extentOfReview.interior.visible"
                        Label={{ label: 'Visible' }} component={CheckboxWithLabel} />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="extentOfReview.interior.entered"
                        Label={{ label: 'Entered' }} component={CheckboxWithLabel} />
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Field name="extentOfReview.soilTypeSource" type="text" label="Soil Type Source" fullWidth component={TextField} />
            </Grid>
            <Grid item>
              <Field name="extentOfReview.geoHazardsSource" type="text" label="Geologic Hazards Source" fullWidth component={TextField} />
            </Grid>
            <Grid item>
              <Field name="extentOfReview.contactPerson" type="text" label="Contact Person" fullWidth component={TextField} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export class OtherHazardsActionsDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Other Hazards & Actions Required </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Are There Hazards That Trigger A Detailed Structural Evaluation? </FormLabel>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.areThereHazardsThatTriggerADetailedStructuralEvaluation.poundingPotential"
                      Label={{ label: 'Pounding Potential (unless SL2 > cut-off, if known)' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.areThereHazardsThatTriggerADetailedStructuralEvaluation.tallerAdjacentBuilding"
                      Label={{ label: 'Falling hazards from taller adjacent building' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.areThereHazardsThatTriggerADetailedStructuralEvaluation.geoHazardsOrSoilTypeF"
                      Label={{ label: 'Geologic hazards or Soil Type F' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.areThereHazardsThatTriggerADetailedStructuralEvaluation.significantDamage"
                      Label={{ label: 'Significant damage/deterioration to the structural system' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item  >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Detailed Structural Evaluation Required? </FormLabel>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.detailedStructuralEvaluationRequired.yesUnknownType"
                      Label={{ label: 'Yes, unknown FEMA building type or other building' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.detailedStructuralEvaluationRequired.yesScore"
                      Label={{ label: 'Yes, score less than cut-off' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.detailedStructuralEvaluationRequired.yesOtherHazards"
                      Label={{ label: 'Yes, other hazards present' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="otherHazardsAndActionsRequired.detailedStructuralEvaluationRequired.no"
                      Label={{ label: 'Significant damage/deterioration to the structural system' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item lg={4}>
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Detailed Nonstructural Evaluation Recommended? </FormLabel>
                  <Field name="otherHazardsAndActionsRequired.detailedNonstructuralEvaluationRecommended" component={RadioGroup} >
                    <FormControlLabel
                      value="yes"
                      label="Yes, nonstructural hazards identified that should be evaluated"
                      control={<Radio />} />
                    <FormControlLabel
                      value="noButPotentialHazards"
                      label="No, nonstructural hazards exist that may require mitigation, but a detailed evaluation is not necessary"
                      control={<Radio />} />
                    <FormControlLabel
                      value="no"
                      label="No, no nonstructural harard is identified"
                      control={<Radio />} />
                    <FormControlLabel
                      value="DNK"
                      label="DNK"
                      control={<Radio />} />
                  </Field>
                </FormControl>
              </Grid>
            </Grid>

          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export class Level2VerticalDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Level 2 Vertical Irregularity </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>

            <Grid item >
              <Grid container direction="column" >
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Sloping Site </FormLabel>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.slopingSite.W1building"
                      Label={{ label: 'W1-building' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.slopingSite.nonW1building"
                      Label={{ label: 'Non W1-building' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Weak and/or Soft Story </FormLabel>
                  <Field name="level2VerticalIrregularity.weakAndOrSoftStory" component={RadioGroup} >
                    <FormControlLabel
                      value="W1Cripple"
                      label="W1-building cripple wall"
                      control={<Radio />} />
                    <FormControlLabel
                      value="W1OverGarage"
                      label="W1 house over garage"
                      control={<Radio />} />
                    <FormControlLabel
                      value="W1ABuildingOpenFront"
                      label="W1A building open front"
                      control={<Radio />} />
                    <FormControlLabel
                      value="NonW1LessThan50"
                      label="Non-W1 building <50%"
                      control={<Radio />} />
                    <FormControlLabel
                      value="NonW1GreaterThan50"
                      label="Non-W1 building >50%"
                      control={<Radio />} />
                  </Field>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Setback </FormLabel>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.setback.diaphragmCantilever"
                      Label={{ label: 'Diaphragm cantilever' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.setback.elementsInboard"
                      Label={{ label: 'Vert elements inboard of story below' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.setback.inPlaneOffsetGreaterElementLength"
                      Label={{ label: 'In-plane offset of vert elements > element length' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Short Column/Pier </FormLabel>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.shortColumnPier.somePiersInSignificantLineDepth"
                      Label={{ label: '>=20% piers in line height/depth < 50%' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.shortColumnPier.pierWidthSignificantLessThenSpandrelDepth"
                      Label={{ label: 'Pier width < 1/5 spandrel depth' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Split Level </FormLabel>
                <Field
                  name="level2VerticalIrregularity.splitLevelNearRoof"
                  Label={{ label: 'There is a split level at one of the floor levels or at the roof.' }} component={CheckboxWithLabel} />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Other </FormLabel>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.other.severe"
                      Label={{ label: 'Severe' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2VerticalIrregularity.other.moderate"
                      Label={{ label: 'Moderate' }} 
                      component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}


export class Level2OtherDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Level 2 Other Structural Modifiers </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item >
              <Grid container direction="column" >
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Plan Irregularity </FormLabel>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.torsionNotW1A"
                      Label={{ label: 'Torsion (not W1A open front)' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.nonParallelSystem"
                      Label={{ label: 'Non Parallel System' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.reentrantCornerGT25"
                      Label={{ label: 'Reentrant corner > 25' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.openDiaphragmGT50"
                      Label={{ label: 'Open diaphragm > 50%' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.c1c2beamsNotAligned"
                      Label={{ label: 'C1 C2 beams not aligned w/ columns' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.otherPlanIrregularity"
                      Label={{ label: 'Other plan irregularity' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > Pounding </FormLabel>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.floorsDoNotAlignGT2Feet"
                      Label={{ label: 'Floors do not align > 2 ft' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.storyDiff2Plus"
                      Label={{ label: '2+ story diff' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.planIrregularity.endOfBlock"
                      Label={{ label: 'End of block' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > PC1/RM1 Bldg </FormLabel>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.PC1orRM1bldg.roofWallStringLedger"
                      Label={{ label: 'Roof-wall ties w/ string ledger' }} component={CheckboxWithLabel} />
                  </Grid>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.PC1orRM1bldg.interiorCrosswalls"
                      Label={{ label: 'Interior crosswalls' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <Grid container direction="column">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel > S2 Building </FormLabel>
                  <Grid item >
                    <Field
                      name="level2otherStructureModifiers.S2Building.kBracingGeoVisible"
                      Label={{ label: '"K" bracing geometry is visible' }} component={CheckboxWithLabel} />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > C1 Building </FormLabel>
                <Field
                  name="level2otherStructureModifiers.C1Building.flatPlateAsBeam"
                  Label={{ label: 'Flat plate serves as the beam in the moment frame.' }} component={CheckboxWithLabel} />
              </FormControl>
            </Grid>

            <Grid item >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > URM </FormLabel>
                <Field
                  name="level2otherStructureModifiers.URM.gableWalls"
                  Label={{ label: 'Gable walls are present.' }} component={CheckboxWithLabel} />
              </FormControl>
            </Grid>

            <Grid item >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > MH </FormLabel>
                <Field
                  name="level2otherStructureModifiers.MH.supplementalBracing"
                  Label={{ label: 'There is a supplemental seismic bracing system provided between the carriage and the ground.' }}
                  component={CheckboxWithLabel} />
              </FormControl>
            </Grid>

            <Grid item >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Retrofit </FormLabel>
                <Field
                  name="level2otherStructureModifiers.retrofit.comprehensiveVisible"
                  Label={{ label: 'Comprehensive seismic retrofit is visible or known from drawings.' }} component={CheckboxWithLabel} />
              </FormControl>
            </Grid>

            <Grid item >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel > Redundancy </FormLabel>
                <Field
                  name="level2otherStructureModifiers.redundancy"
                  Label={{ label: 'The building has at least two bays of lateral elements on each side of the building in each direction.' }}
                  component={CheckboxWithLabel} />
              </FormControl>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export class Level2NonStructuralDetails extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> Level 2 Non-Structural Hazards </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column" wrap="nowrap" spacing={16}>
            <Grid item >
              <Grid container direction="row" spacing={16}>
                <Grid item xs={12} sm={6}>
                  <Grid container direction="column" >
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel > Exterior </FormLabel>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.unbracedURMparapetOrChimney"
                          Label={{ label: 'Unbraced URM parapet or chimney' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.heavyCladdingOrHeavyVeneer"
                          Label={{ label: 'Heavy cladding or heavy veneer' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.heavyWeakExit"
                          Label={{ label: 'Heavy weak exit or walkway canopy' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.URMappendageOverExit"
                          Label={{ label: 'URM appendage over exit or walkway' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.hazardMaterial"
                          Label={{ label: 'Hazmat' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.adjacentBuildingUnbracedURM"
                          Label={{ label: 'Adjacent building with overhead unbraced URM' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.exterior.other"
                          Label={{ label: 'Other ext nonstructural falling hazard' }} component={CheckboxWithLabel} />
                      </Grid>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container direction="column" >
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel > Interior </FormLabel>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.tallUnanchoredFurniture"
                          Label={{ label: 'Tall unanchored furniture' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.unbracedSuspendedCeiling"
                          Label={{ label: 'Unbraced suspended ceiling' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.lightsLackSafetyWires"
                          Label={{ label: 'Lights in overhead grid lack safety wires' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.elevatorsNoEmergencyPower"
                          Label={{ label: 'Elevators lack emergency power' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.HCTwallsStair"
                          Label={{ label: 'HCT walls at stair or exist' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.unanchoredElectricalEquipment"
                          Label={{ label: 'Unanchored electrical equipment' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.rotatingEquipNoSnubbers"
                          Label={{ label: 'Rotating equipment lack snubbers' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.rigidPipeToMechOrEquip"
                          Label={{ label: 'Rigid pipe connection to mech or plumbing eqpt' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.batteryRacksNoAnchorage"
                          Label={{ label: 'Battery racks lack anchorage or bracing' }} component={CheckboxWithLabel} />
                      </Grid>
                      <Grid item >
                        <Field
                          name="level2nonStructureHazards.interior.other"
                          Label={{ label: 'Other int nonstructural hazard' }} component={CheckboxWithLabel} />
                      </Grid>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Field
                type="text"
                name="level2nonStructureHazards.comments"
                label="Comments"
                multiline
                rows="10"
                fullWidth
                component={TextField} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel >
    );
  }
}

export class TextAreaPanel extends PureComponent {
  render() {
    const { classes, name, label } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}> { label } </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Field
            type="text"
            name={name}
            multiline
            rows="10"
            fullWidth
            component={TextField} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}


// export class A extends PureComponent {
//   render() {
//     const { classes } = this.props;
//     return (
 
//     );
//   }
// }