import BaseAPIConfig from '@/api/base/BaseAPIConfig.js';

export default class BaseAPI {

    constructor() {
        this.controler = null;
    }
    getAll(){
        return BaseAPIConfig.get(`${this.controler}`);
    }
    /**
     * Phương thức lấy dữ liệu theo trang và sắp xếp
     */
    getDataByPageAndFilter(pageNum,numInPage,column,filter,type) {
        return BaseAPIConfig.get(`${this.controler}/page?pageNum=${pageNum}&numInPage=${numInPage}&column=${column}&filter=${filter}&type=${type}`);    
    }
    /**Lấy dữ liệu by id */
    getEntityById(id){
        return BaseAPIConfig.get(`${this.controler}?id=${id}`);
    }
    /**
     * Hàm thêm mới dữ liệu
     * @param {*} object dữ liệu cần thêm mới
     * vhthang 18/03/2021
     */
    insert(object) {
        return BaseAPIConfig.post(`${this.controler}`, object);
    }
    /**
     * Hàm cập nhật dữ liệu
     * @param {*} object dữ liệu cần chỉnh sửa
     */
    update(object) {
        return BaseAPIConfig.put(`${this.controler}`, object);
    }
    /**
     * Hàm xóa bản ghi theo id
     * @param {*} id id của dữ liệu cần xóa
     */
    delete(object) {
        return BaseAPIConfig.post(`${this.controler}/delete`,object);
    }
    getHighestCode(code){
        return BaseAPIConfig.get(`${this.controler}/code?code=${code}`);
    }

}