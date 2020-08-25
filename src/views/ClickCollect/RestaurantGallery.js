import React from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '93%',
    },
  },
}));
export default function Components(props) {
  console.log(props.list)
	const history = useHistory();
  const classes = useStyles();


  function handleClick (id){
    localStorage.setItem('selectedEstablishmentId', id);
    history.push('establishment-detail');
  }
  
  return (
    <div className={classes.container} style={{marginTop:"10px"}}>
        <GridContainer spacing={2}>
          {
            props.list?
            props.list.map((element, i)=>{
              return (
                <GridItem md={4} key={i}>
                  <Card className={classes.root}>
                    <CardActionArea style={{margin: "0px", width: "100%"}} onClick={()=>handleClick( element.id )}>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={"https://media-cdn.tripadvisor.com/media/photo-s/01/0a/b6/1e/reading-abbey-ruins.jpg"}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {element.name}
                        </Typography>
                        <Typography color="textSecondary" component="h4" style={{fontSize: "20px"}}>
                          {element.address.streetOne} {element.address.city}
                        </Typography>
                        <GridContainer>
                        {
                          element.cuisines[0]?
                          element.cuisines.map((child, i)=>{
                            return (
                              <font key={i} style={{    
                                backgroundColor: "#dcdcdc",
                                margin: "4px",
                                borderRadius: "6px",
                                padding: "3px"}}>{child}</font>
                            )
                          }):""
                        }
                        </GridContainer>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </GridItem>
              )
            }):""
          }
      </GridContainer>
    </div>
  );
}
