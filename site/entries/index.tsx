import {createRoot} from 'react-dom/client';
import App from '../components/App/index.js';

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<App />);
