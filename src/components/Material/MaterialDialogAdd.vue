<template>
  <div class="dialog-modal" :class="{isDialogAddHide:isDialogAddHide}">    
            <div class="dialog-content" >
                <div class="dialog-header">
                    <div class="dialog-header-title">{{DialogAdd.title}}</div>
                    <div class="dialog-header-close">
                        <button @click="$emit('btnCloseDialogAdd')">x</button>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="grid-dialogadd">
                        <div >{{DialogAdd.name}}<span class="label-required">(*)</span></div>
                        <div class="display-flex"><input v-model="inputData" class="input1" type="text">
                        <div class="icon-required" :class="{isDialogAddHide:!emptyInput}">
                                
                            </div>
                        </div>
                        
                    </div>
                 </div>
                <div class="dialog-footer" id="dialog-footer-add">
                    <div>
                        <button  class="btn m-btn-default" tabindex="2"><div class="icon-help" ></div>
                                <p class="custom-p">Giúp</p></button>
                    </div>
                    <div class="button-area">             
                <button id="btnSave" class="btn custom-btn" @click="saveEntity()"><div class="icon-save" ></div>
                                <p class="custom-p">Cất</p></button>
                <button id="btnCancel" class="btn custom-btn" @click="btnCloseDialogAdd()" ><div class="icon-cancle" ></div>
                                <p class="custom-p">Hủy bỏ</p></button>
                    </div>
            </div>
            </div>
        </div>
</template>

<script>
export default {
    name:"MaterialDialogAdd",
    data(){
        return{
            inputData:"",
            emptyInput:false,
        }
    },
    props:{
        DialogAdd:{
            type:Object,
            default(){
                return {title:'Thêm',name:'Tên'}
            }
        },
        isDialogAddHide:{
            type:Boolean,
            default:true
        },

    },
    methods:{
        /**Sự kiện Lưu dữ liệu nhỏ + validate
         * vhthang 25/03/2021
         */
        saveEntity(){
            if(this.inputData == null ||this.inputData.trim() == ""){
                this.emptyInput=true;
            }else{
            this.$emit("saveEntity",this.inputData)
            this.inputData = "";
            this.emptyInput=false;
            }
        },
        /**Sự kiện đóng
         * vhthang 25/03/2021
         */
        btnCloseDialogAdd(){
            this.$emit('btnCloseDialogAdd');
            this.inputData='';
            this.emptyInput=false;
        }
    }
}
</script>

<style scoped>
.isDialogAddHide{
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
        z-index: 121;
        width: 100%;
        height: 100%;
}
/* Khung dialog */
.dialog-content {
        position: absolute;
        background-color: #0072bc;
        z-index: 130;
        border-radius: 4px;
        width: 350px;
        height:auto;
        top:300px;
        left:500px;
        border: unset;
        padding: 5px;       
}
/* Tạo kiến trúc dialog */
.grid-dialogadd{
    display: grid;
    grid-template-columns: 100px auto;
    grid-column-gap:13px ;
    text-align: left;
    align-items: center;
}
</style>