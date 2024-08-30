import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import App from './App'
import Preloader from './components/common/Preloader/Preloader'

/* 
it('renders learn react link', () => {
  render(<SamuraiJSApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Старая редакция
const div = document.createElement('div')
ReactDOM.render(<App />, div)
ReactDOM.unmountComponentAtNode(div) */


const mockStore = configureStore([])

describe('App component', () => {
  let store

  beforeEach(() => {
    store = mockStore({
    app: {
    initialized: false, // Установите значение по умолчанию для инициализации
  },
    sidebar: {},
  })
})

test('renders Preloader when app is not initialized', () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  )

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
})

test('renders app content when app is initialized', () => {
  store = mockStore({
    app: {
      initialized: true,
    },
    sidebar: {},
})

  render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)

  expect(screen.getByText(/news/i)).toBeInTheDocument();
  expect(screen.getByText(/music/i)).toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();
  })
})