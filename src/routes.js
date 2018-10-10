import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignUp, Login, StreamerVid, ViewerVid, StreamPage, AccountInfo, PageNotFound, Home, Channels, StreamNav, UpdateSuccessful, StreamerList, StreamerListCategory } from './components';
import StreamerAbout from './components/streamer-about'


export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={StreamerVid} />
        <Route exaxt path="/streamer-about" component={StreamerAbout} />
        <Route exact path="/viewer" component={ViewerVid} />
        <Route exact path="/channels/old" component={Channels} />
        <Route exact path="/channels" component={StreamerList} />
        <Route exact path="/channels/:displayName/account" component={AccountInfo} />
        <Route exact path="/channels/:displayName/profile" component={StreamPage} />
        <Route exact path="/channels/:displayName/account" component={AccountInfo} />
        <Route exact path="/channels/:displayName/update-successful" component={UpdateSuccessful} />
        <Route exact path="/channels/:displayName" component={StreamNav} />
        <Route exact path="/categories/:category" component={StreamerListCategory} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
