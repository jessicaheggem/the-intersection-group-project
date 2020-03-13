import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

const moment = require('moment');

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class AdminTeamPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_TEAM_LIST',
      payload: this.props.match.params.id
    })
  }

  render() {
    // const { classes } = this.props;
    let team = this.props.reduxStore.adminTeamList;

    return (
      <div>
        <h1>Team Page</h1>
        <h1>{team.captain_name}</h1>
      </div>
    )

  }
}

const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}
export default withStyles(styles)(connect(mapStateToProps)(AdminTeamPage))