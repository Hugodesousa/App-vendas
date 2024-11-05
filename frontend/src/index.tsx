import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import Provider from './context/provider';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Element with id "root" not found in the document');
}

const appRoot = createRoot(root);

appRoot.render(
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>
);

