import BaseAPI from '@/api/base/BaseAPI.js';

class MaterialsAPI extends BaseAPI {
    constructor(){
        super();
        this.controler = 'Materials';
    }
}

export default new MaterialsAPI();