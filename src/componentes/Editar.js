import React from 'react';

import {  Link } from "react-router-dom";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleado: []
        }
    }

    cambioValor=(e)=>{
        const state=this.state.empleado;

        state[e.target.name]=e.target.value;
        this.setState({empleado:state});
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("El Formulario Fue Enviado...");
        const{id,nombre,apellidos,direccion,telefono}=this.state.empleado;

        console.log(id);
        console.log(nombre);
        console.log(apellidos);
        console.log(direccion);
        console.log(telefono);

        var datosEnviar={id:id, nombre:nombre, apellidos:apellidos, direccion:direccion, telefono:telefono}


//Envio de Informacion a la DB
    fetch("http://localhost/empleados/?actualizar=1",{
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
    

    componentDidMount() {
        console.log(this.props.match.params.id);

        fetch("http://localhost/empleados/?consultar=" + this.props.match.params.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {

                console.log(datosRespuesta);
                this.setState({
                    datosCargados: true,
                    empleado: datosRespuesta[0]
                })
            })
            .catch(console.log)
    }

    render() {
        const {datosCargados, empleado} = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

        return (
             <div className="card">
                    <div className="card-header">
                        Editar Empleados
                    </div>
                    <div className="card-body">
                        

                       
                  
                     <form  onSubmit={this.enviarDatos}>
                     

                     <div className="form-group">
                       <label htmlFor=""></label>
                       <input type="text" readOnly class="form-control" name="id" onChange={this.cambioValor}  id="id" value={empleado.id} aria-describedby="helpId" placeholder=""></input>
                     </div>


                        <div className="form-group">
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="nombre" onChange={this.cambioValor} value={empleado.nombre} id="nombre" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                        <div className="form-group">
                            <label htmlFor="">Apellidos</label>
                            <input type="text" name="apellidos" onChange={this.cambioValor} value={empleado.apellidos} id="apellidos" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                            <br></br>
                            <div className="form-group">
                            <label htmlFor="">Direccion</label>
                            <input type="text" name="direccion" onChange={this.cambioValor} value={empleado.direccion} id="direccion" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                            <br></br>
                            <div className="form-group">
                            <label htmlFor="">Telefono</label>
                            <input type="text" name="telefono" onChange={this.cambioValor} value={empleado.telefono} id="telefono" className="form-control" placeholder="" aria-describedby="helpId"></input>
                            </div>
                            <br></br>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Modificar Registro</button>
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
}

export default Editar;