import React, {Component} from 'react';

class Home extends Component{

  constructor(){
    super();    
    this.state={

    }
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));
  }

  render(){
    return(
        <div>        

            <div className="carousel carousel-slider">
                <a className="carousel-item" href="#one!"><img className = "responsive-img" src="https://static.zikvid.com/crop/1600/600/uploads/channels/996824a84110496e90a8f5f062c4419a.jpg"/></a>
                <a className="carousel-item" href="#two!"><img className = "responsive-img" src="http://nuevamusica2020.com/application/wp-content/uploads/wow-slider-plugin/40/images/nuevamusica2018.com.jpg"/></a>
                <a className="carousel-item" href="#three!"><img className = "responsive-img" src="http://www.valemediagroup.com/wp-content/uploads/2018/10/newslider.png"/></a>
                <a className="carousel-item" href="#four!"><img className = "responsive-img" src="http://enigmaradio.cl/portal/wp-content/uploads/2018/03/slider2.jpg"/></a>
            </div>
            
            <br></br>

            <div className="container">

              <center>
                <h5>Bienvenido a ArtistFM</h5>
                <p>Somos una solución para búsqueda de nuevos artistas según tus gustos. Crea tu cuenta y experimenta con artistas que hayas escuchado, y con base en 
                  tus favoritos, ¡te recomendaremos nuevas opciones para que puedas disfrutar de un portafolio más amplio de tu música!
                </p>
              </center>

              <center>
                <h5>¿Cómo creo mi cuenta?</h5>
                <p>Regístrate para tener tu perfil y poder calificar los artistas que más escuches.
                </p>
              </center>

            </div>

            <br></br>           

        </div>
    )
  }
}

export default Home;