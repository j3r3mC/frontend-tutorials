import http from "../http-common";

class UserDataService  {

    getAll() {
        return http.get("/auth");
    }

    getByEmail(email) {
        return http.get(`/auth/register`);
    }

    getId(id) {
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
}

const newUserDataService = new UserDataService();
export default newUserDataService;