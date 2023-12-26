import Banner from "./component/Banner";
import Capsules from "./component/Capsules";
import Navbar from "./component/Navbar";
import { Provider } from 'react-redux';
import { store } from './store/store';


const App = () => {
  return (
<Provider store={store}>
        <Navbar/>
      <Banner/>
      <Capsules/>
    </Provider>
  )
}

export default App;