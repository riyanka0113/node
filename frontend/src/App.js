import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Footer from "./components/Footer";
import Router from './routes';
import Navigation from "./components/Nav"
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {
  return (
    <div >
      <Provider store={store}>
        <Navigation />
        <div className='my-5'>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
