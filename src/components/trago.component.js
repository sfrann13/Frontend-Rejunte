import React, { Component } from "react";
import TragoDataService from "../services/trago.service";
import { withRouter } from '../common/with-router';

class Trago extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDisponible = this.onChangeDisponible.bind(this);
    this.onChangeIngredientes = this.onChangeIngredientes.bind(this);
    this.onChangePreparacion = this.onChangePreparacion.bind(this);
    this.getTrago = this.getTrago.bind(this);
    //this.updateDisponible = this.updateDisponible.bind(this);
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

  onChangeIngredientes(e) {
    if (e.target !== undefined){
      const ingredientes = e.target.value;

      
          this.setState(function(prevState) {
            return {
              currentTrago: {
                ...prevState.currentTrago,
                ingredientes: ingredientes
              }
            };
          });
    }
  }

  onChangePreparacion(e) {
    
    if (e.target !== undefined){
      const preparacion = e.target.value;

      this.setState(function(prevState) {
        return {
          currentTrago: {
            ...prevState.currentTrago,
            preparacion: preparacion
          }
        };
      });
    }
  }

  onChangeDisponible(e) {
    if (e.target !== undefined){

      const disponible = e.target.checked;
  
      this.setState(function(prevState) {
        return {
          currentTrago: {
            ...prevState.currentTrago,
            disponible: disponible
          }
        };
      });
    }
  }

  onChangeDescription(e) {
    if (e.target !== undefined){

      const description = e.target.value;
      
      this.setState(prevState => ({
        currentTrago: {
          ...prevState.currentTrago,
          description: description
        }
      }));
    }
  }
  // onChangeIngredientes(e) {
  //   if (e.target != undefined){
      
  //     const ingredientes = e.target.value;
      
  //     this.setState(prevState => ({
  //       currentTrago: {
  //         ...prevState.currentTrago,
  //         ingredientes: ingredientes
  //       }
  //     }));
  //   }

  // }
  // onChangePreparacion(e) {
  //   if (e.target != undefined){

  //     const preparacion = e.target.value;
      
  //     this.setState(prevState => ({
  //       currentTrago: {
  //         ...prevState.currentTrago,
  //         preparacion: preparacion
  //       }
  //     }));
  //   }
  // }
  // onChangeDisponible(e) {
  //   if (e.target != undefined){
      
  //     const disponible =e.target.value;
      
  //     this.setState(prevState => ({
  //       currentTrago: {
  //         ...prevState.currentTrago,
  //         disponible: disponible
  //       }
  //     }));
  //   }
  // }

  

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

  // updateDisponible(disponible) {
  //   var data = {
  //     id: this.state.currentTrago.id,
  //     disponible: disponible
  //   };

  //   TragoDataService.update(this.state.currentTrago.id, data)
  //     .then(response => {
  //       this.setState(prevState => ({
  //         currentTrago: {
  //           ...prevState.currentTrago,
  //           disponible: disponible
  //         }
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  updateTrago() {
    TragoDataService.update(
      this.state.currentTrago.id,
      this.state.currentTrago
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Trago actualizado!"
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
        this.props.router.navigate('/trago');
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
            <h4>Editar Trago</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre"><strong>Nombre</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentTrago.nombre} 
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description"><strong>Description</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTrago.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredientes"><strong>Ingredientes</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredientes"
                  value={currentTrago.ingredientes}
                  onChange={this.onChangeIngredientes}

                />
              </div>
              <div className="form-group">
                <label htmlFor="preparacion"><strong>Preparacion</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="preparacion"
                  value={currentTrago.preparacion}
                  onChange={this.onChangePreparacion}

                />
              </div>
              <div className="form-group" style= {{display:'flex'}}>
                <label htmlFor="disponible"><strong>Disponible</strong></label>
                <input
                  type="checkbox"
                  className="form-control"
                  id="disponible"
                  value={currentTrago.disponible}
                  onChange={this.onChangeDisponible}
                  style= {{height:'20px', width:'20px', marginLeft:'auto'}}
                />
              </div>
            </form>

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteTrago}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateTrago}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Seleccione un Trago...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trago);