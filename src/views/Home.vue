<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="header1">
      <MaterialHeader/>
    </div>
    <div class="main">
      <div class="panel-left">
        <MaterialMenu
        :MenuBarCus="MenuBarCus"
        />
      </div>
      <div class="panel-right">
        <MaterialContent
         :Materials="Materials" 
         :pageNum="pageNum"
         :numPageMax="numPageMax"
         :numOfMaterial="numOfMaterial"
         @showMaterial="showMaterial"
         @addMaterial="addMaterial"
         @cloneMaterial="cloneMaterial"
         @updateMaterial="updateMaterial"
         @deleteMaterial="deleteMaterial"
         @refreshData="refreshData"
         @changePage="changePage"
         @sortColumn="sortColumn"
         @filterSearch="filterSearch"
        />
      </div>
    </div>
    <MaterialDialog
      :isDialogHide="isDialogHide"
      :ConvertUnits="ConvertUnitFilter"
      :material="material"
      :Stores="formatStores"
      :Units="formatUnits"
      :isAdd="isAdd"
      @btnCloseDialog="btnCloseDialog"
      @entityAdd="entityAdd"
      @btnNewRow="btnNewRow"
      @btnDeleteRow="btnDeleteRow"
      @saveData="saveData"
      @changeUnitMaterial="changeUnitMaterial"
      @changeMaterialCode="changeMaterialCode"
      @changeUnit="changeUnit"
      
    />
    <MaterialDialogAdd
      :isDialogAddHide="isDialogAddHide"
      :DialogAdd="DialogAdd[this.DialogAddType]"
      @btnCloseDialogAdd="btnCloseDialogAdd"
      @saveEntity="saveEntity"
    />
    <MaterialDialogPopUp
      :isDialogPopupHide="isDialogPopupHide"
      :msgPopUp="msgPopUp"
      :isDeleteCf="isDeleteCf"
      @btnCloseDialogPopup="btnCloseDialogPopup"
      @btnDeleteCf="btnDeleteCf"
    />
    <MaterialMessagePopUp
      :isMsgHide="isMsgHide"
      :msgUser="msgUser"
      @btnCloseMsg="btnCloseMsg"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import MaterialMenu from '@/components/Material/MaterialMenu.vue';
import MaterialHeader from '@/components/Material/MaterialHeader.vue';
import MaterialContent from '@/components/Material/MaterialContent.vue';
import MaterialDialog from '@/components/Material/MaterialDialog.vue';
import MaterialDialogAdd from '@/components/Material/MaterialDialogAdd.vue';
import MaterialDialogPopUp from '@/components/Material/MaterialDialogPopUp.vue';
import MaterialMessagePopUp from '@/components/Material/MaterialMessagePopUp.vue'
import MaterialsAPI from '@/api/components/Materials/MaterialsAPI';
import StoresAPI from '@/api/components/Stores/StoresAPI';
import UnitsAPI from '@/api/components/Units/UnitsAPI';
import '@/commons/css/button.css';
import '@/commons/css/icon.css';
import '@/commons/css/input.css';
export default Vue.extend({
  name: 'Home',
  data(){
    return{
      /**Các biến phân trang và sắp sếp
       * Số trang 
       * số bản ghi 1 trang
       * cột sắp sếp
       * từ tìm kiếm
       * Cách sắp sếp
       */
      pageNum:1,
      numInPage:30,
      column:0,
      filter:"",
      type:0,   
      numOfMaterial:0,    
      /**Thanh menu rút gọn
       * vhthang 24/3/2020
       */
      MenuBarCus:[
          {class:"icon-menu-list", title:'Nguyên vật liệu'},
      ],
      /**Nguyên vật liệu 
       * Danh sách nguyên vật liệu
       * Danh sách chuyeerr đổi đơn vị
       * Danh sách kho hàng
       * Kho hàng
       * Danh sách đơn vị
       * Đơn vị
       * vhthang 17/3/2020
      */
      Materials:[], 
      material:{},
      ConvertUnits:[],
      Stores:[],
      store:{
        storeId:"b18323da-81a1-11eb-ab11-00fffc943f6f",storeName:""
      },
      Units:[],
      unit:{
        unitId:"b18323da-81a1-11eb-ab11-00fffc943f6f",unitName:""
      },
      /**Ẩn dialog chi tiết nguyên vật liệu*/
      isDialogHide:true,
      isDialogAddHide:true,
      isDialogPopupHide:true,
      isMsgHide:true,
      /**
       * Tiêu đề mục dialog add
       */
      DialogAdd:[
        {title:"Thêm đơn vị tính",name:"Đơn vị tính"},
        {title:"Thêm kho",name:"Tên kho"}
      ],
      /**
       * Nội dung đề mục dialog add
       * 0:ĐVT 1:Kho
       */
      DialogAddType:-1,
      /**
       * Mở dialog nhấn cất (Lưu - Thêm mới)
       * 0:Thêm mới  1:Update
       */
      isAdd:-1,
      /**Nội dung tin nhắn thông báo hiển thị dialog */
      msgPopUp:"Không có nội dung",
      /**Thông báo người dùng */
      msgUser:"",
      /**true:xoa false:Warning */
      isDeleteCf:true,
    }
  },
  methods:{
    /**Hàm lấy danh sách nguyên vật liệu
     * vhthang 15/03/2021
     */
    async getMaterial(){
      const data = await MaterialsAPI.getDataByPageAndFilter(this.pageNum,this.numInPage,this.column,this.filter,this.type);
      this.Materials = data.data.data.materials;
      this.numOfMaterial = parseInt(data.data.data.numMaterials[0]);

    },

    /**Hàm lấy nguyên vật liệu và đơn vị chuyển đổi của nguyên vật liệu đó theo id
     * vhthang 15/03/2021
     */
    async getMaterialAndConvertById(id){   
      const res = await MaterialsAPI.getEntityById(id);
      this.material = res.data.data.material;
      this.ConvertUnits = this.formatConvertUnits(res.data.data.convertUnits);
    },

    /**Hàm lấy các kho chứa
     * vhthang 16/03/2021
     */
    async getStore(){
      const data = await StoresAPI.getAll();
      this.Stores = data.data.data;
    },

    /**Hàm lấy các kho chứa
     * vhthang 16/03/2021
     */
    async getUnit(){
      const data = await UnitsAPI.getAll();
      this.Units = data.data.data;
    },

    /**
     * Hàm lưu kho và đơn vị tính
     * sau khi lưu sẽ update lại kho và đơn vị tính <=============THIẾU
     * vhthang 19/03/2021
     */
    async saveEntity(data){
      if(data != null && data.trim() != ""){
        if(this.DialogAddType == 0){
          this.unit.unitName = data;
          const res = await UnitsAPI.insert(this.unit);
          this.callPopupMsg(res.data.message);
          
          this.getUnit();
        }else if (this.DialogAddType == 1){
          this.store.storeName = data;
          const res = await StoresAPI.insert(this.store);
          this.callPopupMsg(res.data.message);
          this.getStore();
        }
      }
      this.btnCloseDialogAdd();
    },

    /**Hàm xóa nvl
     * vhthang 19/03/2021
     */
    async btnDeleteCf(){
      const data = this.material;
      this.btnCloseDialogPopup(true);
      const res = await MaterialsAPI.delete(data);
      this.callPopupMsg(res.data.message);
      this.getMaterial();
      
    },

    /**Lưu dữ liệu thêm mới hoặc update
     * vhthang 24/03/2021
    */
    async saveData(type){
      if(this.isAdd == 0){
        const res = await MaterialsAPI.insert({
          material:this.material,
          convertUnits:this.formatConvertUnitsR(this.ConvertUnitsUpdate)
        });
        this.callPopupMsg(res.data.message);
        this.pageNum=1,
          this.column=0,
          this.filter="",
          this.type=0, 
        this.getMaterial();
      }else if(this.isAdd == 1){
        const res = await MaterialsAPI.update({
          material:this.material,
          convertUnits:this.formatConvertUnitsR(this.ConvertUnitsUpdate)
        });
        this.callPopupMsg(res.data.message);
        this.pageNum=1,
          this.column=0,
          this.filter="",
          this.type=0, 
          
        this.getMaterial();
      }
      this.material = {};
      this.ConvertUnits = [];
      this.isAdd=0;
      if(type == 0){this.btnCloseDialog();}
    },

    
    refreshData(){
      this.pageNum=1,
      this.numInPage=30,
      this.column=0,
      this.filter="",
      this.type=0, 
      this.getMaterial();
    },

    /**Hiển thị chi tiết Nguyên vật liệu
     * vhthang 15/03/2021
     */
    showMaterial(data){
      //hiển thị dialog
      this.isAdd = 1;
      this.isDialogHide=false;
      this.getMaterialAndConvertById(data);
      
    },

    /**Xử lý ẩn dialog
     * vhthang 16/03/2021
     */
    btnCloseDialog(){
      this.isAdd=-1;
      this.isDialogHide=true;
      this.material = {};
      this.ConvertUnits = [];
      
    },

    /**Xử lý ẩn dialog add
     * vhthang 17/03/2021
     */
    btnCloseDialogAdd(){
      this.isDialogAddHide=true;
      this.DialogAddType=-1;
    },

    /**Xử lý ẩn dialog popup
     * vhthang 19/03/2021
     */
    btnCloseDialogPopup(iss){
      if(iss == true){
      this.material = {};
      }
      this.isDialogPopupHide=true;
    },

    /**Xử lý khi nhấn thêm một số thành phần phụ  
     * vhthang 17/03/2021
     */
    entityAdd(num){
      this.isDialogAddHide=false;
      this.DialogAddType=num;
    },

    /**
     * chỉnh định dạng convert
     * trả về arr ConvertUnits đã đc định dạng
     */
    formatConvertUnits(conv){
      for(let i = 0; i < conv.length;i++){
        if(conv[i].convertOperation == 1){conv[i].convertOperation = "*";}
        if(conv[i].convertOperation == 2){conv[i].convertOperation = "/";}
      }
      return conv;
    },
    formatConvertUnitsR(conv){
      for(let i = 0; i < conv.length;i++){
        if(conv[i].convertOperation == "*"){conv[i].convertOperation = 1;}
        if(conv[i].convertOperation == "/"){conv[i].convertOperation = 2;}
      }
      return conv;
    },

    /**Nhưng phương thức thực hiện trong trên màn hình chính */
    /** Xử lý khi thêm mới nguyên vật liệu
     * vhthang 19/03.2021
    */
    addMaterial(){
      this.isAdd=0;
      this.isDialogHide = false; 
    },

    /** Nhân bản dữ liệu (Lấy dữ liệu từ nvl đã chọn để thêm mới)
     * vhthang 19/03/2021
    */
    cloneMaterial(data){
      this.isAdd=0;
      this.getMaterialAndConvertById(data);
      this.isDialogHide = false; 
    },

    /** Cập nhật dữ liệu lấy từ server chuyển chế độ update
     * vhthang 19/03/2021
     */
    updateMaterial(data){
      this.isAdd=1;
      this.getMaterialAndConvertById(data);
      this.isDialogHide = false; 
    },

    /**Xóa dữ liệu
     * vhthang 19/03/2021
     */
    deleteMaterial(data){
      this.isDialogPopupHide=false;
      this.isDeleteCf=true;
      this.msgPopUp="Bạn có chắc chán muốn xóa Nguyên vật liệu <<" + data.materialCode + " - " + data.materialName + ">>  không?";
      this.material=data;
    },

    /**Thêm dòng đơn vị chuyển đổi
     * vhthang 24/03/2021
     */
    btnNewRow(){
      this.ConvertUnits.push({
        convertId:"11452b0c-768e-5ff7-0d63-eeb1d8ed8cef",
        convertMaterialId:this.material.materialId,
        convertHandle:1,
        convertOperation:"*",
        convertUnitName:"",
        convertRatio:"1",
        convertDescription:""
      })
    },

    /**Xóa dòng đơn vị chuyển đổi
     * convertHandle 0:cập nhật 1:thêm mới 2:xóa 3:bỏ qua
     * vhthang 24/03/2021
     */
    btnDeleteRow(num){
      if(num == -1){
        if(this.ConvertUnits[this.ConvertUnits.length-1].convertHandle == 0){
          this.ConvertUnits[this.ConvertUnits.length-1].convertHandle = 2;
        }else if(this.ConvertUnits[this.ConvertUnits.length-1].convertHandle == 1){
          this.ConvertUnits.splice(this.ConvertUnits.length-1, 1);
        }
      }else{
        if(this.ConvertUnits[num].convertHandle == 0){
          this.ConvertUnits[num].convertHandle = 2;
        }else if(this.ConvertUnits[num].convertHandle == 1){
          this.ConvertUnits.splice(num,1);
        }
      }
    },

    /**
     * Gọi hàm hiện thông báo
     */
    callPopupMsg(msg){
      this.isMsgHide = false;
      this.msgUser = msg;
      setTimeout(() => { this.btnCloseMsg(); }, 5000)
    },

    /**Ẩn thông báo tin nhắn */
    btnCloseMsg(){
      this.isMsgHide = true;
      this.msgUser = "Thông báo ẩn";
    },

    /**Kiểm tra dữ liệu trước khi lưu
     * vhthang24/03/2021
    */
    validate(){
        if(this.material.materialName == null|| this.material.materialName.trim() == ""){
          this.msgPopUp="Mã nguyên vật liệu không được phép để trống";
          this.isDialogPopupHide=false;
          return false;
        }else if (this.material.materialCode == null|| this.material.materialCode.trim() == ""){
          this.msgPopUp="Tên nguyên vật liệu không được phép để trống";
          this.isDialogPopupHide=false;
          return false;
        }else if (this.material.materialUnit == null|| this.material.materialUnit.trim() == ""){
          this.msgPopUp="Đơn vị tính không được phép để trống";
          this.isDialogPopupHide=false;
          return false;
        }else return true;
      },
    /**
     * update mô tả của đơn vị chuyển đổi
     * vhthang24/03/2021
     */
    changeUnitMaterial(){
      for(let i = 0;i<this.ConvertUnits.length;i++){
        this.ConvertUnits[i].convertDescription ='1 '+this.ConvertUnits[i].convertUnitName+' = '+this.ConvertUnits[i].convertRatio+' '+this.ConvertUnits[i].convertOperation+' '+this.material.materialUnit
      }
    },

    /**
     * Kiểm tra trùng đơn vị tính
     * vhthang24/03/2021
     */
    changeUnit(num){
      // if(num > -1){
      //   if(this.ConvertUnitFilter[num].convertUnitName!= this.material.materialUnit){
      //     for(let i = 0 ;i<this.ConvertUnitFilter.length;i++)
      //     {
      //       if(this.ConvertUnitFilter[num].convertUnitName == this.ConvertUnitFilter[i].convertUnitName){
      //         this.ConvertUnitFilter[num].convertUnitName == null;
      //       }
      //     }
      //   }else this.ConvertUnitFilter[num].convertUnitName == null;
      // }
      
      for(let i = 0 ;i<this.UnitsExit.length;i++){
        if(this.ConvertUnitFilter[num].convertUnitName == this.UnitsExit[i]&&(num+1)!=(i)){
          this.msgPopUp="Đơn vị chuyển đổi không được trùng với đơn vị tính chính."
          this.isDeleteCf=false;
          this.isDialogPopupHide=false;
        }
      }
      

    },

    
    
    /**Chuyển trang đầu cuối 
     * vhthang24/03/2021
    */
    changePage(num){
            if(num < 1){
              this.pageNum = 1;
            }else if(num > this.numPageMax) this.pageNum = this.numPageMax;
            else this.pageNum = num;
            this.getMaterial();
    },
    /**Sắp xếp dữ liệu 
     * vhthang24/03/2021
    */
    sortColumn(sort){
      if(this.column != sort){
          this.column = sort;
          this.type = 0;
        }else {
          if(this.type == 0 )this.type = 1;
          else this.type = 0;
        }
      this.getMaterial();
    },

    /**
     * Luu ma code cao nhat
     * vhthang24/03/2021
     */
    changeMaterialCode(code){
      this.material.materialCode = code;
    },

    /**Timf kieems theo tuw 
     * vhthang24/03/2021
    */
    filterSearch(value,num){
      this.filter = value;
      this.column = num;
      console.log(value);
      this.getMaterial();
    },


    
    






  },
  components: {
    MaterialMenu,
    MaterialHeader,
    MaterialContent,
    MaterialDialog,
    MaterialDialogAdd,
    MaterialDialogPopUp,
    MaterialMessagePopUp
  },
  computed:{
    formatStores:function(){
      let stores = ['a'];
      stores = [];
      for(let i = 0; i < this.Stores.length;i++){
        stores[i] = this.Stores[i].storeName;
      }
      return stores;
    },
    formatUnits:function(){
      let units = ['a'];
      units = [];
      for(let i = 0; i < this.Units.length;i++){
        units[i] = this.Units[i].unitName;
      }
      return units;
    },
    
    ConvertUnitFilter:function(){
        return this.ConvertUnits.filter(function (convert) {
        return convert.convertHandle < 2
        })
    },
    ConvertUnitsUpdate:function () {
      return this.ConvertUnits.filter(function(convert){
        return (convert.convertUnitName );
      })
    },
    numPageMax:function(){
      return Math.ceil(this.numOfMaterial/this.numInPage);
    },

    UnitsExit:function(){
      const unitExit = [];
      if(this.material.materialUnit){
      unitExit.push(this.material.materialUnit);
      }
      for(let i=0;i<this.ConvertUnitFilter.length;i++){
        if(this.ConvertUnitFilter[i].convertUnitName != null||this.ConvertUnitFilter[i].convertUnitName != ""){
          unitExit.push(this.ConvertUnitFilter[i].convertUnitName);
        }
      }
      return unitExit;
    }
    
  }, 

  
  
  
  
  created(){
    /**Gọi danh sách dữ liệu khi load trang 
     * Danh sách nguyên vật liệu
     * Danh sách kho
     * Danh sách đơn vị
    */
    this.getMaterial();
    this.getStore();
    this.getUnit();
  },

  

  
});
</script>
<style>

body {
    margin:0px;
    font-size: 13px;
    font-family: Tahoma !important;
    color:black;
}


#home{
  font-family: Tahoma;
  color:black;
}
.header1{
  width: 100%;
  height: 55px;
}
.main{
  display:flex;
}
.panel-left {
    width: 230px;
    height: calc(100vh - 55px);
    background-color: #0072BC;
    color: #ffffff;
}
.panel-right {
    width: calc(100% - 246px);
    height: calc(100vh - 71px);
    position: absolute;
  
  padding: 8px;
  right: 0px;
}

::-webkit-scrollbar {
    width: 5px !important;
    height: 5px !important;
    z-index: 2
}

::-webkit-scrollbar-track {
    width: 6px;
    background-color: #bbb;
}

::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 8px;
}
</style>
