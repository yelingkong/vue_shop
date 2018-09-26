var vm = new Vue({
    el: "#app",
    data: {
    	productList:[],
        totalMoney:0,
        checkAllFlag:false,
        delFlag:false,
        curProduct:""
    },
    filters: {
        formatMoney:function(value){
            return '￥'+value.toFixed(2);
        },
        Money:function(value,type){
            return '￥'+value.toFixed(2)+type;
        }
    },
    mounted: function() {
        this.cartView();
    },
    methods: {
        cartView: function() {
        	var that=this;
            this.$http.get("data/cartData.json").then(function(res) {
            	that.productList=res.data.result.list;
            	// that.totalMoney=res.data.result.totalMoney;
            });
        },
        changeMoney:function(product,way){
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
            this.clacTotalPrice();
        },
        selectedProduct:function(item){
            if(typeof item.checked=='undefined'){
                // Vue.set(item,"checked",true);
                this.$set(item,"checked",true);
            }else{
                item.checked=!item.checked;
            }
            this.clacTotalPrice();
        },
        checkAll:function(flag){
            var that=this;
            this.checkAllFlag=flag;
            this.productList.forEach(function(item,index){
                if(typeof item.checked=='undefined'){
                    that.$set(item,"checked",that.checkAllFlag);
                }else{
                    item.checked=that.checkAllFlag;
                }
            })
            this.clacTotalPrice();
        },
        clacTotalPrice:function(){
            var that = this;
            that.totalMoney=0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    that.totalMoney+=item.productPrice*item.productQuantity;
                }
            });
        },
        delConfirm:function(item){
            this.delFlag=true;
            this.curProduct=item;
        },
        delProduct:function(){
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        }
    }
});
