<template>
  <div class="dialog-popup" :class="{isDialogPopupHide:isDialogPopupHide}">
      <div class="dialog-modal"></div>
        <div class="dialog-content">
            <div class="dialog-header">
                    <div class="dialog-header-title">CUKCUK - Quản lý nhà hàng</div>
                    <div class="dialog-header-close">
                        <button @click="$emit('btnCloseDialogPopup',isDeleteCf)">x</button>
                    </div>
                </div>
            <div class="dialog-body">
                <div class="body-content">
                    <div class="icon-question" :class="{isDeleteCf:!isDeleteCf}">  
                    </div>
                    <div class="icon-warning" :class="{isDeleteCf:isDeleteCf}">  
                    </div>
                    <div id="notify-text" :class="{isDeleteCf:!isDeleteCf}">{{ msgPopUp }}</div>
                    <div id="notify-text" :class="{isDeleteCf:isDeleteCf}">{{ msgPopUp }}</div>
                </div>
                

            </div>
            <div class="dialog-footer">
                <div class="button-area">
                        <button class="btn custom-btn" :class="{isDeleteCf:isDeleteCf}" @click="$emit('btnCloseDialogPopup',isDeleteCf)">Đóng</button>
                        <button class="btn custom-btn" @click="$emit('btnDeleteCf')" :class="{isDeleteCf:!isDeleteCf}">Có</button>
                        <button class="btn custom-btn" @click="$emit('btnCloseDialogPopup',isDeleteCf)" :class="{isDeleteCf:!isDeleteCf}">Không</button>
                </div>
                <div></div> 
            </div>
        </div>
    
  </div>
</template>

<script >
export default {
    name:'MaterialDialogPopUp',
    props:{
        isDialogPopupHide:{
            type:Boolean,
            default:true,
        },
        isDeleteCf:{
            type:Boolean,
            default:true,
        },
        msgPopUp:{
            type:String,
            default:"Không có nội dung",
        }

    },
    methods:{
        /**Sự kiện đống popup
         * vhthang 25/03/2021
         */
        btnCloseDialogPopup(){
            this.$emit('btnCloseDialogPopup');
        },
        /**Sự kiện confirm xóa nvl
         * vhthang 25/03/2021
         */
        btnDeleteCf(){
            this.$emit('btnDeleteCf');
        },
    }
}
</script>

<style scoped>
.isDeleteCf{
    display: none;
}
.isDialogPopupHide{
    display: none;
}
.dialog-content {
        position: absolute;
        background-color: #0072bc;
        z-index: 130;
        border-radius: 4px;
        width: 400px;
        height:auto;
        top:300px;
        left:500px;
        border: unset;
        padding: 5px;       
}
.body-content{
    display: grid;
    grid-template-columns: 40px auto;
    grid-column-gap:10px ;
    text-align: left;
    align-items: center;
}
</style>