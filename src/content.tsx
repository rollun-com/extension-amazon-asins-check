import React from 'react';
import ReactDOM from 'react-dom';
import './content.css';
import Root from 'pages/RootPage';

const app = document.createElement('div');
app.id = 'my-extension';
app.style.position = 'absolute';
app.style.top = '0';
app.style.left = '0';
app.style.marginTop = '100px';

document.body.appendChild(app);
ReactDOM.render(<Root />, app);
