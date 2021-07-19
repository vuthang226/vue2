import BaseAPI from '@/api/base/BaseAPI.js';

class StoresAPI extends BaseAPI {
    constructor(){
        super();
        this.controler = 'Stores';
    }
}

export default new StoresAPI();