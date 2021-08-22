import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <div className="container">
            <h1>Bienvenido</h1>
            <p>En el sistema de inventario podras llevar a cabo las tareas de administracion de los productos</p>
        </div>
    );
  }
}
