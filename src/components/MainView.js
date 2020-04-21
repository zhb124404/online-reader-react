/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 14:41
 */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../views/home';

import Category from '../views/category/Category';
import Cmale from '../views/category/male/cmale';
import Cfemale from '../views/category/female/cfemale';
import Cpress from '../views/category/press/cpress';
import Cpicture from '../views/category/picture/cpicture';

import Ranking from '../views/ranking/Ranking';
import Rmale from '../views/ranking/male/rmale';
import Rfemale from '../views/ranking/female/rfemale';
import Rpress from '../views/ranking/press/rpress';
import Rpicture from '../views/ranking/picture/rpicture';

import Bookinfo from '../views/bookinfo/bookinfo';
import Bookshelf from '../views/bookshelf/bookshelf';

class MainView extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Category path="/category">
                    <Switch>
                        <Redirect exact from="/category" to="/category/male"></Redirect>
                        <Route exact path="/category/male" component={Cmale}></Route>
                        <Route exact path="/category/female" component={Cfemale}></Route>
                        <Route exact path="/category/press" component={Cpress}></Route>
                        <Route exact path="/category/picture" component={Cpicture}></Route>
                    </Switch>
                </Category>
                <Ranking path="/ranking">
                    <Switch>
                        <Redirect exact from="/ranking" to="/ranking/male"></Redirect>
                        <Route exact path="/ranking/male" component={Rmale}></Route>
                        <Route exact path="/ranking/female" component={Rfemale}></Route>
                        <Route exact path="/ranking/press" component={Rpress}></Route>
                        <Route exact path="/ranking/picture" component={Rpicture}></Route>
                    </Switch>
                </Ranking>
                <Route path="/bookinfo/:id" component={Bookinfo}></Route>
                <Route exact path="/bookshelf" component={Bookshelf}></Route>
            </Switch>
        );
    }
}

export default MainView;
