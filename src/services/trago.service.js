import http from "../http-common";

class TragoDataService {
  getAll() {
    return http.get("/trago");
  }

  get(id) {
    return http.get(`/trago/${id}`);
  }

  create(data) {
    return http.post("/trago", data);
  }

  update(id, data) {
    return http.put(`/trago/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trago/${id}`);
  }

  deleteAll() {
    return http.delete(`/trago`);
  }

  findByTitle(title) {
    return http.get(`/trago?nombre=${title}`);
  }
}

export default new TragoDataService();