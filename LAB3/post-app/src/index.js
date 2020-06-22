import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'typeface-roboto';

import configureStore from "./store/configureStore";
import { ItemList, PostPage, EditItemForm } from "./components";
import { BottomAppBar, TopAppMenu } from "./layouts";

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <div>
                <TopAppMenu />

                <Route path="/" exact component={ItemList} />
                <Route
                    exact
                    path="/post/:id"
                    render={props => <PostPage id={props.match.params.id} />}
                />
                <Route
                    exact
                    path="/update/post/:id"
                    render={props => (
                        <EditItemForm id={props.match.params.id} />
                    )}
                />
                <BottomAppBar />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
