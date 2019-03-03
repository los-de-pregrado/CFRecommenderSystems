import React, { Component } from 'react';
import { Container, Row, Col } from "react-materialize";
import ItemList from "../itemComponents/ItemList";

export default class Historial extends Component {

  constructor(){
    super();
    this.state={
      artistas: [
        {
        count: 1,
        artist_name: 'artist_name',
        artist_musicbrainz: 'artist_musicbrainz1',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz1'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz2'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz3'
        }]
      },
      {
        count: 2,
        artist_name: 'artist_name',
        artist_musicbrainz: 'artist_musicbrainz2',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz4'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz5'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz6'
        }]
      }, 
      {
        count: 3,
        artist_name: 'artist_name',
        artist_musicbrainz: 'artist_musicbrainz3',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz7'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz8'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz9'
        }]
      }, 
      {
        count: 4,
        artist_name: 'artist_name',
        artist_musicbrainz: 'artist_musicbrainz4',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz10'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz11'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz12'
        }]
      }, 
      {
        
        count: 5,
        artist_name: 'artist_name11',
        artist_musicbrainz: 'artist_musicbrainz1',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz1'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz2'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz3'
        }]
      },
      {
        count: 6,
        artist_name: 'artist_name22',
        artist_musicbrainz: 'artist_musicbrainz2',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz4'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz5'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz6'
        }]
      },
      {
        count: 7,
        artist_name: 'artist_name33',
        artist_musicbrainz: 'artist_musicbrainz3',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz7'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz8'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz9'
        }]
      }, 
      {
        count: 8,
        artist_name: 'artist_name44',
        artist_musicbrainz: 'artist_musicbrainz4',
        Songs: [{
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz10'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz11'
        },
        {
          song_name: 'song_name',
          song_musicbrainz: 'song_musicbrainz12'
        }]
      }]
    }
    //const userId = this.props.match.params.usuario;
  }
  
  render() {
    return (
      <Container>
        <Row>
          <Col s={12}>
            <h2>Artistas Escuchados Previamente</h2>
          </Col>
          <Col s={12}>
            <ItemList artists={this.state.artistas} pagination/>
          </Col>
        </Row>
      </Container>
    )
  }
}
