import './App.module.css';
import {Provider} from 'react-redux';
import {Router} from '../../Router/ui/Router';
import {store} from '../../store';

export const App = () => {

    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    );
}
