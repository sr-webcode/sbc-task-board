import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

import "./index.css"
import App from './App'
import store from '@/redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider resetCSS>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
