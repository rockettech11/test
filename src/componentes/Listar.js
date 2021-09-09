import React from 'react';
import { Link } from "react-router-dom";


class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleados: []


        }
    }

    borrarRegistros=(id)=>{

       fetch("http://localhost/empleados/?borrar="+id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {

            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)

    

        console.log(id);
    }

    cargarDatos() {

      
        fetch("http://localhost/empleados/")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {

                console.log(datosRespuesta);
                this.setState({ datosCargados: true, empleados: datosRespuesta })
            })
            .catch(console.log)
  
        }

    componentDidMount() {
        this.cargarDatos();
    }

    render() {
        const { datosCargados, empleados } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {


            return (<table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(
                        (empleado) => (
                            <tr key={empleado.id}> 

                                <td>{empleado.id}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellidos}</td>
                                <td>{empleado.direccion}</td>
                                <td>{empleado.telefono}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="">
                                        <Link className="btn btn-warning" to={"/editar/"+empleado.id}>Editar</Link>
                                        <button type="button" className="btn btn-danger" 
                                        onClick={()=>this.borrarRegistros(empleado.id)}
                                        >Borrar</button>
                                    </div>


                                </td>
                            </tr>
                        )

                    )


                    }


                </tbody>
            </table>);
        }
    }
}

export default Listar;