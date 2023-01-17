import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import { PageContextProvider } from './store/page-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* @ts-ignore */}
      <PageContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </PageContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
