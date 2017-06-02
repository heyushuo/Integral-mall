require.config({
	paths:{
		jquery:"./libs/jquery",
		swiper:"./js/swiper.min",
        diqu:"./js/diqu2",
        commonObj:"./commonobj"
	}
})
require(['jquery','swiper','commonObj','diqu'],function($,swiper,commonObj,diqu){
    $(function(){
    	/*
    	 * 首页轮播
    	 */
        var topSlider=new Swiper('.swiper1', {
            autoplay: 3000,
			loop: true,
			pagination: '.swiper-pagination',
			paginationClickable: true
        });
        /*
    	 * rem布局
    	 */
 		commonObj.rem();
 		/*
 		 * 添加到购物车
 		 */
 		$(".gcb-left").on("click",commonObj.addCart);
 		$(".tip-btn").on("click",commonObj.closeLayer);
 		$(".reducenum").on("click",commonObj.reducenum);
 		$(".inputnum").on("keyup",commonObj.inputnum);
 		$(".addnum").on("click",commonObj.addnum);
 		$("#checkAll").on("click",function(){$('input[name="subBox"]').prop("checked",this.checked);})
 		var $subBox = $("input[name='subBox']");
	    $subBox.on("click",function(){
	        $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
	    }); 
            
        $(".cart-del").on("click",commonObj.cartdel);
        /*
         * 总积分
         */
        commonObj.alljifen();  
 		/*
         * 类目菜单
         */
        $(".search-left").find("li").on("click",commonObj.searchMenu)
        /*
         * 地址管理
         */
        if($("select[name='sheng']").length>0){
            new PCAS("sheng","shi","qu","","","");
        }
        $("#addAddress").on("click",function(){$(".adr-box").css("display","none");$("#address_add").css("display","block");$("#sug-block").css("display","none");});
        $("#submit_address").on("click",commonObj.addAddress);
        console.log($("#address_add").css("display"))
        console.log($("#address_add").css("display")=="block")
        if($("#address_add").css("display")=="block"){
        	console.log(222222222222)
        	$(".back").unbind("click");
        		$(".back").on("click",function(e){
        			console.log(222222222222)
        			 e.preventDefault();
        			$(".adr-box").css("display","block");$("#address_add").css("display","none");        			
    				$("#sug-block").css("display","block");$("#addAddress").val("+ 添加新的地址");
        		});
        }else if ($(".adr-box").css("display")=="block") {
        	console.log(11111111)
        	$(".back").unbind("click");
        	$('.back').on("click",function(){
        		window.location.href="javascript:history.back(-1);";
        	})
        }
        $(".adr-box").on("click",".deleteaddress",commonObj.deleteAddress);
        $(".adr-box").on("click",".editAddress",commonObj.editAddress)
//      commonObj.loadCanvas();
//      commonObj.set_address();
//      $(window).scroll(commonObj.scrollHandler);
//      $("#productul").on("touchmove", commonObj.scrollHandler);
//      $(".add").on("click",commonObj.addnums);
//      $(".reduce").on("click",commonObj.reducenums);
//      $(".addcart").on("click",commonObj.addcatAnimate);
//      if($(".cartnums").val()<1){
//          $(".cartnums").hide();
//      }else{
//         $(".cartnums").show();
//      }
//      $(".delbtn").on("click",function(){
//          $(this).parents("li").remove();
//          if($(".cartlist").children("li").length<1){
//              $(".cartlist").hide();
//              $(".onthebottom").hide();
//              $(".null_shopping").show();
//          }
//      })
//      $(".clearcart").on("click",function(){
//          $(".cartlist").find("li").each(function(){
//              $(this).remove()
//          });
//          $(".cartlist").hide();
//          $(".onthebottom").hide();
//          $(".null_shopping").show();
//      })
//      if($("select[name='sheng']").length>0){
//          new PCAS("sheng","shi","qu","","","");
//      }
//      $('input[name=address_options]').change(function(){
//              if($(this).val()==0)
//              {
//                      $('#address_form').show();
//              }else
//              {
//                      $('#address_form').hide();
//              }
//      });
//      $(".ifvoicenot").on("click",function(){
//          $(this).parent().next().toggle();
//      });
//      
//      $(".address_item").on("click",function(){
//          $(this).children().eq(0).children().eq(0).attr('checked','checked')
//          commonObj.set_address();
//      });
//
//      $("#addresslist").on("click",".delete",function(){
//          $(this).parents("li").remove();
//          
//      })        
//      $("#addresslist").on("click",".edit",commonObj.address_huitian);
//      $(".submit_address").on("click",commonObj.addAddresslist);
//      $(".order_action_cancel").on("click",function(){
//          $(this).parents(".order_form").remove();
//          if($(".order_form").length<1){
//              $(".null_order").show();
//          }
//      })
//
//
//
//
//











   })
})