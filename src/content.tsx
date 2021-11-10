import UploadRidsPage from 'pages/UploadRidsPage';
import React from 'react';
import ReactDOM from 'react-dom';
import './content.css';

const app = document.createElement('div');
app.id = 'my-extension';
app.style.position = 'absolute';
app.style.top = '0';
app.style.left = '0';
app.style.marginTop = '100px';

document.body.appendChild(app);
ReactDOM.render(<UploadRidsPage />, app);
