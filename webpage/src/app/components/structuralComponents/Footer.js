import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer class="page-footer red darken-4">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h6 class="white-text">¡Gracias por visitarnos!</h6>
              <p class="grey-text text-lighten-4">Esta página garantiza la seguridad de tus archivos multimedia compartidos. Siéntete tranquilo.</p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="white-text">Creadores</h5>
              <ul>
                <li><a class="grey-text text-lighten-3" href="mailto:cm.s.cortes@uniandes.edu.co">Santiago Cortés</a></li>
                <li><a class="grey-text text-lighten-3" href="mailto:cm.r.garciall@uniandes.edu.co">Rogelio García</a></li>
                <li><a class="grey-text text-lighten-3" href="mailto:nm.hernandez10@uniandes.edu.co">Nicolás Hernández</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
