<template>
  <div class="container-popup" :class="{isMsgHide:isMsgHide}">
      <div class="container-header">
          <b style="font-size:12px">Thông báo</b>
          <div class="cancle-button" >x</div>
      </div>
      
      <div class="message-content" @click="btnCloseMsg()">{{msgUser}}</div>
  </div>
</template>

<script>
export default {
    name:"MaterialMessagePopUp",
    props:{
        isMsgHide:{
            type:Boolean,
            default:true,
        },
        msgUser:{
            type:String,
            default:"Thông báo"
        }
    },
    methods:{
        /**Ẩn thông báo tin nhắn */
        btnCloseMsg(){
            this.$emit('btnCloseMsg');
        }
    }

}
</script>

<style>
.isMsgHide{
    display: none;
}
.container-popup{
    position: absolute;
    bottom: 5px;
    right:5px;
    z-index: 200;
    width: 150px;
    min-height: 40px;
    border: 1px solid #ccc;
    background-color: rgb(226, 239, 248);
    padding: 7px; 
      
}
.container-header{
   display: flex;
   justify-content: space-between;

}
.cancle-button{
    width: 15px;
    height: 15px;
}
.message-content{
    font-size: 12px;
    text-align: left;
    word-wrap: break-word;
}
</style>