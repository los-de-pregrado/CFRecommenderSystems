import React, { Component } from 'react';
import { Row, Col, Button } from "react-materialize";
import ItemComponent from "./ItemComponent";

export default class ItemList extends Component {
  
  constructor(){
    super();
    this.state={
      currentPage: 0,
      maxPages: 0,
      colors: ['cyan lighten-4', 'light-blue lighten-2',
      'cyan accent-3', 'red accent-1', 'green accent-3',
      'amber', 'orange lighten-1', 'deep-orange', 
      'green accent-4', 'teal accent-2']
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount(){
    this.setState({
      maxPages: Math.floor(this.props.artists.length/4) - 1
    });
  }

  next(){
    if(this.state.currentPage < this.state.maxPages){
      console.log('next!');
      this.setState({
        currentPage: ++this.state.currentPage
      });
    }
  }

  previous(){
    if(this.state.currentPage > 0){
      console.log('prev!');
      this.setState({
        currentPage: --this.state.currentPage
      });
    }
  }

  render() {
    return (
      <Row>
        {!this.props.artists ?
          null:
          this.props.artists.slice((this.state.currentPage * 4), ((this.state.currentPage * 4) + 4)).map((artist, i) => {
            return(
              <Col s={3}>
                <ItemComponent artist={artist}
                  incrementItem={this.props.incrementItem}
                  decrementItem={this.props.decrementItem}
                  color={this.state.colors[i%this.state.colors.length]}
                  key={artist.artist_musicbrainz + i}/>
              </Col>
            );
          })
        }
        { !this.props.pagination ?
          null:
          <Col s={12}>
            <Button waves='light'
              disabled={this.state.currentPage === 0}
              onClick = {() => {this.previous()}}>Previous</Button>
            <Button waves='light'
              disabled={this.state.currentPage === this.state.maxPages}
              onClick = {() => {this.next()}}>Next</Button>
          </Col>
        }
      </Row>
    )
  }
}
