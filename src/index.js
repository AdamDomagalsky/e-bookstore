//React & Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

//Helpers
import { store } from './helpers/store';
import { history } from './helpers/history';

//Components
import App from './components/App';

//Azure deploy
import './web.config';

ReactDOM.render((
    <Provider store={store}>
        <Router history={history} >
            <App/>
        </Router>
    </Provider>
), document.getElementById('root'));
