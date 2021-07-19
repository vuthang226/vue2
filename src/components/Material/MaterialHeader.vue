<template>
  <div class="header-page">
      <div class="header-left">
        <div class="header-logo">
            <div class="header-menu"></div>
            <div class="header-logo-page"></div>
        </div>
        <div class="header-store">
          <select name="" id="select-store" class="select-default">
              <option value="default" selected="selected">Chuỗi nhà hàng</option>
              <option value="">Nhà hàng lẩu</option>
          </select>
        </div>
      </div>
      <div class="header-right">
        <div class="header-version">
          <p>R58.0</p>
        </div>
        <div class="header-language">
          <div class="header-language">
            <select name="" id="select-language" class="select-default">
              <option value="default" selected="selected">Tiếng Việt(Tiếng Việt)</option>
              <option value="">Tiếng Anh</option>
            </select>
            <!-- <ShopSelectCustom
              :options="['Cửa hàng thực phẩm', 'Cửa hàng ăn nhanh']"
              :default="'Cửa hàng thực phẩm'"
            /> -->
          </div>
        </div>
        <div class="header-notify">
          <div class="icon-notify">
            
          </div>
        </div>
        <div class="header-advisory">
          <div class="icon-advisory">
            
          </div>
        </div>
        <div class="header-custom">
          <div id="icon-avatar">

          </div>
          <div id="name-user">
            <p>Vũ Hữu Thắng</p>
            
          </div>
          <div class="span-down">
            <div class="btn-after"></div>
          </div>

        </div>

      </div>
      
  </div>
</template>

<script>
// import ShopSelectCustom from './ShopSelectCustom'
export default {
    name:'MaterialHeader',
    components:{
    //   ShopSelectCustom,
    }
}
</script>

<style>
.header-page{
  display: flex;
  height: 55px;
  width: 100%;
  background-color: #0072BC;
}
.header-left{
  display: flex;
  align-items: center;
	justify-content: center;
}
.header-logo {
    align-items: center;
    display: flex;
    height: 55px;
    width: 230px;
    display: flex;
}
.header-logo .header-menu{
    margin-left: 15px;
    margin-top: 12px;
    width: 38px;
    height: 38px;
    background-image: url('../../assets/icon/icon-left-header.png');
    background-size: contain;
    background-repeat:no-repeat;
}

.header-logo .header-logo-page {
    margin-left: 10px;
    width: 100%;
    height: 43px;
    background-image: url('../../assets/icon/logoCukCuk207x45.png');
    background-size: contain;
    background-repeat:no-repeat;

}
.header-store{
  width: 210px;
  height: 55px;
  font-family: 'GoogleSans-Medium';
  font-size: 16px;
}
.header-right{
  display: flex;
  position: absolute;
  right:0px;
}
.header-notify,.header-advisory,.header-language,.header-store,.header-version{
  height: 55px;
  display: flex;
  align-items: center;
	justify-content: center;
  color: #ffffff;
}
.header-advisory,.header-notify,.header-version{
  width: 60px;
  
}
.header-version{
  margin-right: 15px;
}
.header-language{
  width: 190px;
  font-size: 13px;
}
.header-advisory{
  color: #ffffff;
}
.header-custom{
  width: 190px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
}
.select-default{
  background-color: #005082;
  height: 32px;
  width: 100%;
  border: none;
  color: #ffffff;
  
}
#select-store{
  margin-left: 10px;

}

.dropdown-store{
    width: 200px;
}
.icon-advisory{
  font-size: 18px;
}
.icon-notify,.icon-help{
  font-size: 16px;
}
#icon-avatar{
  width: 30px;
  height: 30px;       
  background-image: url('../../assets/icon/avatar-default.png');
  background-size: contain;
  margin-left: 5px;
}
.span-down{
  margin-right: 7px;
  margin-top: 2px;
  font-size: 12px;
}
.btn-after{
  
  border: 5px solid transparent;
  border-color: white transparent transparent transparent;
}

</style>