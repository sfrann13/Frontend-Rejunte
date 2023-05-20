import React, { Component } from "react";
import TragoDataService from "../services/trago.service";
import { Link } from "react-router-dom";

export default class TragosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTragos = this.retrieveTragos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTrago = this.setActiveTrago.bind(this);
    this.removeAllTragos = this.removeAllTragos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tragos: [],
      currentTrago: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTragos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
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

  searchTitle() {
    this.setState({
      currentTrago: null,
      currentIndex: -1
    });

    TragoDataService.findByTitle(this.state.searchTitle)
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
    const { searchTitle, tragos, currentTrago, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by nombre"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tragos List</h4>

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

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTragos}
          >
            Remove All
          </button>
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
                  <strong>Description:</strong>
                </label>{" "}
                {currentTrago.description}
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
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Trago...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
