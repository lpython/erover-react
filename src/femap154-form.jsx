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
  fieldLargeMargin: {
    margin: theme.spacing.unit * 3,
  },
  container: {
    '& > *': {
      marginBottom: '10px'
    }
  }
});

const initialValues = { latitude: 0, longitude: 0, occupancy: { residentialUnits: 0 }, hazards: { verticalIrregularity: '' } };    

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
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e) => { }}
    >
      { (props) => {
            
        console.log(props);

        return (
          <Form className={classes.root}>

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

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Location</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container className={classes.container} >
                  <Grid item xs={12}> <Typography> Address : </Typography> </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={16}>
                      <Grid item xs={4}>
                        <Field name="latitude" type="number" label="Latitude" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={4}>
                        <Field name="longitude" type="number" label="Longitude" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={4}>
                        <Grid container spacing={8}> 
                          <Grid item xs={12}> <Typography> Get Lat/Lon from : </Typography> </Grid>
                          <Grid item > 
                            <Grid container spacing={8}>
                              <Grid item xs={6}> <Button variant="contained" fullWidth>Present location</Button> </Grid>
                              <Grid item xs={3}> <Button variant="contained" fullWidth>Address</Button> </Grid>
                              <Grid item xs={3}> <Button variant="contained" fullWidth>Map</Button> </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}> Description </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column" className={classes.container}>
                  <Grid item xs={12}> 
                    <Grid container spacing={16}>
                      <Grid item xs={3}>
                        <Field name="storiesAboveGrade" type="number" label="Stories Above Grade" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={3}>
                        <Field name="storiesBelowGrade" type="number" label="Stories Below Grade" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={3}>
                        <Field name="yearBuilt" type="number" label="Year Built" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={3}>
                        <Field name="yearBuilt" Label={{ label: 'Year Built is an Estimate' }} component={CheckboxWithLabel} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={16}>
                      <Grid item xs={3}>
                        <Field name="floorArea" type="number" label="Floor Area" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={3}>
                        <Field name="codeYear" type="number" label="Code Year" fullWidth component={TextField} />
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl component="fieldset" className={classNames(classes.formControl, classes.fieldLargeMargin)}>
                          <FormLabel > Are There additions? </FormLabel>
                          <Field name="description.areThereAdditions"  component={RadioGroup}>
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
                      <Grid item xs={3}>
                        <Typography>Additional Years PLACEHOLD</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}> Occupancy & Soil Type </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container >
                  <Grid item xs={4}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel > Occupancy </FormLabel>
                      <Grid container>
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
                      </Grid>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Field name="occupancy.residentialUnits" type="number" label="# Residential Units"  component={TextField} />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel > Soil Type </FormLabel>
                      <Field name="soilType" component={RadioGroup}>
                        <FormControlLabel value="Hard Rock" label="Hard Rock" control={<Radio />}/>
                        <FormControlLabel value="Avg Rock" label="Avg Rock" control={<Radio />}/>
                        <FormControlLabel value="Dense Soil" label="Dense Soil" control={<Radio />}/>
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
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Hazards </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column" spacing={16}>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > Liquefaction </FormLabel>
                          <Field name="hazards.liquefaction" component={RadioGroup}>
                            <FormControlLabel value="yes" label="Yes" control={<Radio />}/>
                            <FormControlLabel value="no" label="No" control={<Radio />}/>
                            <FormControlLabel value="DNK" label="DNK" control={<Radio />}/>
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > Landslide </FormLabel>
                          <Field name="hazards.landslide" component={RadioGroup}>
                            <FormControlLabel value="yes" label="Yes" control={<Radio />}/>
                            <FormControlLabel value="no" label="No" control={<Radio />}/>
                            <FormControlLabel value="DNK" label="DNK" control={<Radio />}/>
                          </Field>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Grid item>
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > Surface Rupture </FormLabel>
                          <Field name="hazards.surfaceRapture" component={RadioGroup} >
                            <FormControlLabel value="yes" label="Yes" control={<Radio />}/>
                            <FormControlLabel value="no" label="No" control={<Radio />}/>
                            <FormControlLabel value="DNK" label="DNK" control={<Radio />}/>
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        {/* <Grid container> */}
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Adjacency </FormLabel>
                            <Grid item xs={12}>
                              <Field name="hazards.adjacency.pounding" Label={{ label: 'Pounding' }} component={CheckboxWithLabel}/>
                            </Grid>
                            <Grid item xs={12}>
                              <Field 
                                name="hazards.adjacency.tallerBuilding" 
                                Label={{ label: 'Falling Hazards from Taller Adjacent Building' }} component={CheckboxWithLabel} />
                            </Grid>
                          </FormControl>
                        {/* </Grid> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={16}>
                      <Grid item xs={6}>
                        <Field 
                          type="text" 
                          name="hazards.verticalIrregularity" 
                          label="Vertical Irregularity" 
                          multiline 
                          rows="10"
                          fullWidth
                          component={TextField} />
                      </Grid>
                      <Grid item xs={6}>
                        <Field 
                          type="text" 
                          name="hazards.planIrregularity" 
                          label="Plan Irregularity" 
                          multiline 
                          rows="10"
                          fullWidth
                          component={TextField} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={16}>
                      <Grid item xs={6}>
                        <FormControl component="fieldset" style={{marginTop: '16px'}} className={classes.formControl}>
                          <FormLabel > Exterior Falling Hazards </FormLabel>
                          <Grid item xs={12}>
                            <Field name="hazards.exteriorFalling.unbraced Chimneys" Label={{ label: 'Unbraced Chimneys' }} component={CheckboxWithLabel}/>
                          </Grid>
                          <Grid item xs={12}>
                            <Field 
                              name="hazards.exteriorFalling.claddingOrVeneer" 
                              Label={{ label: 'Heavy Cladding or Heavy Veneer' }} component={CheckboxWithLabel} />
                          </Grid>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Field 
                          type="text" 
                          name="hazards.otherExteriorFalling" 
                          label="Other Exterior Falling Hazards" 
                          multiline 
                          rows="10"
                          fullWidth
                          component={TextField} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Comments </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Field 
                  type="text" 
                  name="comments" 
                  multiline 
                  rows="10"
                  fullWidth
                  component={TextField} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Level 1 Score </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Button size="small" variant="contained" >W1</Button>
                    <Button size="small" variant="contained" >W1A</Button>
                    <Button size="small" variant="contained" >W2</Button>
                    <Button size="small" variant="contained" >S1</Button>
                    <Button size="small" variant="contained" >S2</Button>
                    <Button size="small" variant="contained" >S3</Button>
                    <Button size="small" variant="contained" >S4</Button>
                    <Button size="small" variant="contained" >S5</Button>
                    <Button size="small" variant="contained" >C1</Button>
                    <Button size="small" variant="contained" >C2</Button>
                    <Button size="small" variant="contained" >C3</Button>
                    <Button size="small" variant="contained" >PC1</Button>
                    <Button size="small" variant="contained" >PC2</Button>
                    <Button size="small" variant="contained" >RM1</Button>
                    <Button size="small" variant="contained" >RM2</Button>
                    <Button size="small" variant="contained" >URM</Button>
                  </Grid>
                  <Grid item>
                    <Typography> Table PLACEHOLD </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Extent of Review </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container spacing={16}>
                      <Grid item xs={6}>
                        <FormControl component="fieldset" style={{marginTop: '16px'}} className={classes.formControl}>
                          <FormLabel > Exterior </FormLabel>
                          <Grid item xs={12}>
                            <Field name="extentOfReview.exterior.partial" Label={{ label: 'Partial' }} component={CheckboxWithLabel}/>
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
                        <FormControl component="fieldset" style={{marginTop: '16px'}} className={classes.formControl}>
                          <FormLabel > Interior </FormLabel>
                          <Grid item xs={12}>
                            <Field name="extentOfReview.interior.none" Label={{ label: 'None' }} component={CheckboxWithLabel}/>
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

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Other Hazards & Actions Required </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column">
                  <Grid item > 
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column">
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Are There Hazards That Trigger A Detailed Structural Evaluation? </FormLabel>
                            <Grid item >
                              <Field 
                                name="otherHazardsAndActionsRequired.areThereHazardsThatTriggerADetailedStructuralEvaluation.poundingPotential" 
                                Label={{ label: 'Pounding Potential (unless SL2 > cut-off, if known)' }} component={CheckboxWithLabel}/>
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
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column">
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Detailed Structural Evaluation Required? </FormLabel>
                            <Grid item >
                              <Field 
                                name="otherHazardsAndActionsRequired.detailedStructuralEvaluationRequired.yesUnknownType" 
                                Label={{ label: 'Yes, unknown FEMA building type or other building' }} component={CheckboxWithLabel}/>
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
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="column">
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel > Detailed Nonstructural Evaluation Recommended? </FormLabel>
                        <Field name="otherHazardsAndActionsRequired.detailedNonstructuralEvaluationRecommended" component={RadioGroup} >
                          <FormControlLabel 
                            value="yes" 
                            label="Yes, nonstructural hazards identified that should be evaluated" 
                            control={<Radio />}/>
                          <FormControlLabel 
                            value="noButPotentialHazards" 
                            label="No, nonstructural hazards exist that may require mitigation, but a detailed evaluation is not necessary" 
                            control={<Radio />}/>
                          <FormControlLabel 
                            value="no" 
                            label="No, no nonstructural harard is identified" 
                            control={<Radio />}/>
                          <FormControlLabel 
                            value="DNK" 
                            label="DNK" 
                            control={<Radio />}/>
                        </Field>
                      </FormControl>
                    </Grid>
                  </Grid>
                  
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Level 2 Vertical Irregularity </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column" wrap="nowrap" spacing={16}>
                  <Grid item > 
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column" >
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Sloping Site </FormLabel>
                            <Grid item >
                              <Field 
                                name="level2VerticalIrregularity.slopingSite.W1building" 
                                Label={{ label: 'W1-building' }} component={CheckboxWithLabel}/>
                            </Grid>
                            <Grid item >
                              <Field 
                                name="level2VerticalIrregularity.slopingSite.nonW1building" 
                                Label={{ label: 'Non W1-building' }} component={CheckboxWithLabel} />
                            </Grid>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column">
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Weak and/or Soft Story </FormLabel>
                              <Field name="level2VerticalIrregularity.weakAndOrSoftStory" component={RadioGroup} >
                                <FormControlLabel 
                                  value="W1Cripple" 
                                  label="W1-building cripple wall" 
                                  control={<Radio />}/>
                                <FormControlLabel 
                                  value="W1OverGarage" 
                                  label="W1 house over garage" 
                                  control={<Radio />}/>
                                <FormControlLabel 
                                  value="W1ABuildingOpenFront" 
                                  label="W1A building open front" 
                                  control={<Radio />}/>
                                <FormControlLabel 
                                  value="NonW1LessThan50" 
                                  label="Non-W1 building <50%" 
                                  control={<Radio />}/>
                                <FormControlLabel 
                                  value="NonW1GreaterThan50" 
                                  label="Non-W1 building >50%" 
                                  control={<Radio />}/>
                              </Field>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column">
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Setback </FormLabel>
                            <Grid item >
                              <Field 
                                name="level2VerticalIrregularity.setback.diaphragmCantilever" 
                                Label={{ label: 'Diaphragm cantilever' }} component={CheckboxWithLabel}/>
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
                      <Grid item xs={12} sm={6}>
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
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > Split Level </FormLabel>
                            <Field 
                              name="level2VerticalIrregularity.splitLevelNearRoof" 
                              Label={{ label: 'There is a split level at one of the floor levels or at the roof.' }} component={CheckboxWithLabel}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                                Label={{ label: 'Moderate' }} component={CheckboxWithLabel} />
                            </Grid>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Level 2 Other Structural Modifiers </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column" wrap="nowrap" spacing={16}>
                  <Grid item > 
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column" >
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Plan Irregularity </FormLabel>
                            <Grid item >
                              <Field 
                                name="level2otherStructureModifiers.planIrregularity.torsionNotW1A" 
                                Label={{ label: 'Torsion (not W1A open front)' }} component={CheckboxWithLabel}/>
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
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column">
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > Pounding </FormLabel>
                            <Grid item >
                              <Field 
                                name="level2otherStructureModifiers.planIrregularity.floorsDoNotAlignGT2Feet" 
                                Label={{ label: 'Floors do not align > 2 ft' }} component={CheckboxWithLabel}/>
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
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <Grid container direction="column">
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel > PC1/RM1 Bldg </FormLabel>
                            <Grid item >
                              <Field 
                                name="level2otherStructureModifiers.PC1orRM1bldg.roofWallStringLedger" 
                                Label={{ label: 'Roof-wall ties w/ string ledger' }} component={CheckboxWithLabel}/>
                            </Grid>
                            <Grid item >
                              <Field 
                                name="level2otherStructureModifiers.PC1orRM1bldg.interiorCrosswalls" 
                                Label={{ label: 'Interior crosswalls' }} component={CheckboxWithLabel} />
                            </Grid>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > C1 Building </FormLabel>
                            <Field 
                              name="level2otherStructureModifiers.C1Building.flatPlateAsBeam" 
                              Label={{ label: 'Flat plate serves as the beam in the moment frame.' }} component={CheckboxWithLabel}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > URM </FormLabel>
                            <Field 
                              name="level2otherStructureModifiers.URM.gableWalls" 
                              Label={{ label: 'Gable walls are present.' }} component={CheckboxWithLabel}/>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > MH </FormLabel>
                            <Field 
                              name="level2otherStructureModifiers.MH.supplementalBracing" 
                              Label={{ label: 'There is a supplemental seismic bracing system provided between the carriage and the ground.' }} 
                              component={CheckboxWithLabel}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > Retrofit </FormLabel>
                            <Field 
                              name="level2otherStructureModifiers.retrofit.comprehensiveVisible" 
                              Label={{ label: 'Comprehensive seismic retrofit is visible or known from drawings.' }} component={CheckboxWithLabel}/>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Grid container direction="row" spacing={16}>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel > Redundancy </FormLabel>
                            <Field 
                              name="level2otherStructureModifiers.redundancy" 
                              Label={{ label: 'The building has at least two bays of lateral elements on each side of the building in each direction.' }} 
                              component={CheckboxWithLabel}/>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
                                Label={{ label: 'Unbraced URM parapet or chimney' }} component={CheckboxWithLabel}/>
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
                                Label={{ label: 'Tall unanchored furniture' }} component={CheckboxWithLabel}/>
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
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <Typography className={classes.heading}> Level 2 Comments </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Field 
                  type="text" 
                  name="level2comments" 
                  multiline 
                  rows="10"
                  fullWidth
                  component={TextField} />
              </ExpansionPanelDetails>
            </ExpansionPanel>

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


export default withStyles(styles)(function FEMA_P154({ classes }) {
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.item}>
        <FEMA_P154_Form  />
      </Grid>
    </Grid>
  );
})

// internal

// function LabeledRadioGroup(props) {
//   console.log(props);
//   return (
//     <FormControlLabel
//       control={<RadioGroup >{props.children}</RadioGroup>}
//       label={props.label}
//       labelPlacement="top"
//       disabled={false}
//     />
    
//   );
// }