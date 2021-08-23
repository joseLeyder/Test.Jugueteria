import React, { Component } from 'react';
import ProductosDataService from '../Service/Productos.Service'
import TableReat from '../components/TableReact';
import Spinner from '../components/Spinner';


const model = {
    id: 0,
    nombre: '',
    restriccionEdad: 0,
    precio: 0.0,
    compania: '',
    descripcion: ''
}
class Productos extends Component {

    constructor(props) {
        super(props);

        this.tableHandler = this.tableHandler.bind(this);

        this.state = {
            //Configuracion necesaria para utilizar el componete Table
            tableInfo: {
                columns: [
                    {
                        Header: "Productos",
                        columns: [
                            {
                                Header: "id",
                                accessor: "id"
                            },
                            {
                                Header: "Nombre",
                                accessor: "nombre",
                            },
                            {
                                Header: "Edad",
                                accessor: "restriccionEdad",
                            },
                            {
                                Header: "Precio",
                                accessor: "precio"
                            },
                            {
                                Header: "Compañia",
                                accessor: "compania"
                            }
                        ]
                    },
                    {
                        Header: "Acciones",
                        columns: [
                            {
                                Header: "Ver",
                                id: "ver",
                                accessor: (str) => 'ver',
                                Cell: (tableProps) => {
                                    return (
                                        <a
                                            href={`/productos-ver/` + tableProps.row.values.id}
                                            className="btn btn-primary"
                                            style={{ width: '100%' }}
                                        > Ver</a>
                                    )
                                }
                            },
                            {
                                Header: "Editar",
                                id: "editar",
                                accessor: (str) => 'editar',
                                Cell: (tableProps) => {
                                    return (
                                        <a
                                            href={`/productos-editar/` + tableProps.row.values.id}
                                            className="btn btn-success editar"
                                            style={{ width: '100%' }}
                                        > Editar</a>
                                    )
                                }
                            },
                            {
                                Header: "Eliminar",
                                id: "eliminar",
                                accessor: (str) => 'eliminar',
                                Cell: (tableProps) => {
                                    return (
                                                <button
                                                    data-toggle="modal"
                                            data-target="#exampleModal"
                                            className="btn btn-danger btn-block"
                                            style={{ width: '100%' }}
                                                    data-id={tableProps.row.values.id}
                                                    onClick={() => { this.handlerDesactivar(tableProps.row.values) }}
                                                >
                                                    Eliminar
                                                </button>
                                    )
                                }
                            },
                        ]
                    }
                ],
                hiddenColumns: ["id"],
                data: [],
                page: 1,
                rows: 5,
                search: "",
                totalRows: 0
            },
            loading: true,
            productoDelete: model 
        }
    }

    componentDidMount() {
        this.getAll(this.state.tableInfo["page"], this.state.tableInfo["rows"], this.state.tableInfo["search"]);
    }


    //Handler para actualizar los valores de la tabla
    async tableHandler(page, rows, search, isDelay) {
        let delayAccion = isDelay ? 1500 : 0;
        let tableInfo = this.state.tableInfo;
        tableInfo.page = page;
        tableInfo.rows = rows;
        tableInfo.search = search;
        if (!isDelay)
            tableInfo.data = [];
        this.setState({ tableInfo: tableInfo });
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(async function () {
            await this.getAll(page, rows, search);
        }.bind(this), delayAccion);
    }


    //Obtener todos los registros
    getAll = async (page, rows, search) => {
        this.setState({ loading: true });
        let tableInfo = this.state.tableInfo;
        await ProductosDataService.getAll(search, page, rows)
            .then(response => {
                tableInfo["data"] = response.data;
            }).catch(e => {
                console.log(e);
            });

        await ProductosDataService.getTotalRecords(search)
            .then(response => {
                tableInfo["totalRows"] = response.data;
            })
            .catch(e => {
                console.log(e);
            })

        this.setState({
            tableInfo: tableInfo,
            loading: false
        });
    }

    //Eliminar un registro
    deleteSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        let responseData;
        await ProductosDataService.delete(this.state.productoDelete["id"])
            .then(response => {
                responseData = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({ loading: false });
        if (responseData != null) {
            await this.getAll(this.state.tableInfo.page, this.state.tableInfo.rows, this.state.tableInfo.search);
            document.querySelector(`#exampleModal button[data-dismiss="modal"]`).click();
        }
    }

    //Obtener la información del producto que se desea eliminar
    handlerDesactivar = (producto) => {
        let desObj = { id: producto.id, nombre: producto.nombre }
        this.setState({
            productoDelete: desObj
        })
    }

    render() {
        return (
            <div>
                
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Eliminar registro</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>¿Deseas eliminar el registro?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={(e) => { this.deleteSubmit(e) }}>Eliminar</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Spinner show={this.state.loading} />
                <div className="row">
                    <div className="col-md-6">
                        <h2>Lista de productos</h2>
                    </div>
                    <div className="col-md-3">
                        <a
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            href="/productos-crear">
                            Nuevo registro
                                                    </a>   
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <TableReat
                            columns={this.state.tableInfo["columns"]}
                            data={this.state.tableInfo["data"]}
                            hiddenColumns={this.state.tableInfo["hiddenColumns"]}
                            handler={this.tableHandler}
                            pageExtends={this.state.tableInfo["page"]}
                            pageSizeExtends={this.state.tableInfo["rows"]}
                            totalRows={this.state.tableInfo["totalRows"]}
                            search={this.state.tableInfo["search"]}
                            />
                    </div>
                </div>
               
                </div>
            </div>
            )
    }
}

export default Productos;