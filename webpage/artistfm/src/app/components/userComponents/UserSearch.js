import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';

class UserSearch extends Component{

  constructor(props){
    super(props);
    
    let toptengenlist = [];
    let toptengenrateslist = [];

    console.log(this.props.ranking);
    console.log(this.props.myranking);

    for(let artist of this.props.ranking){
      let artist_id = artist;
      var rate = this.props.ratings.filter(function(rating){
        return rating.ArtistId == artist_id;
      });
      if (rate.length == 0){
        toptengenrateslist.push({"id":0,"ArtistId": artist_id,"rating_value":0});
      }
      else{
        toptengenrateslist.push(rate[0]);
      }
      fetch('/api/artist/'+artist_id).then(res => res.json()).then(data => {       
        toptengenlist.push(data);            
      });          
    }

    let toptenminelist = [];
    let toptenminerateslist = [];
    for(let artist of this.props.myranking){
      let artist_id = artist;
      var rate = this.props.ratings.filter(function(rating){
        return rating.ArtistId == artist_id;
      });
      if (rate.length == 0){
        toptenminerateslist.push({"id":0,"ArtistId": artist_id,"rating_value":0});
      }
      else{
        toptenminerateslist.push(rate[0]);
      }
      fetch('/api/artist/'+artist_id).then(res => res.json()).then(data => {       
          toptenminelist.push(data);         
        });              
    }

    let artistaslist = []

    for(let rate of this.props.ratings){
      fetch('/api/artist/'+rate.ArtistId).then(res=>res.json()).then(data =>{
        artistaslist.push(data); 
      });
    }

    this.state={
        idLogged : this.props.idLogged,
        user:{},
        toptengen: toptengenlist,
        toptenmine: toptenminelist,
        toptensearch: [],
        toptengenrates: toptengenrateslist,
        toptenminerates: toptenminerateslist,
        toptensearchrates: [],
        artistasrateados: artistaslist,
        artistarrateadosrates: this.props.ratings
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
    
    if(value.replace(/\s/g,'').length == 0){
      this.setState({
        toptensearch: []
      });
    }
    else if(value !== ''){
      fetch('/api/artist/search/'+value.trim()).then(res=>res.json()).then(data =>{
        let toptensearchlist = [];
        let toptensearchrateslist = [];
        for(let artist in data){
          let artist_id = data[artist].id;
          var rate = this.props.ratings.filter(function(rating){
            return rating.ArtistId == artist_id;
          });
          if (rate.length == 0){
            toptensearchrateslist.push({"id":0,"ArtistId": artist_id,"rating_value":0});
          }
          else{
            toptensearchrateslist.push(rate[0]);
          }
          toptensearchlist.push(data[artist]);         
        }
        this.setState({            
          toptensearch:toptensearchlist,
          toptensearchrates: toptensearchrateslist
        });        
      });
    }
    else{
      this.setState({
        toptensearch: []
      });
    }
  }

  changeRating(newRating, name){

    let data = name.split(",");
    name = data[0];
    let type = Number(data[1]);
    let i = Number(data[2]);
    let artistid = Number(data[3]);

    const rating = {artist_id: artistid, user_id: this.state.idLogged, rating_value: newRating};    
    
    fetch('/api/rating',{
      method: 'POST',
      body: JSON.stringify(rating),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {
        if(!res.ok){
          fetch('/api/rating/byboth/'+rating.user_id+"/"+rating.artist_id).then(res=>res.json()).then(data =>{
            let ratingid = data[0].id;
            fetch('/api/rating/'+ratingid,{
              method: 'PUT',
              body: JSON.stringify(rating),
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }}).then(res => res.json()).catch(error => M.toast({html:error.message, classes: 'rounded'}));
          });         
        }
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));        

    if(type == 1){
      let lista =this.state.toptensearchrates;
      lista[i]=rating;
      this.setState({
        toptensearchrates: lista
      });
    }
    else if(type == 2){
      let lista = this.state.toptengenrates;
      lista[i]=rating;
      this.setState({
        toptengenrates: lista
      });
    }
    else{
      let lista = this.state.toptenminerates;
      lista[i]=rating;
      this.setState({
        toptenminerates: lista
      });
    }

    fetch('http://172.24.101.30:8081/model').then(res => console.log(res)).catch(error => console.log(error));
  }

  componentDidMount(){
    document.dispatchEvent(new Event('component'));      
  }

  render(){

    const histos = this.state.artistasrateados.map((histo,i)=>{
      return(
        <div className="col s12" key = {histo.artist_musicbrainz}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={histo.artist_image}/>
            </div>
            <div className="card-stacked">
              <div className="card-content valign-wrapper">
                <div className = "row">
                  <font size="5"><b><p className ="center-align">{histo.artist_name}</p></b></font>
                </div>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.artistarrateadosrates[i].rating_value || 0}
                    starRatedColor="yellow"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={histo.artist_musicbrainz+","+2+","+i+","+histo.id}
                    starDimension ="25px"
                  />
                </center>
              </div>
            </div>
          </div>
        </div>
        )
    })

    const gens = this.state.toptengen.map((gen,i)=>{
        return(
          <div className="col s12" key = {gen.artist_musicbrainz}>
            <div className="card horizontal">
              <div className="card-image">
                <img src={gen.artist_image}/>
              </div>
              <div className="card-stacked">
                <div className="card-content valign-wrapper">
                  <div className = "row">
                    <font size="5"><b><p className ="center-align">{gen.artist_name}</p></b></font>
                  </div>
                </div>
                <div className="card-action">
                  <center>
                    <StarRatings
                      rating={this.state.toptengenrates[i].rating_value || 0}
                      starRatedColor="yellow"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name={gen.artist_musicbrainz+","+2+","+i+","+gen.id}
                      starDimension ="25px"
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
              <div className="card-content valign-wrapper">
                <div className = "row">
                  <font size="5"><b><p className ="center-align">{mine.artist_name}</p></b></font>
                </div>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.toptenminerates[i].rating_value || 0}
                    starRatedColor="yellow"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={mine.artist_musicbrainz+","+3+","+i+","+mine.id}
                    starDimension ="25px"
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
              <div className="card-content valign-wrapper">
                <div className = "row">
                  <font size="5"><b><p className ="center-align">{search.artist_name}</p></b></font>
                </div>
              </div>
              <div className="card-action">
                <center>
                  <StarRatings
                    rating={this.state.toptensearchrates[i].rating_value || 0}
                    starRatedColor="yellow"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name={search.artist_musicbrainz+","+1+","+i+","+search.id}
                    starDimension ="25px"
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
            <br></br>
            {gens}
          </div>

          <div className = "col s4">
            <center><h5>Por usuarios parecidos a ti</h5></center>
            <br></br>
            {
              this.props.ratings.length>0?
              <div>
                {mines}
              </div>
              :
              <div>
                <center><h6>No has calificado ningún artista, aún no sabemos cuáles son tus gustos.</h6></center>
              </div>
            }
          </div>  
        
        </div>

        <br></br>

        <div className = "row">
            <center><h5>Calificaciones históricas</h5></center>
            {histos}
        </div>

      </div>
        
    )
  }
}

export default UserSearch;