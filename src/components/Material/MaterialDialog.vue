<template>
        <div class="dialog-modal" :class="{isDialogHide:isDialogHide}">    
            <div class="dialog-content" >
                <div class="dialog-header">
                    <div class="dialog-header-title">Thêm nguyên vật liệu</div>
                    <div class="dialog-header-close">
                        <button @click="btnCloseDialog">x</button>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="grid-dialog-container">
                        <div class="grid-item">
                            Tên <span class="label-required">(*)</span>
                        </div>
                        <div class="grid-item display-flex">
                            <input v-model="material.materialName" id="materialName" :class="{inputrequird:!requird.name}" class="input1" type="text" ref="materialName" @input="changee($event)"/>
                            <div class="icon-required" :class="{isConvert:requird.name}">

                            </div>
                        </div>
                        <div class="grid-item">
                            Mã <span class="label-required">(*)</span>
                        </div>
                        <div class="grid-item display-flex">
                            <input v-model="material.materialCode" id="materialCode" required class="input1" type="text" :class="{inputrequird:!requird.code}"/>
                            <div class="icon-required" :class="{isConvert:requird.code}">
                                
                            </div>
                        </div>
                        <div class="grid-item">
                            ĐVT <span class="label-required">(*)</span>
                        </div>
                        <div class="grid-item grid-custom-2">
                            <SelectCustom1
                                :options="Units"
                                :isRequird="!requird.unit"
                                v-model="material.materialUnit"
                                @add="$emit('entityAdd',0)"
                                @change="changeUnit(1)"
                            /><div class="icon-required" :class="{isConvert:requird.unit}" style="margin-top:7px">
                                
                            </div>
                        </div>
                        <div class="grid-item">
                            Kho ngầm định
                        </div>
                        <div class="grid-item">
                            <SelectCustom1
                                :options="Stores"
                                v-model="material.materialStore"
                                @add="$emit('entityAdd',1)"
                            />
                        </div>
                        <div class="grid-item" >
                            Hạn sử dụng
                        </div>
                        <div class="grid-item grid-custom-2">
                            <input v-model="material.materialDate" id="materialDate"  class="input1" type="number" />
                            <SelectCustom1
                                :options="['Ngày','Tháng','Năm']"
                                v-model="material.materialDateUnit"
                                :isHideAdd="true"
                            />
                        </div>
                        <div class="grid-item " >
                            SL tồn tối thiểu
                        </div>
                        <div class="grid-item grid-custom-2">
                            <input v-model="material.materialNum" id="materialStore" type="number" class="input1" required min="0" value="0" step=".01">
                       
                        </div>
                        <div class="grid-item">
                            Mô tả
                        </div>
                        <div class="grid-item1">
                            <textarea  style="resize:none"  v-model="material.materialDescription" required class="input1 text-resize" type="text" ></textarea>
                        </div>
                    </div>
                    <div class="table-detail">
                        <div class="table-tab">
                            <div class="tab-1">
                                Đơn vị chuyển đổi
                            </div>
                        </div>
                        <div class="table-content-detail">
                            <table id="table-all" cellspacing="0" cellpadding="0"  style="">
                                <tr><th>
                                    <table  id="tb-detail-head">
                                        
                                            <tr>
                                                <th style="width:10%;"><div class="cell" >STT</div></th>
                                                <th style="width:20%;"><div class="cell" >Đơn vị chuyển đổi</div></th>
                                                <th style="width:20%;"><div class="cell" >Tỷ lệ chuyển đổi</div></th>
                                                <th style="width:15%;"><div class="cell" >Phép tính</div></th>
                                                <th style="width:35%;"><div class="cell" >Mô tả</div></th>
                                                
                                            </tr>
                                    </table>
                            </th></tr>
                            <tr><td>
                            <div style="width:100%; height:170px; overflow:auto;">
                                <table  id="tb-detail-body">
                                    
                                        <tr 
                                            v-for="(convert , index) in ConvertUnits"
                                            :key="index"    
                                            @click="focusIndex = index"

                                            >   
                                        <td style="width:10%;background-color:#ededed">
                                            <div class="cell" >{{ index+1 }}</div>
                                        </td>               
                                        <td style="width:20%;padding:0px"> 
                                            <div class="cell" >                                                
                                                <SelectCustom1 
                                                    :options="Units" 
                                                    :isHideBorder="true"
                                                    v-model="convert.convertUnitName"
                                                    @add="$emit('unitAdd',0)"
                                                    @change="convert.convertDescription='1 '+convert.convertUnitName+' = '+convert.convertRatio+' '+convert.convertOperation+' '+material.materialUnit;changeUnit(0)"
                                                />
                                        </div>
                                        </td>
                                        <td style="width:20%;padding:0px">
                                            <div class="cell" >
                                                <input v-model="convert.convertRatio" type="text" class="input1 input-none" @change="convert.convertDescription='1 '+convert.convertUnitName+' = '+convert.convertRatio+' '+convert.convertOperation+' '+material.materialUnit">
                                            </div>
                                        </td>
                                        <td style="width:15%;padding:0px">
                                            <div class="cell" >
                                                <SelectCustom1 
                                                    :options="['*','/']" 
                                                    v-model="convert.convertOperation"
                                                    :isHideAdd="true"
                                                    :isHideBorder="true"
                                                    @input="convert.convertDescription='1 '+convert.convertUnitName+' = '+convert.convertRatio+' '+convert.convertOperation+' '+material.materialUnit"
                                                />
                                            </div>
                                        </td>
                                        <td style="width:35%;background-color:#ededed">
                                            <div class="cell" >{{ convert.convertDescription }}</div>
                                        </td>         
                                </tr>                                   
                                </table>
                            </div>
                            </td></tr>
                            </table>
                        </div>
                        <div class="table-handle-btn">
                            <button class="btn" @click="btnNewRow()">
                                <div class="icon-add" ></div>
                                <p class="custom-p">Thêm dòng</p>
                            </button>
                            <button class="btn" style="margin-left:6px" @click="btnDeleteRow()">
                                <div class="icon-delete" ></div>
                                <p class="custom-p">Xóa dòng</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer" id="dialog-footer-add">
                    <div>
                        <button  class="btn m-btn-default" tabindex="2"><div class="icon-help" ></div>
                                <p class="custom-p">Giúp</p></button>
                    </div>
                    <div class="button-area">             
                <button id="btnSave" class="btn custom-btn"  @click="saveData(0)" ><div class="icon-save" ></div>
                                <p class="custom-p">Cất</p></button>
                <button id="btnSaveAdd" class="btn custom-btn" @click="saveData(1)" ><div class="icon-saveAdd" ></div>
                                <p class="custom-p">Cất & thêm</p></button>
                <button id="btnCancel" class="btn custom-btn" @click="btnCloseDialog()" ><div class="icon-cancle" ></div>
                                <p class="custom-p">Hủy bỏ</p></button>
                    </div>
            </div>
            </div>
        </div>
</template>

<script>
import MaterialsAPI from '@/api/components/Materials/MaterialsAPI';
import SelectCustom1 from "@/components/SelectCustom1.vue";
export default {
    name:'MaterialDialog',
    props:{
        isDialogHide:{
            type:Boolean,
            default:true
        },
         material:{
             type:Object,
             default(){
                 return {}
             }
         },
         isAdd:{
            type:Number,
            default:-1
         },
         ConvertUnits:{
             type:Array,
             default(){
                 return []
             }
         },
         Stores:{
             type:Array,
             default(){
                 return []
             }
         },
         Units:{
             type:Array,
             default(){
                 return []
             }
         },
         
    },
    data(){
        return{
            data:1,
            isConvert:false,
            materialNum:"",
            focusIndex:-1,
            requird:{name:true,code:true,unit:true}
        }
    },
    methods:{
        /**
         * Xử lý đóng dialog
         */
        btnCloseDialog(){
            this.requird.name = true; 
            this.requird.code = true;  
            this.requird.unit = true;   
            this.$emit('btnCloseDialog');
        },
        /**
         * sự kiên thay đổi đơn vị tính
         */
        changeUnitMaterial(){
            this.$emit('changeUnitMaterial')
        },
        /**Sự kiện thay dôi dvt và xem nó có trùng ko NVL
         * vhthang 25/03/2021
         */
        changeUnit(num){
            if(num == 1){
                this.changeUnitMaterial();   
            }
            this.$emit('changeUnit',this.focusIndex);
            
            
        },
        /**Sự kiện nhấn thêm dòng
         * vhthang 25/03/2021
         */
        btnNewRow(){
            this.$emit('btnNewRow');  
        },
        /**Sự kiện nhấn xóa dòng
         * vhthang 25/03/2021
         */
        btnDeleteRow(){
            this.$emit('btnDeleteRow',this.focusIndex);
            this.focusIndex=-1
        },
        /**Sự kiện nhấn lưu data và validate dữ liệu
         * vhthang 25/03/2021
         */
        saveData(type){
            
            let hople = true;
            if(this.material.materialName == null|| this.material.materialName.trim() == ""){ 
                this.requird.name = false;          
                hople = false;
            }
            if (this.material.materialCode == null|| this.material.materialCode.trim() == ""){
                this.requird.code = false;
                hople = false;
            }
            if (this.material.materialUnit == null|| this.material.materialUnit.trim() == ""){
                this.requird.unit = false;
                hople = false;
            }

            if(hople){this.$emit('saveData',type);
            this.requird.name = true; 
            this.requird.code = true;  
            this.requird.unit = true; 
            }
            
        },
        /**Sự kiện focus vào tên nvl
         * vhthang 25/03/2021
         */
        focusCode(){
            this.$refs.materialName.focus();
        },
        
        /**Hàm tự động thêm mã code cao nhất
         * vhthang 25/03/2000 
         */
        async changee(e){
            const maCode = document.getElementById('materialCode');
            const valueEvent = this.getAbbreviation(e.target.value);
            const res = await MaterialsAPI.getHighestCode(valueEvent);
            maCode.value = valueEvent + res.data.data;
            this.changeMaterialCode(valueEvent + res.data.data) ;
        },

        /**Sự kiện lấy tên viết tắt NVL
         * vhthang 25/03/2021
         */
        getAbbreviation(text) {
            if (typeof text != 'string' || !text) {
                return '';
            }
            const acronym = text
                .match(/[\p{Alpha}]+/gu)
                .reduce((previous, next) => previous + ((+next === 0 || parseInt(next)) ? parseInt(next): next[0] || ''), '')
                .toUpperCase()
            return acronym;
        },
        /**Sự kiện nhấn thay đổi materialCode 
         * vhthang 25/03/2021
         */
        changeMaterialCode(code){
            this.$emit('changeMaterialCode',code);
        }

    },
    
   
    components:{
        SelectCustom1,
    },  
    
    mounted(){
        /**Xử lý focus mặc định vào tên nguyên vật liệu
         * vhthang 25/03/2021
         */
        this.$watch("isDialogHide",
            function(){
                this.focusCode();
            }
        
        )
        

    },
  
}


</script>

<style>
.isConvert{
    display:none;
}
.isDialogHide{
    display:none;
}

/* tạo nền mờ dialog */
.dialog-modal {
        
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,0.4);
        z-index: 100;
        width: 100%;
        height: 100%;
}
/* Khung dialog */
.dialog-content {
        position: absolute;
        background-color: #0072bc;
        z-index: 110;
        border-radius: 4px;
        width: 750px;
        height:auto;
        top:50px;
        left:460px;
        border: unset;
        padding: 5px;

        
}
.dialog-header {
    display: flex;
    padding: 6px 6px 6px 10px;
    background-color: #0072bc;
    border-radius: 4px 4px 0px 0px;
    border:none;
    color: #ffffff;
}
/* Tạo nút close */
.dialog-header .dialog-header-close {
   position: absolute;

   right: 10px;
   top: 9px;
}
.dialog-header .dialog-header-close button {
   width: 17px;
   height: 17px;
   border-radius: 50%;
   border: none;
   outline: none;
   cursor: pointer;
   background-color: #ffffff;
    color: #0072bc !important;
    padding: 0px 1px 1px 1px;
    font-size: 15px;
  
}

/* Css title của dialog */
.dialog-header .dialog-header-title {
    font-size: 13px;
}

.dialog-content .dialog-body {
    padding: 10px;
    background-color: #ffffff;
}
/* Tảo footer của dialog */
.dialog-footer {
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: flex-end;
   padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
}
#dialog-footer-add{
    justify-content: space-between;
}



.button-area{
    display: flex;
    justify-items: center;
    align-items: center;
}
/* Tạo kiến trúc dialog */
.grid-dialog-container{
    display: grid;
    grid-template-columns: 100px auto 100px auto;
    grid-row-gap:10px ;
    grid-column-gap:13px ;
    text-align: left;
    align-items: center;
}
.grid-custom-2{
    display: grid;
    grid-template-columns: 110px 120px;
    grid-column-gap:10px ;
}

.grid-item1{
    grid-column: 2 / span 3;
}
.text-resize{ 
    resize: none;
    height: 70px !important;
    font-family: Verdana, Geneva, Tahoma, sans-serif !important;
}
/* Css bảng con trong dialog */
.table-detail{
    width: 100%;
    margin-top: 8px;
}
.table-tab{
    width: calc(100% - 20px);
    background-color: #f5f5f5;
    height: 30px;
    padding: 0px 10px;
}
.tab-1{
    border-top:2px solid #0072bc;
    border-right:1px solid #cccccc ;
    border-left:1px solid #cccccc ;
    color: #0072bc;
    align-items: center;
    display: flex;
    width:150px;
    height: calc(100% - 2px);
    justify-content: center;
    background-color: #ffffff;
    cursor: pointer;
}
.table-content-detail{
    width: 100%;
    height: 200px; 
    margin-top: 5px;
    
}

#tb-detail-body,#tb-detail-head{
    width: 100%;
    border-collapse:collapse;
}

.table-content-detail #tb-detail-head th {
    z-index: 3;
    position: sticky;
    background-color: #ededed;
    top: 0px;
    left: 0px;
    border: 1px solid #c1c1c1;
    height: 28px;
    cursor: pointer;
    font-weight: normal;

}
.table-handle-btn{
    display: flex;
    margin-top: 7px;
}
.table-content-detail #tb-detail-body  td {
    border: 1px solid #c1c1c1;
    padding: 8px 10px 7px 10px;
    text-align: left;
    white-space: nowrap;
    box-sizing: border-box;
    text-overflow: ellipsis;
    word-break: break-all;
}

#table-all{
    width:100%;height:100%;border-collapse:collapse;
    border-bottom:1px solid #c1c1c1;
    border-left:1px solid #c1c1c1;
    border-right:1px solid #c1c1c1;
    border-collapse: collapse;
}
.custom-btn{
    margin-left: 7px;
}
.display-flex{
    display: flex;
    
    align-items: center;
}


</style>