import React, { Component } from 'react';
import ProductosDataService from '../Service/Productos.Service'
import ValidForm from "../Utils/ValidForm";

const validForm = new ValidForm();

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

const modelError = {
    nombre: '',
    restriccionEdad: '',
    precio: '',
    compania: '',
    descripcion: '',
    fotoProducto: ''
}

class ProductosCU extends Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id === undefined ? 0 : this.props.match.params.id;
        this.state = {
            loading: false,
            id: id,
            fields: model,
            errors: modelError
        }
    }


    //Cuando el componente se monto obtener los campos solo si es para editar
    componentDidMount = async () => {
        let id = this.state.id;
        await this.resetFiels();
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
                this.resetFiels();
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


    //Guardar 
    saveSubmit = async (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        errors = validForm.cleanErrors(errors);
        this.setState({ errors: errors, loading: true });
        let responseData;
        let fields = this.state.fields;
        const filedata = new FormData();

        Object.keys(fields).forEach(key => filedata.append(key, fields[key]));

        if (this.state.fields.id === 0) {
            await ProductosDataService.create(filedata)
                .then(response => {
                    responseData = response.data;
                })
                .catch(function (error) {
                    errors = validForm.displayErrors(error.response.data.errors, errors);
                });
        }
        else {
            await ProductosDataService.update(filedata)
                .then(response => {
                    responseData = response.data;
                })
                .catch(function (error) {
                    errors = validForm.displayErrors(error.response.data.errors, errors);
                });
        }

        this.setState({ errors: errors, loading: false });
        if (responseData != null) {
            window.location.href = "/productos";
        }
    }

    //Para obtener la imagen del servidor
    getPathFoto() {
        if (this.state.fields.pathFoto === "" || this.state.fields.pathFoto === null)
            return "assets/images/users/no-image.jpg";
        return 'https://localhost:44327/' + this.state.fields.pathFoto;
    }

    //Reset a los valores por default de los fields
    resetFiels() {
        let fields = Object.assign(model)
        this.setState({ fields: fields });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>{this.state.id === 0 ? "Nuevo" : "Editar"} registro de productos</h2>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
            <form>
                <div className="panel-body">
                    <div className="row">
                        <input name="idCategoria" type="hidden" value={this.state.fields.id}></input>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.fields["nombre"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                let errors = this.state.errors;
                                                errors.nombre = validForm.validChangeInput(fields, "nombre", e, "nombre");
                                                if (errors.nombre === '')
                                                    errors.nombre = validForm.ValidChangeInputMaxLengh(e, "nombre", 50);
                                                fields.nombre = e.target.value;
                                                this.setState({ fields, errors });
                                            }
                                            }
                                        />
                                        <span className="text-danger">{this.state.errors["nombre"] || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Precio</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            step="0.01"
                                            min="1"
                                            max="1000"
                                            value={this.state.fields["precio"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                let errors = this.state.errors;
                                                errors.precio = validForm.ValidChangeInputMinValue(e, "precio", 1);
                                                if (errors.precio === '')
                                                errors.precio = validForm.ValidChangeInputMaxValue(e, "precio", 1000);
                                                fields.precio = e.target.value;
                                                this.setState({ fields, errors });
                                            }
                                            }
                                        />
                                        <span className="text-danger">{this.state.errors["precio"] || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Compañia</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.fields["compania"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                let errors = this.state.errors;
                                                errors.compania = validForm.validChangeInput(fields, "compania", e, "compañia");
                                                if (errors.compania === '')
                                                    errors.compania = validForm.ValidChangeInputMaxLengh(e, "compañia", 50);
                                                fields.compania = e.target.value;
                                                this.setState({ fields, errors });
                                            }
                                            }
                                        />
                                        <span className="text-danger">{this.state.errors["compania"] || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Edad máxima</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={this.state.fields["restriccionEdad"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                let errors = this.state.errors;
                                                errors.restriccionEdad = validForm.ValidChangeInputMinValue(e, "edad máxima", 0);
                                                if (errors.restriccionEdad === '')
                                                    errors.restriccionEdad = validForm.ValidChangeInputMaxValue(e, "edad máxima", 100);
                                                fields.restriccionEdad = e.target.value;
                                                this.setState({ fields, errors });
                                            }
                                            }
                                        />
                                        <span className="text-danger">{this.state.errors["restriccionEdad"] || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.fields["descripcion"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                let errors = this.state.errors;
                                                errors.descripcion = validForm.ValidChangeInputMaxLengh(e, "descripción", 100);
                                                fields.descripcion = e.target.value;
                                                this.setState({ fields });
                                            }
                                            }
                                        />
                                        <span className="text-danger">{this.state.errors["descripcion"] || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Imagen de referencia</label>
                                            <input className="form-control" type="file" id="image" accept="image/*"
                                                onChange={e => {
                                                    let fields = this.state.fields;
                                                    fields.fotoProducto = e.target.files[0];
                                                    this.setState({ fields });
                                            }} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Imagen actual</label>
                                        <div className="col-md-9">
                                            <img style={{
                                                width: "100px", height: "100px" }} src={this.getPathFoto()} />
                                        </div>
                                    </div>
                                </div>
                    </div>
                        </div>
                        <hr/>
                <div className="panel-footer">
                    <button
                        type="button"
                        onClick={(e) => { this.saveSubmit(e); }}
                        className="btn btn-success">
                        {" "}
                                                                    Guardar
                                                        </button>
                            { "  "}
                            <button
                                type="button"
                                onClick={(e) => { window.location.href = "/productos"; }}
                                className="btn btn-danger">
                                {" "}
                                                                    Cancelar
                                                        </button>
                </div>
                    </form>
                </div>
            </div>
            )
    }
}

export default ProductosCU;
