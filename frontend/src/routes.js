import React from'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ToDoList from './pages/To-do-list';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ToDoList} />
            </Switch>
        </BrowserRouter>
    );
}