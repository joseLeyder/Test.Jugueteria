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
    descripcion: ''
}

const modelError = {
    nombre: '',
    restriccionEdad: '',
    precio: '',
    compania: '',
    descripcion: ''
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

    componentDidMount = async () => {
        let id = this.state.id;
        await this.resetFiels();
        if (id != 0) {
            await this.getByID(id);
        }
    }

    getByID = async (id) => {
        this.setState({ loading: true });
        let fields = this.state.fields;
        await ProductosDataService.get(id)
            .then(response => {
                this.resetFiels();
                fields = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        //if (fields.idTicket != null) {
        //    await TicketDataService.getAllFiles(idTicket)
        //        .then(response => {
        //            fields.archivos = response.data;
        //        })
        //        .catch(e => {
        //            console.log(e);
        //        });
        //}
        this.setState({
            fields: fields,
            loading: false
        });
    }

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
            await ProductosDataService.create(fields)
                .then(response => {
                    responseData = response.data;
                })
                .catch(function (error) {
                    errors = validForm.displayErrors(error.response.data.errors, errors);
                    console.log(error.response.data.errors);
                    
                });
        }
        else {
            await ProductosDataService.update(fields)
                .then(response => {
                    responseData = response.data;
                })
                .catch(function (error) {
                    errors = validForm.displayErrors(error.response.data.errors, errors);
                    console.log(error.response.data.errors);
                });
        }

        this.setState({ errors: errors, loading: false });
        if (responseData != null) {
            window.location.href = "/productos";
        }
    }

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
                                                fields["nombre"] = e.target.value;
                                                this.setState({ fields });
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
                                            value={this.state.fields["precio"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                fields["precio"] = e.target.value;
                                                this.setState({ fields });
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
                                                fields["compania"] = e.target.value;
                                                this.setState({ fields });
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
                                            value={this.state.fields["restriccionEdad"] || ""}
                                            onChange={e => {
                                                let fields = this.state.fields;
                                                fields["restriccionEdad"] = e.target.value;
                                                this.setState({ fields });
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
                                                fields["descripcion"] = e.target.value;
                                                this.setState({ fields });
                                            }
                                            }
                                        />
                                        <span className="text-danger">{this.state.errors["descripcion"] || ""}</span>
                                    </div>
                                </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <button
                        type="button"
                        onClick={(e) => { this.saveSubmit(e); }}
                        className="btn btn-success pull-right">
                        <i className="fas fa-check-circle"></i>{" "}
                                                                    Guardar
                                                        </button>
                </div>
                    </form>
                </div>
            </div>
            )
    }
}

export default ProductosCU;
