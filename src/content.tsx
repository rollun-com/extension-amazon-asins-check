import React from 'react';
import ReactDOM from 'react-dom';
import './content.css';
import Root from 'pages/RootPage';

const app = document.createElement('div');
app.id = 'my-extension';

document.body.appendChild(app);
ReactDOM.render(<Root />, app);
