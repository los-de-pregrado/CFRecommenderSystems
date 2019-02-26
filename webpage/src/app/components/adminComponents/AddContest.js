import React, {Component} from 'react';

class AddContest extends Component{

  constructor(props){
    super(props);
    if(this.props.concurso != null){
        this.state={
            contest_name: this.props.concurso.contest_name,
            contest_banner: this.props.concurso.contest_banner,
            contest_url: this.props.concurso.contest_url,
            contest_begindate: this.props.concurso.contest_begindate,
            contest_enddate: this.props.concurso.contest_enddate,
            contest_prize: this.props.concurso.contest_prize,
            contest_script: this.props.concurso.contest_script,
            contest_guidelines: this.props.concurso.contest_guidelines,
            procesando: false
        }
    }
    else{
        this.state={
            contest_name:'',
            contest_banner:'',
            contest_url:'',
            contest_begindate:new Date(),
            contest_enddate:new Date(),
            contest_prize:'',
            contest_script:'',
            contest_guidelines:'',
            procesando: false
        }
    }   
        
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.uploadBanner = this.uploadBanner.bind(this);
    this.cancelar=this.cancelar.bind(this);
  }

  handleInput(e){
    const {value, id} = e.target;
    this.setState({
        [id]: value
      });    
  }

  handleSubmit(){
    this.setState({
        contest_begindate:new Date(this.begindate.value),
        contest_enddate :new Date(this.enddate.value),
        procesando: true
    }, () => {
        const banner = this.uploadInput.files[0];
        if(this.props.concurso != null){
            if( this.state.contest_name == '' || this.state.contest_url == '' || this.state.contest_begindate == ''|| this.state.contest_enddate == '' || this.state.contest_prize == '' || this.state.contest_script == ''){
                M.toast({html:'Ingresa valores válidos para el concurso', classes: 'rounded'});
            }
            else if((new Date(this.state.contest_begindate)).getTime() > (new Date(this.state.contest_enddate)).getTime()){            
                M.toast({html:'La fecha de fin debe ser posterior a la de inicio', classes: 'rounded'});
            }
            else if((new Date()).getTime() >= (new Date(this.state.contest_enddate)).getTime()){
                M.toast({html:'La fecha de fin debe ser posterior a la fecha actual', classes: 'rounded'});
            }
            else{  
                var nuevoConcurso = {};
                if(banner != null){                    
                    nuevoConcurso = {contest_name:this.state.contest_name, contest_banner: banner.name, contest_url: this.state.contest_url.replace(/ /g, ""), contest_begindate: new Date(this.state.contest_begindate), contest_enddate:new Date(this.state.contest_enddate),contest_script: this.state.contest_script, contest_prize:this.state.contest_prize, contest_guidelines:this.state.contest_guidelines};
                }
                else{
                    nuevoConcurso = {contest_name:this.state.contest_name, contest_banner:this.state.contest_banner, contest_url: this.state.contest_url.replace(/ /g, ""), contest_begindate: new Date(this.state.contest_begindate), contest_enddate:new Date(this.state.contest_enddate),contest_script: this.state.contest_script, contest_prize:this.state.contest_prize, contest_guidelines:this.state.contest_guidelines};
                }              
                
                fetch('/api/admin/'+ this.props.idLogged + '/concursos/'+this.props.concurso.id,{
                    method: 'PUT',
                    body: JSON.stringify(nuevoConcurso),
                    headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }}).then(res => {              
                        if(res.ok){
                            if(banner != null){
                                this.uploadBanner();
                            } 
                            return res.json();                                               
                        }
                        else{
                            this.setState({
                                procesando : false
                            }, () => {throw new Error("Ya existe un concurso con el mismo URL");}); 
                            
                    }}).then(data => {        
                        this.setState({
                            procesando : false
                        }, () => {M.toast({html:'Se ha editado el concurso correctamente', classes: 'rounded'});});
                        
                        this.props.put();
                        
                    }).catch(error => M.toast({html:error.message, classes: 'rounded'}));   
            }
        }
        else{
            if(banner == null || this.state.contest_name == '' || this.state.contest_url == '' || this.state.contest_begindate == ''|| this.state.contest_enddate == '' || this.state.contest_prize == '' || this.state.contest_script == ''){
                M.toast({html:'Ingresa valores válidos para el concurso y una imagen para su perfil', classes: 'rounded'});
            }
            else if((new Date(this.state.contest_begindate)).getTime() > (new Date(this.state.contest_enddate)).getTime()){
                M.toast({html:'La fecha de fin debe ser posterior a la de inicio', classes: 'rounded'});
            }
            else if((new Date()).getTime() >= (new Date(this.state.contest_enddate)).getTime()){
                M.toast({html:'La fecha de fin debe ser posterior a la fecha actual', classes: 'rounded'});
            }
            else{  
                const nuevoConcurso = {contest_name:this.state.contest_name, contest_banner: banner.name, contest_url:this.state.contest_url.replace(/ /g, ""), contest_begindate: new Date(this.state.contest_begindate), contest_enddate:new Date(this.state.contest_enddate),contest_script: this.state.contest_script, contest_prize:this.state.contest_prize, contest_guidelines:this.state.contest_guidelines};
                
                fetch('/api/admin/'+ this.props.idLogged + '/concursos',{
                    method: 'POST',
                    body: JSON.stringify(nuevoConcurso),
                    headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }}).then(res => {              
                        if(res.ok){
                            this.uploadBanner();
                            return res.json();                   
                        }
                        else{
                            this.setState({
                                procesando : false
                            }, () => {throw new Error("Ya existe un concurso con el mismo URL");}); 
                            
                    }}).then(data => {
                            this.setState({
                                procesando : false
                            }, () => {M.toast({html:'Se ha creado el concurso correctamente', classes: 'rounded'});});                 
                            
                            this.props.post();      
                        
                    }).catch(error => M.toast({html:error.message, classes: 'rounded'}));   
            }
        }
    }); //fin del this.setState       
  }

  cancelar(){
      if(this.props.concurso!=null){
          this.props.put();
      }
      else{
          this.props.post();
      }
  }

  uploadBanner(){
    const banner = this.uploadInput.files[0];
    const data = new FormData();
    data.append('file', banner);
    data.append('filename', banner.name);
    
    fetch('/banner', {
        method: 'POST',
        body: data
        }).then((res)=> console.log(res)).catch(error => console.log(error.message));

  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));
  }

  render(){
    
    return(
                
        <div>
            <form className="col s12">                
                <center><h6>Datos de tu concurso</h6></center>
                <br></br>
                {
                    this.props.concurso!=null?
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input disabled = {true} id="contest_name" type="text" className="validate" onChange = {this.handleInput} value = {this.state.contest_name}/>
                            <label className = "active" htmlFor="contest_name">Nombre del concurso</label>
                            </div>                        
                        </div>           
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="contest_url" type="text" className="validate" onChange = {this.handleInput} value = {this.state.contest_url}/>
                            <label className = "active" htmlFor="contest_url">URL del concurso</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input id="contest_begindate" type="text" className="datepicker" onChange = {this.handleInput} ref={(ref) => { this.begindate = ref; }} value = {this.state.contest_begindate}/>
                            <label className = "active" htmlFor="contest_begindate">Fecha de inicio</label>
                            </div>
                            <div className="input-field col s6">
                            <input id="contest_enddate" type="text" className="datepicker" onChange = {this.handleInput} ref={(ref) => { this.enddate = ref; }} value = {this.state.contest_enddate}/>
                            <label className = "active" htmlFor="contest_enddate">Fecha de fin</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input disabled = {true} id="contest_script" type="text" className="validate" onChange = {this.handleInput} value = {this.state.contest_script}/>
                            <label className = "active" htmlFor="contest_script">Guión</label>
                            </div>
                            <div className="input-field col s6">
                            <input disabled = {true} id="contest_prize" type="number" className="validate" onChange = {this.handleInput} value = {this.state.contest_prize}/>                        
                            <label className = "active" htmlFor="contest_prize">Premio (COP)</label>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="contest_guidelines" type="text" className="validate" onChange = {this.handleInput} value = {this.state.contest_guidelines}/>
                            <label className = "active" htmlFor="contest_guidelines">Descripción e instrucciones</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="file-field input-field">                    
                                <div className = "container">                                    
                                    <div className="btn red darken-1">
                                        <span><i className="material-icons">file_upload</i></span>
                                        <input type="file"  ref={(ref) => { this.uploadInput = ref; }}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Puedes cambiar la imagen del concurso"/>
                                    </div>                                                        
                                </div>                  
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="contest_name" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="contest_name">Nombre del concurso</label>
                            </div>                        
                        </div>     
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="contest_url" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="contest_url">URL del concurso</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input id="contest_begindate" type="text" className="datepicker" onChange = {this.handleInput} ref={(ref) => { this.begindate = ref; }}/>
                            <label htmlFor="contest_begindate">Fecha de inicio</label>
                            </div>
                            <div className="input-field col s6">
                            <input id="contest_enddate" type="text" className="datepicker" onChange = {this.handleInput} ref={(ref) => { this.enddate = ref; }}/>
                            <label htmlFor="contest_enddate">Fecha de fin</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input id="contest_script" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="contest_script">Guión</label>
                            </div>
                            <div className="input-field col s6">
                            <input id="contest_prize" type="number" className="validate" onChange = {this.handleInput}/>                        
                            <label htmlFor="contest_prize">Premio (COP)</label>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="contest_guidelines" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="contest_guidelines">Descripción e instrucciones</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="file-field input-field">                    
                                <div className = "container">                                    
                                    <div className="btn red darken-1">
                                        <span><i className="material-icons">file_upload</i></span>
                                        <input type="file"  ref={(ref) => { this.uploadInput = ref; }}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Sube la imagen de tu concurso"/>
                                    </div>                                                        
                                </div>                  
                            </div>
                        </div>
                    </div>
                }                   
                                                    
            </form>
            {
                this.state.procesando?
                <div className = "container">
                  <br></br>
                  <div className="progress red lighten-5">
                      <div className="indeterminate red darken-3"></div>
                  </div>
                  <br></br>
                </div>
                :null
            }
            <br></br>
            <center><a onClick ={this.cancelar} className="waves-effect waves-light btn red darken-2">Cancelar</a>   <a onClick ={this.handleSubmit} className="waves-effect waves-light btn red darken-3">Confirmar</a></center>
            
        </div>        
    )
  }
}

export default AddContest;