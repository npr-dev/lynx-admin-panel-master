import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './assets/base.scss';
import { HashRouter } from 'react-router-dom'
import Main from './Pages/Main';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from './store';

const rootElement = document.getElementById('root');

toast.configure()

const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Component />
                </HashRouter>
            </PersistGate>
        </Provider>,
        rootElement
    );
};

renderApp(Main);

if (module.hot) {
    module.hot.accept('./Pages/Main', () => {
        const NextApp = require('./Pages/Main').default;
        renderApp(NextApp);
    });
}
serviceWorker.unregister();




