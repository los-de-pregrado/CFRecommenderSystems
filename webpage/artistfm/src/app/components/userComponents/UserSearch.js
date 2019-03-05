import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';

className UserSearch extends Component{

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
    
    fetch('/api/artist/search/'+value).then(res=>res.json()).then(data =>{
      this.setState({
        toptensearch: data
      });
    });
  }

  changeRating(){

  }

  componentDidMount(){
    document.dispatchEvent(new Event('component'));      
  }

  render(){

    const gens = this.state.toptengen.map((gen,i)=>{
        return(
          <div className="col s12" key = {gen.artist_brainzmusic}>
            <div className="card horizontal">
              <div className="card-image">
                <img src={gen.artist_image}/>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <h6 className="header">{gen.artist_name}</h6>
                </div>
                <div className="card-action">
                  <center>
                    <StarRatings
                      rating={this.state.toptengenrates[i]}
                      starRatedColor="blue"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name={gen.artist_brainzmusic}
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
        <div className="col s12" key = {mine.artist_brainzmusic}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={mine.artist_image}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h6 className="header">{mine.artist_name}</h6>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.toptenminerates[i]}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={mine.artist_brainzmusic}
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
        <div className="col s12" key = {search.artist_brainzmusic}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={search.artist_image}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h6 className="header">{search.artist_name}</h6>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.toptensearchrates[i]}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={search.artist_brainzmusic}
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
        
        <nav>
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input id="search" type="search" onChange = {this.handleChange} required/>
                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>

        <br></br>

        <div className ="row">
        
          <div className = "col s4">
            <center><h5>Resultados</h5></center>
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