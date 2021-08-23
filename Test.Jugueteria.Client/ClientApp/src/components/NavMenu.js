import React, { Component } from 'react';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    
    this.state = {
      id: 1
    };
  }

  

  render () {
    return (
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/">Inventario jugueteria</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><a href="/productos" >Productos</a></li>
                    </ul>
                </div>
            </nav>
      </header>
    );
  }
}
