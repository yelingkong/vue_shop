var vm = new Vue({
    el: "#app",
    data: {
    	productList:[],
        totalMoney:0,
    },
    filters: {

    },
    mounted: function() {
        this.cartView();
    },
    methods: {
        cartView: function() {
        	var that=this;
            this.$http.get("data/cartData.json").then(function(res) {
            	that.productList=res.data.result.list;
            	that.totalMoney=res.data.result.totalMoney;
            });
        }
    }
});