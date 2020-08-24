import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Checkbox from "@material-ui/core/Checkbox";
import Button from "components/CustomButtons/Button.js";
import SearchIcon from '@material-ui/icons/Search';
import Check from "@material-ui/icons/Check";
import CustomInput from "components/CustomInput/CustomInput.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";

import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import styles_basic from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);
const useStyles_basic = makeStyles(styles_basic);

export default function SectionTabs() {
  const [checked, setChecked] = React.useState([24, 22]);
  const classes = useStyles();
  const classes_basic = useStyles_basic();
  
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="nav-tabs">
          <GridContainer>
            <GridItem xs={12} sm={12} md={10}>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Click & Collect",
                    tabContent: (
                      <GridContainer>
                      <GridItem xs={12} md={9}>
                        <CustomInput
                          id="postcode"
                          inputProps={{
                            placeholder: "Post Code"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} md={3}>
                        <Button color="primary" round>
                          <SearchIcon className={classes.icons} /> Search...
                        </Button>
                      </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabName: "Book a Table",
                    tabContent: (
                      <GridContainer>
                      <GridItem xs={12} md={2}>
                        <CustomInput
                          id="postcode"
                          inputProps={{
                            placeholder: "Post Code"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem sm={6} md={5}>
                        <form className={classes.container} style={{marginTop: "10px", marginLeft:"-15px"}} noValidate>
                          <TextField
                            id="datetime-local"
                            label="Date/time"
                            type="datetime-local"
                            defaultValue="2020-12-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </form>
                      </GridItem>
                      <GridItem sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => handleToggle(21)}
                              checkedIcon={<Check className={classes_basic.checkedIcon} />}
                              icon={<Check className={classes_basic.uncheckedIcon} />}
                              classes={{
                                checked: classes_basic.checked,
                                root: classes_basic.checkRoot
                              }}
                            />
                          }
                          classes={{ label: classes_basic.label, root: classes_basic.labelRoot }}
                          label="No People"
                        />
                      </GridItem>
                      <GridItem sm={12} md={2}>
                        <Button color="primary" style={{textAlign: "center"}} round>
                          <SearchIcon className={classes.icons} /> Search...
                        </Button>
                      </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabName: "Order at Table",
                    tabContent: (
                      <GridContainer>
                      <GridItem xs={12} md={9}>
                        <CustomInput
                          id="orderTable"
                          inputProps={{
                            placeholder: "Type a Establishment"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} md={3}>
                        <Button color="primary" round>
                          <SearchIcon className={classes.icons} /> Search...
                        </Button>
                      </GridItem>
                      </GridContainer>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
