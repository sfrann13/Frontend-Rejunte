import React, { Component } from "react";
import TragoDataService from "../services/trago.service";
import { withRouter } from '../common/with-router';

class Trago extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTrago = this.getTrago.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTrago = this.updateTrago.bind(this);
    this.deleteTrago = this.deleteTrago.bind(this);

    this.state = {
      currentTrago: {
        nombre: "",
        description: "", 
        ingredientes: "",
        preparacion: "",
        disponible: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTrago(this.props.router.params.id);
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTrago: {
          ...prevState.currentTrago,
          nombre: nombre
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTrago: {
        ...prevState.currentTrago,
        description: description
      }
    }));
  }

  getTrago(id) {
    TragoDataService.get(id)
      .then(response => {
        this.setState({
          currentTrago: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(disponible) {
    var data = {
      id: this.state.currentTrago.id,
      nombre: this.state.currentTrago.nombre,
      description: this.state.currentTrago.description,
      disponible: disponible
    };

    TragoDataService.update(this.state.currentTrago.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTrago: {
            ...prevState.currentTrago,
            disponible: disponible
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTrago() {
    TragoDataService.update(
      this.state.currentTrago.id,
      this.state.currentTrago
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The trago was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTrago() {    
    TragoDataService.delete(this.state.currentTrago.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tragos');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTrago } = this.state;

    return (
      <div>
        {currentTrago ? (
          <div className="edit-form">
            <h4>Trago</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentTrago.nombre} 
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTrago.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTrago.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTrago.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTrago}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTrago}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Trago...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trago);