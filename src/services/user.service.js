import http from "../http-common";

class UserDataService  {

    getAll() {
        return http.get("/auth");
    }

    get(id) {
        return http.get(`/auth/${id}`);
    }

    create(data) {
        return http.post("/auth", data);
    }

    update(id, data) {
        return http.put(`/auth/${id}`, data);
    }

    delete(id) {
        return http.delete(`/auth/${id}`);
    }

    deleteAll() {
        return http.delete("/auth");
    }

    findByTitle(name) {
        return http.get(`/auth?name=${name}`);
    }
}

const newUserDataService = new UserDataService();
export default newUserDataService;