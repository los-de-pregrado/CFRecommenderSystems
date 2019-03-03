import React, { Component } from 'react';
import { Footer, Row, Col } from "react-materialize";

export default class MyFooter extends Component {
  render() {
    return (
      <Footer className='cyan darken-1' copyrights="Grupo 8 - Sistemas de Recomendaciones, Departamento de Ing. Sistemas"
        links={
          <ul>
            <li><a className="grey-text text-lighten-3" href="mailto:cm.s.cortes@uniandes.edu.co">Santiago Cortés</a></li>
            <li><a className="grey-text text-lighten-3" href="mailto:cm.r.garciall@uniandes.edu.co">Rogelio García</a></li>
            <li><a className="grey-text text-lighten-3" href="mailto:nm.hernandez10@uniandes.edu.co">Nicolás Hernández</a></li>
          </ul>
        }>
        <Row>
          <Col s={12}>
            Songify is something =).
          </Col>
        </Row>
      </Footer>
    );
  }
}
