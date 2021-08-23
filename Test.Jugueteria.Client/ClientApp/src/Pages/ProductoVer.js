import React, { Component } from 'react';
import ProductosDataService from '../Service/Productos.Service'

const model = {
    id: 0,
    nombre: '',
    restriccionEdad: 0,
    precio: 0.0,
    compania: '',
    descripcion: '',
    fotoProducto: null,
    pathFoto: ''
}

class ProductosVer extends Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id === undefined ? 0 : this.props.match.params.id;
        this.state = {
            loading: false,
            id: id,
            fields: model,
        }
    }


    //Cuando el componente se monto obtener los campos solo si es para editar
    componentDidMount = async () => {
        let id = this.state.id;
        if (id != 0) {
            await this.getByID(id);
        }
    }


    //Obtener los valores para editar
    getByID = async (id) => {
        this.setState({ loading: true });
        let fields = this.state.fields;
        await ProductosDataService.get(id)
            .then(response => {
                fields = response.data;
            })
            .catch(e => {
                console.log(e);
            });
        this.setState({
            fields: fields,
            loading: false
        });
    }

    //Para obtener la imagen del servidor
    getPathFoto() {
        if (this.state.fields.pathFoto === "" || this.state.fields.pathFoto === null)
            return "assets/images/users/no-image.jpg";
        return 'https://localhost:44327/' + this.state.fields.pathFoto;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img style={{
                            width: "300px", height: "300px"
                        }} src={this.getPathFoto()} />
                    </div>
                    <div className="col-md-6">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Nombre: {this.state.fields.nombre || ""}</li>
                            <li class="list-group-item">Compañia {this.state.fields.compania || ""}</li>
                            <li class="list-group-item">Precio: $ {this.state.fields.precio || ""}</li>
                            <li class="list-group-item">Edad máxima: {this.state.fields.restriccionEdad || ""}</li>
                            <li class="list-group-item">Descripcion: {this.state.fields.descripcion || ""}</li>
                        </ul>
                    </div>
                </div>
                <br />
                <hr/>
                <div className="row">
                    <button
                        type="button"
                        onClick={(e) => { window.location.href = "/productos"; }}
                        className="btn btn-secondary">
                        {" "}
                                                                    Regresar
                                                        </button>
                </div>
            </div>
            );
    }
}

export default ProductosVer;