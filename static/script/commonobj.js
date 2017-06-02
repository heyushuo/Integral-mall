define(["jquery"],function(require){
	return commonObj = {
        ajaxstatus:true,
        pagesize : 5,
        winH: $(window).height(),
        /*
         * rem布局
         */
        rem:function(){
            document.documentElement.style.fontSize = innerWidth/3.2 +"px";
            window.addEventListener("resize",function(){
                document.documentElement.style.fontSize = innerWidth/3.2  + "px";
            },false)
        },
        /*
         * 加入购物车
         */
        addCart:function(){
        	$(".zhezhao").css({ display : "block", height : $(document).height()});
			$(".zhezhao").show();
			$(".add-cart-tip-layer").show();
        },
        closeLayer:function(){
        	$(".add-cart-tip-layer").hide();
			$(".zhezhao").hide();
        },
        /*
         * 购物车数量加
         */
        addnum:function(){
        	var val=parseInt($(this).prev().val());
			//isNaN() 函数用于检查其参数是否是非数字值。如果不是数字返回true
			if (!isNaN(val)) {
				if(val<1){
					val=1;
				}else{
					val++;
				}
			}else{
				val=1;
			}
			$(this).prev().val(val);
       },
       /*
        * 防止在input框里输入非法数量
        */
       inputnum:function(){
       		var val=$(this).val();
			var reg=/^[0-9]{0,20}$/
			if(!reg.test(val)){
				val=1
			}
			$(this).val(val)
       },
       /*
        * 需要总积分
        */
       alljifen:function(){
        	var jifen=0;
            var reg=$(".cart-integral").each(function(){	
            	jifen=jifen+parseInt($(this).text());
            });          
   		 	$(".total-integral-val").text(jifen);
         
       },
       /*
        * 删除相应的商品
        */
       cartdel:function(){
            	var judge=$("input[name='checkAll']").prop("checked");
            	if(judge){
            		$(".cart-block").each(function(){
            			$(this).remove();           			
            		})
            		$("input[name='checkAll']").attr("checked",false);
            	}else{
            		if($("input[name='subBox']:checked").length>0){
            		$("input[name='subBox']:checked").parents(".cart-block").remove();
            		
            	}
            	
            	}
            	
            },
        /*
         * 购物车数量减
         */
        reducenum:function(){
        	var val=parseInt($(this).next().val());
			//isNaN() 函数用于检查其参数是否是非数字值。如果不是数字返回true
			if (!isNaN(val)) {
				if(val<2){
					val=1;
				}else{
					val--;
				}
			}else{
				val=1;
			}
			$(this).next().val(val)
       },
       
        /*
         * 类目菜单
         */
        searchMenu:function(e){
	    	var menu_resource = [
			{"data":"<a href='search-kind.html'>充值卡</a><a href='search-kind.html'>话费</a>"}, 
			{"data":"<a href='search-kind.html'>床单被罩</a><a href='search-kind.html'>毛巾</a>"},
			{"data":"<a href='search-kind.html'>洗衣机</a><a href='search-kind.html'>冰箱</a>"},
			{"data":"<a href='search-kind.html'>充电器</a><a href='search-kind.html'>耳机</a>"},
			{"data":"<a href='search-kind.html'>数码相机</a><a href='search-kind.html'>拍立得</a>"},
			{"data":"<a href='search-kind.html'>电脑桌</a><a href='search-kind.html'>散热器</a>"},
			{"data":"<a href='search-kind.html'>行车记录仪</a><a href='search-kind.html'>加油卡</a>"},
			{"data":"<a href='search-kind.html'>旅行箱</a><a href='search-kind.html'>时尚饰品</a>"},
			{"data":"<a href='search-kind.html'>爽肤水</a><a href='search-kind.html'>眼线</a>"},
			{"data":"<a href='search-kind.html'>孕妇护肤</a><a href='search-kind.html'>宝宝护肤</a>"}
			];
			var idx = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".search-right").find(".sr-cnt").html(menu_resource[idx].data);
			e.preventDefault();
        },
        /*
         * 加载图片
         */
		loadCanvas:function(){
		 var imglength = $("#productul").find("canvas").length;
            if (imglength > 0) {
                $("#productul").find("canvas").each(function () {
                    var imgSrc = $(this).data("src");
                    //console.log(imgSrc)
                    //创建图片对象是为了把imgSrc地址放在图片上.然后再把图片画到画布上.
                    var imageObj = new Image();
                   // console.log(imageObj)
                    imageObj.canvs = $(this)[0];
                    var cvs = imageObj.canvs.getContext('2d');
                    if (cvs) {
                        imageObj.onload = function () {
                            imageObj.canvs.width = this.width;
                            imageObj.canvs.height = this.height;
                            cvs.drawImage(this, 0, 0);
                            $(imageObj.canvs).css("background-image", "none");
                        }
                        imageObj.src = imgSrc;//因为添加了这句话所以16行能打印出来正确的img对象
                    }
                })
            }
		},
		/*
		 * 获取商品列表
		 */
        getData: function (pagenumber) {
            $.ajax({
                type: "get",
                url: "/static/script/test.json",
                data: {
                    page:commonObj.pagenumber,
                    row:  commonObj.pagesize, 
                },
                dataType: "json",
                success: function (result) {
                	console.log("获取数据成功")
                    $(".loaddiv").hide();
                    if (result.length > 0) {
                         commonObj.ajaxstatus=true;
                        commonObj.insertDiv(result);
                        commonObj.loadCanvas();
                    }else {
                        $("#pagenumlength").val("0");
                        // alert('暂无数据');
                    }
                },
                beforeSend: function () {
                    //console.dir(323);
                    $(".loaddiv").show();
                },
                error: function () {
                    $(".loaddiv").hide();
                }
            });
 
        },
        insertDiv: function (json) {
            var $mainDiv = $("#scrollAdd");
            var html = '';
           var  showlength=5;
            if(json.length<5){
                showlength=json.length;
            }

            for (var i = 0; i < showlength; i++) {              
                html += '<li><a href="#">'+
                    '<div class="triangle-topleft"></div>'+
                    '<span class="shuxing" data_url="productinfo.html">专属</span>'+
                    '<div class="leftimages fl"><canvas data-src="images/product/product1.png" ></canvas></div>'+
                     '<div class="productcontent fr">'+
                         '<p class="ptitle pl10">广联达变更算量</p>'+
                          '<p class="pdes pl10">简介这里简介这里简介这里简介这里简介这里简介这里简介这里简介介这里简介</p>'+
                          '<p class="pprice pl10">价格：<span class="green">￥5000</span></p>'+
                    '</div></a></li>';
            }
            $mainDiv.append(html);
        },
        scrollHandler: function () {
            var pageH = $(document).height()
            var scrollT = $(window).scrollTop(); //滚动条top   
             var winheight=$(window).height();							//这个为了防止ajax多次调用
           if (parseInt(scrollT)+parseInt(winheight)+50>=parseInt(pageH) && commonObj.ajaxstatus) {
                if($("#pagenumlength").val()=="1"){
               commonObj.ajaxstatus=false;
               commonObj.currentpage++;
                commonObj.getData(commonObj.currentpage)
            }else{
                return
            }
            }
        },
        /*
         * 加商品数量
         */
        addnums:function(){
            var number=parseInt($(this).prev().val());
            if(!isNaN(number)){
                if(number<1){
                    number=1;
                }else{
                  number+=1; 
                }
            }else{
                number=1

            }
           $(this).prev().val(number);
        },
        /*
         * 减商品数量
         */
        reducenums:function(){
            var number=parseInt($(this).next().val());
            if(!isNaN(number)){
                if(number<2){
                    number=1;
                }else{
                    number-=1;
                }
            }else{
                number=1
            }
            $(this).next().val(number);
        },
        /*
         * 添加到购物车
         */
        addcatAnimate:function(e){
            e.stopPropagation();
            var number=Number($("#cartnumbers").val());
            var productimg=$("#productimg"),
               imgsrc=$("#productimg").children("img").attr("src"),
                x = productimg.offset().left + 30,
                y = productimg.offset().top -10,
                X = $("#n_1").offset().left,
                Y = $("#n_1").offset().top;
                if ($('#flydiv').length <= 0) {
                    $('body').append('<div id="flydiv"><img src="'+imgsrc+'" width="50" height="50" /></div');
                };
                var $obj=$('#flydiv');
                if(!$obj.is(':animated')){
                    $obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {
                        $obj.stop(false, false).animate({'top': Y-20,'opacity':0},500,function(){
                            $obj.fadeOut(300,function(){
                                $obj.remove();  
                                var num=Number($(".cartnums").text());
                                $(".cartnums").text(num+number);
                                $(".cartnums").show();
                            });
                        });
                    }); 
                };

        },
        set_address:function(){
                    var addr_id = $("input[name='address_options']:checked").val();
                    if(addr_id == 0)
                    {

                            $('#address_form').show();
                    }
                    else
                    {
                            $('#address_form').hide();

                    }
        },
        address_huitian:function(){
            var name=$(this).parents("li").find(".name").text();
            var phone=$(this).parents("li").find(".phone").text();
            var allAddress=$(this).parents("li").find(".all-address").html();
            var addressArray=allAddress.split("&nbsp;");
            var s1=addressArray[0];
            var s2=addressArray[1];
            var s3=addressArray[2];
            var addressinfo=addressArray[3];
            $("#consignee").val(name);
            $("#s1").val(s1);
            $("#s1").trigger("change");
            $("#s2").val(s2);
           $("#s2").trigger("change");
            $("#s3").val(s3);
            $("#address").val(addressinfo);
            $("#phone_mob").val(phone);

        },
        /*
         * 收货地址管理
         */
        addAddress:function(){
        	var name=$("#adduserName").val();
            var phone=$("#adduserPhone").val();
            var s1=$("#s1").val();
            var s2=$("#s2").val();
            var s3=$("#s3").val();
            var adddetailAddress=$("#adddetailAddress").val();
          	var addAddressHtml='<div class="adr-block">'+
					'<div class="adr-top"><table class="adr-tbl" cellpadding="0" cellspacing="0" border="0">'+
						'<tr><td class="userName"  align="left">'+name+'</td><td class="userPhone" align="left">'+phone+'</td><td rowspan="2" style="width: 8%;">></td></tr>'+
						'<tr><td colspan="2" align="left"><span class="adr-sp">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+ '&nbsp;'+adddetailAddress+'</span></td></tr>'+
						'</table></div>'+
					'<div class="adr-btm"><div class="adr-btm-left"><input id="defaultAddr" class="adr-chk" type="checkbox" /><label for="defaultAddr">默认地址</label></div><div class="adr-btm-right"><a href="javascript:;"><img src="images/icon-14.png" /><label class="editAddress">编辑</label></a><a href="javascript:;"><img src="images/icon-15.png" /><label class="deleteaddress">删除</label></a></div><div class="clean"></div></div></div>';
        	if($.trim(name)!="" && $.trim(adddetailAddress)!=""&& $.trim(s1)!=""&& $.trim(phone)!=""){
        		if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
        		$("#prompt").text("请输入正确手机号");
        	}else{
        		$(".adr-box").append(addAddressHtml);
        		$(".adr-box").css("display","block");$("#address_add").css("display","none");
        		$("#sug-block").css("display","block"); 
        		$("#addAddress").val("+ 添加新的地址");
        		commonObj.clearAddress(); 
        		console.log($("#addAddress").val("+ 添加新的地址"))
        	}
        	}else{
        		$("#prompt").text("所填资料不能为空");
        	}
        },
        deleteAddress:function(){
        	console.log("是否删除")
        	$(this).parents(".adr-block").remove();
        },
        editAddress:function(){
        	var name=$(this).parents(".adr-block").find(".userName").text();
            var phone=$(this).parents(".adr-block").find(".userPhone").text();
            var allAddress=$(this).parents(".adr-block").find(".adr-sp").html();
            var addressArray=allAddress.split("&nbsp;");
            var s1=addressArray[0];
            var s2=addressArray[1];
            var s3=addressArray[2];
            var detailAdress=addressArray[3];
            $(this).parents(".adr-block").remove();
            $("#adduserName").val(name);
            $("#s1").val(s1);
            $("#s1").trigger("change");
            $("#s2").val(s2);
            $("#s2").trigger("change");
            $("#s3").val(s3);
            $("#s3").trigger("change");
            $("#adddetailAddress").val(detailAdress);
            $("#adduserPhone").val(phone);
            $("#sug-block").css("display","none");
            $(".adr-box").css("display","none");$("#address_add").css("display","block"); 
        },
        clearAddress:function(){
            $("#adduserName").val("");
            $("#adduserPhone").val("");
            $("#s1").val("");
            $("#s2").val("");
            $("#s3").val("");
            $("#adddetailAddress").val("");
        },
        /*
         * 收获地址
         */
        addAddresslist:function(){
            var name=$("#userName").val();
            var phone=$("#userPhone").val();
            var s1=$("#s1").val();
            var s2=$("#s2").val();
            var s3=$("#s3").val();
            var address=$("#address").val();
            var addressliHtml='<li>'+
                  '<p><em class="name">'+name+'</em>(<em class="phone">'+phone+'</em>)</p>'+
                   ' <p class="all-address">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+'&nbsp;'+address+'</p>'+
                    '<p class="new_line"><br></p>'+
                    '<p class="address_action">'+
                        '<span class="edit"><a href="#"><i class="edit_icon"></i>编辑</a></span>'+
                        '<span><a href="#" class="delete float_none"><i class="delete_icon"></i>删除</a></span>'+
                    '</p>'+
                '</li>';
            if($.trim(name)!="" && $.trim(phone)!="" && $.trim(s1)!="" && $.trim(address)!=""){   
                $("#addresslist").append(addressliHtml);
                commonObj.clearAddress(); 
            }


        }
//      clearAddress:function(){
//          $("#consignee").val("");
//          $("#phone_mob").val("");
//          $("#s1").val("");
//          $("#s2").val("");
//          $("#s3").val("");
//          $("#address").val("");
//      }
	}
})