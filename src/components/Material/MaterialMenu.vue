<template>
      <div class="menu-left">
            
            <div class="menu">
                <div class="menu_item" 
                    v-for="(item , index) in MenuBarCus"
                    v-bind:key="index"
                    >
                    <div class="menu_item-icon">

                        <div :class=" item.class "></div>
                    </div>
                    <div class="menu_item-text">
                        {{ item.title }}
                    </div>
                </div>
                
            </div>
        </div>
    
</template>

<script>
export default {
    name:'MaterialMenu',
    props:{
        MenuBarCus:{
            type:Array,
            default() {
                return []
            }
        
        },
    }
}
</script>

<style>


.menu{
    width:100%;
    
}
.menu .menu_item {
        display: flex;
        height: 45px;
        align-items: center;
        padding-left:20px;       
        cursor:pointer;
}
.menu .menu_item:hover {
    background-color: #EB7728;
}
.menu .menu_item:focus {
    background-color: #0199FB;
}
.menu .menu_item .menu_item-icon {
        width: 23px;
        height: 23px;
        font-size:18px ;
    }
.menu .menu_item .menu_item-text {
    margin-left:10px;
    
    }
.icon-menu-list{
    width: 23px;
    height: 23px;
    background-image: url('../../assets/icon/vector-smart-object.png');
    background-size: contain;
    background-repeat:no-repeat;
}
</style>