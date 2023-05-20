import React, { Component } from "react";
import TragoDataService from "../services/trago.service";
import { Link } from "react-router-dom";

export default class TragosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrieveTragos = this.retrieveTragos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTrago = this.setActiveTrago.bind(this);
    this.removeAllTragos = this.removeAllTragos.bind(this);
    this.searchNombre = this.searchNombre.bind(this);

    this.state = {
      tragos: [],
      currentTrago: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrieveTragos();
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  retrieveTragos() {
    TragoDataService.getAll()
      .then(response => {
        this.setState({
          tragos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTragos();
    this.setState({
      currentTrago: null,
      currentIndex: -1
    });
  }

  setActiveTrago(trago, index) {
    this.setState({
      currentTrago: trago,
      currentIndex: index
    });
  }

  removeAllTragos() {
    TragoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNombre() {
    this.setState({
      currentTrago: null,
      currentIndex: -1
    });

    TragoDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          tragos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNombre, tragos, currentTrago, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre"
              value={searchNombre}
              onChange={this.onChangeSearchNombre}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNombre}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de tragos</h4>

          <ul className="list-group">
            {tragos &&
              tragos.map((trago, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTrago(trago, index)}
                  key={index}
                >
                  {trago.nombre}
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTragos}
          >
            Eliminar todos
          </button> */}
        </div>
        <div className="col-md-6">
          {currentTrago ? (
            <div>
              <h4>Trago</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentTrago.nombre}
              </div>
              <div>
                <label>
                  <strong>Descripcion:</strong>
                </label>{" "}
                {currentTrago.description}
              </div>
              <div>
                <label>
                  <strong>Ingredientes:</strong>
                </label>{" "}
                {currentTrago.ingredientes}
              </div>
              <div>
                <label>
                  <strong>Preparacion:</strong>
                </label>{" "}
                {currentTrago.preparacion}
              </div>
              <div>
                <label>
                  <strong>Disponible:</strong>
                </label>{" "}
                {currentTrago.disponible ? "Si" : "No"}
              </div>

              <Link
                to={"/trago/" + currentTrago.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Seleccione un trago para modificar...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
