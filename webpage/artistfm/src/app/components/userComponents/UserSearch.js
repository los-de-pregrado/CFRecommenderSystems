import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';

class UserSearch extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        user:{},
        toptengen: [],
        toptenmine: [],
        toptensearch: [],
        toptengenrates: [],
        toptenminerates: [],
        toptensearchrates: []
    }
    
    this.actualizar = this.actualizar.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.actualizar();
  }

  actualizar(){
    fetch('/api/user/'+this.state.idLogged).then(res => res.json()).then(data => {       
            this.setState({
                user:data
            });         
      });
  }
  
  handleChange(e){
    const {value, id} = e.target;
    
    if(value != ''){
      fetch('/api/artist/search/'+value).then(res=>res.json()).then(data =>{
        console.log
        this.setState({
          toptensearch: data
        });
      });
    }
    else{
      this.setState({
        toptensearch: []
      });
    }  
  }

  changeRating(){

  }

  componentDidMount(){
    document.dispatchEvent(new Event('component'));      
  }

  render(){

    const gens = this.state.toptengen.map((gen,i)=>{
        return(
          <div className="col s12" key = {gen.artist_musicbrainz}>
            <div className="card horizontal">
              <div className="card-image">
                <img src={gen.artist_image}/>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                <center><b><p>{gen.artist_name}</p></b></center>
                </div>
                <div className="card-action">
                  <center>
                    <StarRatings
                      rating={this.state.toptengenrates[i]}
                      starRatedColor="blue"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name={gen.artist_brainzmusic}
                      starDimension ="15px"
                    />
                  </center>
                </div>
              </div>
            </div>
          </div>
          )
    })

    const mines = this.state.toptenmine.map((mine,i)=>{
      return(
        <div className="col s12" key = {mine.artist_musicbrainz}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={mine.artist_image}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
              <center><b><p>{mine.artist_name}</p></b></center>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.toptenminerates[i]}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={mine.artist_brainzmusic}
                    starDimension ="15px"
                  />
                </center>
              </div>
            </div>
          </div>
        </div>
        )
    })

    const searches = this.state.toptensearch.map((search,i)=>{
      return(
        <div className="col s12" key = {search.artist_musicbrainz}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={search.artist_image}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <center><b><p>{search.artist_name}</p></b></center>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.toptensearchrates[i]}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={search.artist_brainzmusic}
                    starDimension ="15px"
                  />
                </center>
              </div>
            </div>
          </div>
        </div>
        )
    })

    return(
        
      <div>
        
        <div className="container">
          <nav>
            <div className="nav-wrapper cyan darken-1">
              <form>
                <div className="input-field">
                  <input id="search" type="search" onChange = {this.handleChange} required/>
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>

        <br></br>

        <div className ="row">
        
          <div className = "col s4">
            <center><h5>Resultados</h5></center>
            <br></br>
            {searches}
          </div>

          <div className = "col s4">
            <center><h5>Los más gustados</h5></center>
          </div>

          <div className = "col s4">
            <center><h5>Por usuarios parecidos a ti</h5></center>
          </div>  
        
        </div>

      </div>
        
    )
  }
}

export default UserSearch;