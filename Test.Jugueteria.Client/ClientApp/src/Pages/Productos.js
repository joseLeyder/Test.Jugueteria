import React, { Component } from 'react';
import ProductosDataService from '../Service/Productos.Service'
import TableReat from '../components/TableReact';


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

        //this.handleClick = this.handleClick.bind(this);
        this.tableHandler = this.tableHandler.bind(this);
        this.state = {
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
                                                <button
                                                    className="btn btn-primary ver"
                                                    data-id={tableProps.row.values.id}
                                                    onClick={e => {
                                                        this.props.history.push({
                                                            pathname: `/productos-ver/${tableProps.row.original.id}`
                                                        })
                                                    }}
                                                    >
                                                    <i className="fa fa-eye"></i> Ver
                                                </button>
                                    )
                                }
                            },
                            {
                                Header: "Editar",
                                id: "editar",
                                accessor: (str) => 'editar',
                                Cell: (tableProps) => {
                                    return (
                                                <button
                                                    className="btn btn-success atender"
                                                    data-id={tableProps.row.values.id}
                                                    onClick={e => {
                                                        this.props.history.push({
                                                            pathname: `/productos-editar/${tableProps.row.original.id}`
                                                        })
                                                    }}>
                                                    <i className="fa fa-check"></i> Editar
                                                </button>
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
                                                    data-target="#deletecategoria"
                                                    className="btn btn-danger"
                                                    data-id={tableProps.row.values.id}
                                                    onClick={() => { this.handlerDesactivar(tableProps.row.values) }}
                                                >
                                                    <i className="fa fa-ban"></i>Eliminar
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

    getAll = async (page, rows, search) => {
        this.setState({ loading: true });
        let tableInfo = this.state.tableInfo;
        await ProductosDataService.getAll(search, page, rows)
            .then(response => {
                tableInfo["data"] = response.data;
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });

        await ProductosDataService.getTotalRecords(search)
            .then(response => {
                tableInfo["totalRows"] = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })

        this.setState({
            tableInfo: tableInfo,
            loading: false
        });
    }

    deleteById = async (id) => {
        this.setState({ loading: true });
        let responseData;
        await ProductosDataService.delete(id)
            .then(response => {
                responseData = response.data;
            })
            .catch(function (error) {
                console.log(error)
            });

        this.setState({ loading: false });
        if (responseData != null) {
            await this.tableHandler(this.state.tableInfo.page, this.state.tableInfo.rows, this.state.tableInfo.search, false);
        }
        if (document.querySelector(".trChild")) {
            document.querySelectorAll(".trChild").forEach(item => {
                item.remove();
            });
        }
    }

    handlerDesactivar = (producto) => {
        let desObj = { id: producto.id, nombre: producto.nombre }
        this.setState({
            productoDelete: desObj
        })
    }

    render() {
        return (
                <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Lista de productos</h2>
                    </div>
                    <div className="col-md-3">
                        <a
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            href="/productos-crear">
                            <i className="fas fa-plus"></i> Nuevo registro
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
                    <div className="modal fade" id="deletecategoria" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{`¿Esta seguro que desea eliminar el registro de ${this.state.productoDelete.nombre}?`}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    <button id="toDelete" type="button" name="modalDe" className="btn btn-primary" onClick={() => { this.deleteById(this.state.productoDelete.id) }}>Eliminar producto</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )
    }
}

export default Productos;