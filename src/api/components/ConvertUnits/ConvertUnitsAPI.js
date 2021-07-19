import BaseAPI from '@/api/base/BaseAPI.js';

class ConvertUnitsAPI extends BaseAPI {
    constructor(){
        super();
        this.controler = 'ConvertUnits';
    }
}

export default new ConvertUnitsAPI();