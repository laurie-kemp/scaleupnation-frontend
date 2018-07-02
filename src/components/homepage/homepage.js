import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Homepage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = ''
    }
  
  render() {
    const { history, currentUser } = this.props;
    if (!currentUser) return <Redirect to="/login" />

    return (
      <div>
      <Card className='dataCard'>
        <CardContent>
          <Typography variant="headline" component="h2">
          Full Database 
          </Typography>
          <Typography component="p">
          See or update your Database here
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className='dataCardButton' onClick={() => history.push("/list")}>Data</Button>
        </CardActions>
      </Card>
      

      <Card className='reportsCard'>
        <CardContent>
          <Typography variant="headline" component="h2">
            Reports
          </Typography>
          <Typography component="p">
           Searh for reports on specific company
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className='dataCardButton' onClick={() => history.push("/reports")}>Reports</Button>
        </CardActions>
      </Card>

      <Card className='reportsCard'>
        <CardContent>
          <Typography variant="headline" component="h2">
            Top companies
          </Typography>
          <Typography component="p">
          See here the Top companies based on FTE growth
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className='dataCardButton' onClick={() => history.push("/top")}>Top</Button>
        </CardActions>
      </Card>
      
    </div>

    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser,
  authenticated: state.currentUser !== null,
  
})

export default connect(mapStateToProps)(Homepage)