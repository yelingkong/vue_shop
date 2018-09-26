new Vue({
    el:'.container',
    data:{
        currentIndex:0,
        addressList:[],
        limitNum:3,
        shippingMethod:1,
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function(){
            var that=this;
            axios.get("data/address.json").then(function(res){
                var _res= res.data;
                if(_res.status=="0"){
                    that.addressList=_res.result;
                }
            });
        },
        loadMore:function(){
            this.limitNum=this.addressList.length;
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            })
        }
    }
});