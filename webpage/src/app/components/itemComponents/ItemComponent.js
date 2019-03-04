import React, { Component } from 'react';
import { Card, CardTitle, CardPanel, Button, Badge } from "react-materialize";
import Carousel from 'react-materialize/lib/Carousel';

export default class ItemComponent extends Component {
  
  constructor(){
    super();
    this.state = {
      itemCount: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.artist.count !== this.props.artist.count){
      this.setState({
        itemCount: nextProps.artist.count
      });
    }
  }

  componentDidMount(){
    this.setState({
      itemCount: this.props.artist.count || 0
    });
  }
  
  increment(){
    this.setState({
      itemCount: (++this.state.itemCount)
    }, () =>{
      this.props.incrementItem(itemId, itemCount);
    });
  }

  decrement(){
    this.setState({
      itemCount: (--this.state.itemCount)
    }, () =>{
      this.props.decrementItem(itemId, itemCount);
    });
  }

  render() {
    return (
      <Card className={'small' + this.props.color}
        header={<CardTitle image='https://dummyimage.com/250.png/09f/fff' />}
        title={this.props.artist.artist_name}
        actions={[
          <Button floating className='amber darken-2' waves='light' icon='remove' onClick={()=> this.decrement()} key={this.props.artist.artist_musicbrainz + 'Button1'} />,
          <Badge key={this.props.artist.artist_musicbrainz + 'Badge'}><h6>{this.state.itemCount} Views</h6></Badge>,
          <Button floating className='light-green accent-3' waves='light' icon='add' onClick={()=> this.increment()} key={this.props.artist.artist_musicbrainz + 'Button2'}/>
        ]}
        reveal={
          <Carousel>
            {this.props.artist.Songs.map((song, i) => {
              return(
                <CardPanel className={'small teal accent-2'}
                  key={song.song_musicbrainz + i}>
                  <h6>{song.song_name}</h6>
                  <span>{song.song_musicbrainz}</span>
                </CardPanel>
              );
            })}
          </Carousel>
        }>
        Music Brainz ID: {this.props.artist.artist_musicbrainz}
      </Card>
    )
  }
}
