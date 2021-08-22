import http from "../Http/HttpApi";

class ProductosDataService {
    async create(data) {
        return await http.post('/Productos', data);
    }
    async update(data) {
        return await http.put(`/Productos`, data);
    }
    async getAll( search = '', page = 1, rows = 4) {
        return await http.get(`/Productos/?search=${search}&page=${page}&rows=${rows}`);
    }
    async get(id) {
        return await http.get(`/Productos/${id}`);
    }
    async delete(id) {
        return await http.delete(`/Productos/${id}`)
    }
    async getTotalRecords(search) {
        return await http.get(`/Productos/GetTotalRecords?search=${search}`);
    }
}

export default new ProductosDataService();