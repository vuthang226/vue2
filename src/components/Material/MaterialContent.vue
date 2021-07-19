<template>
  <div class="material-content">
      <div class="title-content">
          <div class="title-content-left">
            <p class="title-text">Nguyên vật liệu</p>
          </div>
          <div class="title-content-right">
              <button class="btn-default"><span class="icon-feed-back"></span>Phản hồi</button>
          </div>
      </div>
       <div class="table-all">
            <div class="table-tool">
                <div class="btn-tool" @click="addMaterial()">
                    <div class="icon-add"></div>
                    <p class="custom-p">Thêm</p>
                </div>
                <div class="btn-tool" @click="cloneMaterial()">
                    <div class="icon-clone" ></div>
                    <p class="custom-p">Nhân bản</p>
                </div>
                <div class="btn-tool" @click="updateMaterial()">
                    <div class="icon-repair" ></div>
                    <p class="custom-p">Sửa</p>
                </div>
                <div class="btn-tool" @click="deleteMaterial()">
                    <div class="icon-delete" ></div>
                    <p class="custom-p">Xóa</p>
                </div>
                <div class="btn-tool" @click="refreshData()">
                    <div class="icon-refresh" ></div>
                    <p class="custom-p">Nạp</p>
                </div>   
            </div>
            <div class="table-content">
                <table id="table-Material" cellspacing="0" cellpadding="0" border="0" >
                        <thead>
                            <tr class="title-tb1">

                                <th  style="width:15%;">
                                    <div class="cell" @click="sortColumn(1)"><p>Mã nguyên vật liệu</p></div>
                                    <div class="table-search">
                                        
                                        <div class="btn-table-search">*</div>
                                        <input type="text" class="input-table-search" @change="filterSearch($event.target.value,1)"/>
                                    </div>
                                </th>
                                <th  style="width:22%">
                                    
                                    <div class="cell" @click="sortColumn(2)"><p>Tên nguyên vật liệu</p></div>
                                    <div class="table-search">
                                        <div class="btn-table-search">*</div>
                                        <input type="text" class="input-table-search" @change="filterSearch($event.target.value,2)"/>
                                    </div>
                                    </th>
                                <th style="width:20%">
                                    <div class="cell" @click="sortColumn(3)"><p>ĐVT tính</p></div>
                                    <div class="table-search">
                                        <div class="btn-table-search">*</div>
                                        <input type="text" class="input-table-search" @change="filterSearch($event.target.value,3)"/>
                                    </div>
                                    </th>
                                <th style="width:40%">
                                    <div class="cell" @click="sortColumn(4)"><p>Mô tả</p></div>
                                    <div class="table-search">
                                        <div class="btn-table-search">*</div>
                                        <input type="text" class="input-table-search" @change="filterSearch($event.target.value,4)"/>
                                    </div>
                                    </th>
                                
                                
                            </tr>
                        </thead>
                        <tbody class="tb1">
                            <tr 
                                v-for="material in Materials"
                                v-bind:key="material.materialId"
                                :class="{focusline:material.materialId == focusLine}"
                                @click="
                                focusMaterial(material);
                                focusLine = material.materialId;
                                "     
                                @dblclick="showMaterial(material.materialId)">                  
                            <td>
                                <div class="cell" >{{ material.materialCode }}</div>
                                </td>
                                <td>
                                <div class="cell" >{{ formatEmpty(material.materialName) }}</div>
                                </td>
                                <td>
                                <div class="cell" >{{ formatEmpty(material.materialUnit) }}</div>
                                </td>
                                <td>
                                <div class="cell" >{{ formatEmpty(material.materialDescription) }}</div>
                                </td>
                                
                            </tr>
                
                        </tbody>
                </table>
            </div>

        </div> 


      <div class="paging-bar">
          <div class="paging-left">
                <button class="btn-square" @click="changePage(1)"><span class="icon-page-first"></span></button>
                <button class="btn-square" @click="nextPage(-1)"><span class="icon-page-prev"></span></button>
                
                <p class="paging-item">Trang</p>
                <input class="input-page" :value="pageNum" @input="changePage($event.target.value)" type="number"/>
                <p class="paging-item">trên 1</p>
                
                <button class="btn-square" @click="nextPage(1)"><span class="icon-page-next"></span></button>
                <button class="btn-square" @click="changePage(numPageMax)"><span class="icon-page-last"></span></button>
                <button class="btn-square"><span class="icon-page-load"></span></button>
                

                

          </div>
          <div class="paging-right">
              Hiển thị {{(this.pageNum -1)*30+1}}-{{this.ToEntities}} trên {{this.numOfMaterial}} kết quả 
              <div></div>
          </div>
      </div>

  </div>
</template>

<script>


export default {
    name:'MaterialContent',
    props:{
        pageNum:{
            type:Number,
            default:1,
        },
        Materials:Array, 
        numPageMax:{
            type:Number,
            default:10,
        },
        numOfMaterial:{
            type:Number,
            default:400,
        },
        
        
    },
    data(){
        return{
            data:{},
            focusLine:"",
        }
    },  
    methods:{
        /**Sự kiện nhấn thêm mới NVL
         * vhthang 25/03/2021
         */
        addMaterial(){
            this.$emit('addMaterial');
        },
        /**Sự kiện nhấn nhân bản NVL
         * vhthang 25/03/2021
         */
        cloneMaterial(){
            this.$emit('cloneMaterial',this.data.materialId);
        },
        /**Sự kiện nhấn cập nhật NVL
         * vhthang 25/03/2021
         */
        updateMaterial(){
            this.showMaterial(this.data.materialId);
        },
        /**Sự kiện nhấn xóa NVL
         * vhthang 25/03/2021
         */
        deleteMaterial(){
            this.$emit('deleteMaterial',this.data);
        },
        /**Sự kiện nhấn load lại trang NVL
         * vhthang 25/03/2021
         */
        refreshData(){
            this.$emit('refreshData');
        },
        /**Sự kiện nhấn vào một NVL và focus vào chúng
         * vhthang 25/03/2021
         */
        focusMaterial(data){
            this.data = data;
        },
        /**Sự kiện nhấn trang tiếp theo NVL
         * vhthang 25/03/2021
         */
        nextPage(num){
            this.changePage(this.pageNum+num);
        },
        /**Sự kiện nhấn thêm mới NVL
         * vhthang 25/03/2021
         */
        changePage(num){
            this.$emit('changePage',num);
        },
        /**Sự kiện nhấn hiên NVL
         * vhthang 25/03/2021
         */
        showMaterial(data){           
            this.$emit('showMaterial',data);
        },
        /**Sự kiện nhấn sắp xếp NVL
         * vhthang 25/03/2021
         */
        sortColumn(sort){
            this.$emit('sortColumn',sort);
        },
        /**Sự kiện format thông tin null thành trống NVL
         * vhthang 25/03/2021
         */
        formatEmpty(data){
        
            if(data == null){
                return "(Trống)";
            }else if(data.trim() == "") return "(Trống)";
            else return data.trim();
        },
        /**Sự kiện Tìm kiếm NVL
         * vhthang 25/03/2021
         */
        filterSearch(value,num){
            this.$emit('filterSearch',value,num);
        },

        
        
    },

    components:{       
        
    },
    computed:{
        ToEntities:function(){
            if(((this.pageNum -1)*30+30) > this.numOfMaterial){
                return this.numOfMaterial;
            }else return ((this.pageNum -1)*30+30);
            
        }
    },
    


}
</script>

<style>
.focusline{
    background-color: #d7e9f4 !important;
    cursor: pointer;
}
.material-content{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}
.material-content .paging-bar{
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px 0px 0px;
    z-index: 3;
    border: 1px solid #ccc;
    
}
.material-content .paging-bar .paging-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title-content{
    width: 100%;
    height: 40px;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.title-content-left{

}
.title-text{
    font-size: 22px;
}

.table-all{
    margin-top: 3px;
    height: calc(100% - 82px);
}
.table-content{
    width:100%;
    height: calc(100% - 32px);
    overflow: auto;
}
#table-Material{
    border-collapse:collapse;
    width: 100%;
    
    
    ;
}
/* cố định phần tiêu đề của bảng */
.table-content table th {
    z-index: 3;
    position: sticky;
    background-color: #ededed;
    /* background-color: #ededed; */
    top: 0px;
    left: 0px;
    
    /* border: 1px solid #E9E9E9; */
    border: 1px solid #cccccc;
    height: 49px;
    cursor: pointer;
    font-weight: normal;
    padding: 3px;
}

.table-search{
    display: flex;
}
.btn-table-search{
    width: 24px;
    height: 24px;
    border: 1px solid #d5d5d5;
    background-color: #fcfcfc;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Tạo css cho từng dòng phâng tử: tự động ẩn nếu phần chữ tràn */
.table-content table  td {
    border: 1px solid #cccccc;
    padding: 5px 10px 4px 10px !important;
    text-align: left;
    white-space: nowrap;
    box-sizing: border-box;
    text-overflow: ellipsis;
    word-break: break-all;
}

/* Tạo hover cho từng dòng dữ liệu */
.table-content tbody tr:nth-child(2n) {
    background-color: #fafafa;
}

.table-content tbody tr:hover {
    background-color: rgb(226, 239, 248);
    cursor: pointer;
}


.table-content td div {
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}



.icon-feed-back{
    background: url('../../assets/icon/IconSprite.png') no-repeat 0 -625px;
	width: 16px;
	height: 15px;
    margin-right:10px ;
}

.paging-item{
    width: 55px;
    margin-left: 3px ;
}
.table-all th .cell{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 100%;
}
.table-all th .input-table-search{
    width: calc(100% - 25px);
    border: 1px solid #d5d5d5;
    outline: none;
    box-sizing: border-box;
}
.table-all th .input-table-search:focus{
    border: 1px solid #0072bc;
}

.table-tool{
    display: flex;
    height: 24px;
    background-image: -webkit-linear-gradient(top,#f9f9f9,#e3e4e6);
    width: calc(100% - 6px);
    color: black;
    align-items: center;
    background-color: #ededed!important;
    border-color:  #d9d9d9;
    border-style: solid;
    padding: 2px;
    border-width: 1px;
    border-bottom: none;
    
}
.btn-tool{
    display: flex;
    height: 16px;
    align-items: center;
    cursor: pointer; 
    padding: 2px 4px;
    justify-content: center;
}
.btn-tool:hover{
    background-color: #ffffff;
    border: 1px solid #0072bc;

}
.icon-add{
    background: url('../../assets/icon/IconSprite.png') no-repeat -1px -2648px;
	width: 14px;
	height: 16px;
    margin: 5px;
    
}
.icon-clone{
    background: url('../../assets/icon/IconSprite.png') no-repeat -1px -1888px;
	width: 14px;
	height: 15px;
    margin: 5px;
}
.icon-repair{
    background: url('../../assets/icon/IconSprite.png') no-repeat 0 -1872px;
	width: 15px;
	height: 15px;
    margin: 5px;
}
.icon-delete{
    background: url('../../assets/icon/IconSprite.png') no-repeat -2px -2683px;
	width: 12px;
	height: 11px;
    margin: 5px;
}
.icon-refresh{
    background: url('../../assets/icon/IconSprite.png') no-repeat 0 -2586px;
	width: 16px;
	height: 13px;
    margin: 5px;
}
.custom-p{
    margin-right:3px;
    font-size:12px
}

</style>