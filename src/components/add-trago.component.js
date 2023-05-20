import React, { Component } from "react";
import TragoDataService from "../services/trago.service";

export default class AddTrago extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
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

  saveTrago() {
    var data = {
      nombre: this.state.nombre,
      description: this.state.description
    };

    TragoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          description: response.data.description,
          published: response.data.published,

          submitted: true
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
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTrago}>
              Add
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
              <label htmlFor="description">Description</label>
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

            <button onClick={this.saveTrago} className="btn btn-success">
              Agregar
            </button>
          </div>
        )}
      </div>
    );
  }
}
