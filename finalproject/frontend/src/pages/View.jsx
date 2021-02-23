import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import {MemesList, SlideShow, FilterMemes} from '../components';
import api from '../api';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../style/View.scss';

export default class View extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memes: [],
            isLoading: true
        };
        this.initialMemes = [];
        this.wasJustUpdated = false;

        let { path, url } = this.props.match;
        this.routePath = path;
        this.routeURL = url;

        //this binding for React event handlers
        [
            'handleMemeListUpdate',
            'wasMemeListJustUpdated',
        ].forEach((handler)=>{
            this[handler] = this[handler].bind(this);
        });
    }

    handleMemeListUpdate(newArray){
        this.setState({memes: newArray});
        this.wasJustUpdated = true;
    }

    wasMemeListJustUpdated(){
        if(this.wasJustUpdated){
            this.wasJustUpdated = false;
            return true;
        }else{
            return false;
        }
    }

    componentDidMount = async () => {
        let response = await api.getAllMemes();
        this.initialMemes = response.data.data;
        this.setState({
            memes: response.data.data,
            isLoading: false
        });
    }


    render() {
        return (
            <div id="view-page-wrapper">
            {this.state.isLoading ? (
                <div id="view-page-loader">
                    <Loader type="Grid" height={500} width={500} color="#7ab2e1" visible={true} />
                </div>
            ) : (
                <>
                <FilterMemes memes={this.initialMemes} handleMemeListUpdate={this.handleMemeListUpdate} />
                <Switch>
                    <Route path={this.routePath} exact children={
                        //nasty workaround: it would be nicer to just have the MemesList JSX element as JSX children without resorting to the explicit children prop, but then we'd loose access to the routeprops passed to the children :/
                        (routeProps)=>(
                        <MemesList {...routeProps} memes={this.state.memes} />
                        )
                    } />
                    <Route path={this.routePath+'/:memeId'} exact children={
                        (routeProps)=>(
                        <SlideShow {...routeProps} urlPath={this.routePath} memes={this.state.memes} wasMemeListJustUpdated={this.wasMemeListJustUpdated} />
                        )
                    } />
                </Switch>
                </>
            )}
            </div>
        )
    }
}