import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './Pages/Home';
import Productos from './Pages/Productos';
import ProductoCU from './Pages/ProductoCU';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/productos' component={Productos} />
        <Route path='/productos-crear' component={ProductoCU} />
        <Route path='/productos-editar/:id' component={ProductoCU} />
      </Layout>
    );
  }
}
