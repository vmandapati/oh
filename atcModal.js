function getRichRelevanceATCModel(dataObj){
	getItemStoreDetailsAndDisplayModal(dataObj);
}
if(window.oc){
  console.log('oc');
    oc.events.on('rrAddToCartFunction', function(event, data){
     console.log('makaila');
      var dataObj = {
        productCode:data.productId,
        itemStore:data.storeId,
        defaultPosition:data.productId
      }
      getRichRelevanceATCModel(dataObj);
     });
  }

function getItemStoreDetailsAndDisplayModal(dataObj,currentTargetEle){
	/*if($('#pagename').length > 0 ) {
		dataObj['pagename'] = $('#pagename').val();
	}*/
    console.log(dataObj);
	var $modal = $("#Purchase-Modal-Inter");
	$modal.modal('show');
	$modal.find('.modal-body').html('<div class="loading">Loading...</div>');
	$.ajax({
		type:"GET",
		dataType: "text",
		url:"/p/getDetails",
		data:dataObj
	})
	.done(function(result){
		$('#ajaxStoreModal').remove();
		$modal.find('.modal-body').html(result);
		var $noteSeletor = $modal.find('.note');
		if($.isEmptyObject($noteSeletor.html())){
			$noteSeletor.addClass('hide');
		}

		$modal.find('#nearbyStoreLink').attr('data-target', "#ajaxStoreModal");
		$modal.find('.twm-radio.active').addClass('js-current');
		var $storeModal =$modal.find('#ajaxStoreModal');
		$('body').append($storeModal);
		$modal.find('#storeName').val(dataObj.itemStore);
		//$modal.find('#storeName').val(store);

		TWM.updateCustomeRadio(true);
		$modal.find(".dropdown select").css({ 'position':'absolute' ,'left' : '-9999px' });
		$modal.find('[data-custom="dropdown"]').cutomedropdown();


		var qtyFromSL = $("#Purchase-Modal-Inter #sl-qty").val();
		if(qtyFromSL != '' && qtyFromSL!= undefined)
		{
			$modal.find('#overview-qty .qty-field').val(qtyFromSL);
		}

		if(currentTargetEle != undefined){
			if($('main').hasClass('slp')){
				var qty = $(currentTargetEle).closest('form').find('#quantity').val();
				if(qty <= maxCount){
					$('#overview-qty select').val(qty);
					$('#overview-qty select').parent().cutomedropdown({refresh:true}).data("refresh","true");
				}
			}else{
				carrySelectedQuantityForward(currentTargetEle);
			}
		}


		$modal.find('#qty').val($modal.find("#overview-qty .dropdown select").val());
		$modal.find('.detTab').remove();

		 var $radioActive=$('#Purchase-Modal-Inter .twm-radio.active');
                if($radioActive.attr("id")=="shipping"){
                    $(".ship").show();
                    $(".instore").hide();
                }
                else{
                    $(".ship").hide();
                    $(".instore").show();
                }

	})
	.fail(function(result){

	});
}
