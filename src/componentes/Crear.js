import React from 'react';
import '../assets/css/form.css';
import {  Link } from "react-router-dom";





class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre:"",
            apellidos:"",
            telefono:"",
            direccion:""
        }
    }
cambioValor=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState({state});
}


enviarDatos = (e) => {
    e.preventDefault();
    console.log("El Formulario Fue Enviado...");

    const{nombre,apellidos,telefono,direccion}=this.state;
    console.log(nombre);
    console.log(apellidos);
    console.log(telefono);
    console.log(direccion);

var datosEnviar={nombre:nombre, apellidos:apellidos, telefono:telefono, direccion:direccion}


//Envio de Informacion a la DB
    fetch("http://localhost/empleados/?insertar=1",{
        method:"POST",
        body:JSON.stringify(datosEnviar)
    })
    .then(respuesta => respuesta.json())
    .then((datosRespuesta) => {

        console.log(datosRespuesta);
        this.props.history.push("/");
  })
    .catch(console.log)

}

//

    render() {
        const{nombre,apellidos, direccion,telefono}=this.state;



        return (
            <div className="card">
                <div className="card-header">
                    Usuarios
                </div>
                <div className="card-body">
                    <form  onSubmit={this.enviarDatos}>
                        <div className="form-group">
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="nombre" onChange={this.cambioValor} value={nombre} id="nombre" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                        <div className="form-group">
                            <label htmlFor="">Apellidos</label>
                            <input type="text" name="apellidos" onChange={this.cambioValor} value={apellidos} id="apellidos" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                            <br></br>
                            <div className="form-group">
                            <label htmlFor="">Direccion</label>
                            <input type="text" name="direccion" onChange={this.cambioValor} value={direccion} id="direccion" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                            <br></br>
                            <div className="form-group">
                            <label htmlFor="">Telefono</label>
                            <input type="text" name="telefono" onChange={this.cambioValor} value={telefono} id="telefono" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                            <br></br>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar nuevo Registro</button>
                            <Link to="/" className="btn btn-primary">Cancelar</Link>
                        </div>

                    </form>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
        );
    }
}
export default Crear;