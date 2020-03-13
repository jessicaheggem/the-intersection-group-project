import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';

const moment = require('moment');

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

class AdminClientList extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CLIENT_LIST' });
  }

  handleClientClick = (id) => {
    this.props.history.push(`/client-page/${id}`)
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search Clients"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.adminClientList.map(client => (
              <TableRow 
              key={client.id}
              onClick={() => this.handleClientClick(client.id)}
              >
                <TableCell component="th" scope="row">
                  {moment(client.date).format('LL')}
                </TableCell>
                <TableCell align="left">{client.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

AdminClientList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = reduxStore => {
  return (
    { reduxStore }
  )
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(AdminClientList)))
