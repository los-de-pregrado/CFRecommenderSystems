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
                <a className="carousel-item" href="#one!"><img className = "responsive-img" src="http://www.faithstrongtoday.com/wp-content/uploads/kane-reinholdtsen-145944-1600x600.jpg"/></a>
                <a className="carousel-item" href="#two!"><img className = "responsive-img" src="https://thunderrise.com/cache/img/2017/12/25/1920x600_15142172685a411f34101258.79712519radio%20.jpg"/></a>
                <a className="carousel-item" href="#three!"><img className = "responsive-img" src="http://www.valemediagroup.com/wp-content/uploads/2018/10/newslider.png"/></a>
                <a className="carousel-item" href="#four!"><img className = "responsive-img" src="http://enigmaradio.cl/portal/wp-content/uploads/2018/03/slider2.jpg"/></a>
            </div>
            
            <br></br>

            <div className="container">

              <center>
                <h5>¿Qué es Supervoices?</h5>
                <p>Somos una página que permite la creación de concursos de voz. Puedes ser administrador de tu propio concurso, compartilo y manejar todos
                  los audios para poder tomar tus decisiones. Te facilitamos el trabajo para manipular todos los archivos multimedia y unificar la información, 
                  los resultados y los anuncios en un mismo lugar. ¿Qué esperas? Crea tu concurso ahora mismo, y encuentra las mejores voces para tus anuncios 
                  y presentaciones en vivo.
                </p>
              </center>

              <center>
                <h5>¿Cómo creo mi propio concurso?</h5>
                <p>Regístrate como administrador para poder crear y gestionar tus concursos. Comparte tu proceso de selección a todos tus participantes y escucha
                  el audio de cada uno de los locutores para elegir el mejor. La plataforma te falicitará la descarga de las participaciones y también la posibilidad 
                  de reproducirlas en el navegador.
                </p>
              </center>

              <center>
                <h5>Quiero participar en un concurso de voces</h5>
                <p>Puedes acceder a la página del concurso usando la URL que te da el administrador, o buscando el concurso en la lista publicada. No olvides que
                  para participar lo único que necesitas es un correo electrónico válido para recibir las futuras notificaciones, los resultados del concurso y comunicaciones
                  que el administrador haga.
                </p>
              </center>

            </div>

            <br></br>           

        </div>
    )
  }
}

export default Home;