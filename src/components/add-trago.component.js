import React, { Component } from "react";
import TragoDataService from "../services/trago.service";

export default class AddTrago extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDisponible = this.onChangeDisponible.bind(this);
    this.onChangeIngredientes = this.onChangeIngredientes.bind(this);
    this.onChangePreparacion = this.onChangePreparacion.bind(this);
    this.saveTrago = this.saveTrago.bind(this);
    this.newTrago = this.newTrago.bind(this);

    this.state = {
      id: null,
      nombre: "",
      description: "", 
      ingredientes: "",
      preparacion: "",
      disponible: false
    };
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeIngredientes(e) {
    this.setState({
      ingredientes: e.target.value
    });
  }

  onChangePreparacion(e) {
    this.setState({
      preparacion: e.target.value
    });
  }

  onChangeDisponible(e) {
    this.setState({
      disponible: e.target.checked
    });
  }

  saveTrago() {
    var data = {
      nombre: this.state.nombre,
      description: this.state.description,
      preparacion: this.state.preparacion,
      ingredientes: this.state.ingredientes,
      disponible: this.state.disponible
    };

    TragoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          description: response.data.description,
          disponible: response.data.disponible,
          ingredientes: response.data.ingredientes,
          preparacion: response.data.preparacion,

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTrago() {
    this.setState({
      id: null,
      nombre: "",
      description: "", 
      ingredientes: "",
      preparacion: "",
      disponible: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Agregado correctamente!</h4>
            <button className="btn btn-success" onClick={this.newTrago}>
              Agregar trago
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingredientes">Ingredientes</label>
              <input
                type="text"
                className="form-control"
                id="ingredientes"
                required
                value={this.state.ingredientes}
                onChange={this.onChangeIngredientes}
                name="ingredientes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preparacion">Preparacion</label>
              <input
                type="text"
                className="form-control"
                id="preparacion"
                required
                value={this.state.preparacion}
                onChange={this.onChangePreparacion}
                name="preparacion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="disponible">Disponible</label>
              <input
                type="checkbox"
                className="form-control"
                id="disponible"
                required
                value={this.state.disponible}
                onChange={this.onChangeDisponible}
                name="disponible"
              />
            </div>

            <button onClick={this.saveTrago} className="btn btn-success">
              Agregar
            </button>
          </div>
        )}
      </div>
    );
  }
}
