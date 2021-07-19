import BaseAPI from '@/api/base/BaseAPI.js';

class UnitsAPI extends BaseAPI {
    constructor(){
        super();
        this.controler = 'Units';
    }
}

export default new UnitsAPI();