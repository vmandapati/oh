<script>
if($('.plp-product-changelocation').length > 0 ){
  $('.plp-list .plp-list-buy-ctrls').css('display', 'none');
  $('.grid-view .plp-list li').css('height','485px');
  $('.grid-view .plp-product-changelocation').css('bottom', '100px');
}
else{
  $('.plp-list .plp-list-buy-ctrls').css('display', 'none');
  $('.grid-view .plp-list li').css('height','440px');
}
</script>


var str = '3,432.90'
parseFloat(_satellite.getVar('Order_Total').split(',').join(''));

var str = '3,432.90'

parseFloat( str.replace(/[^\d\.]/g,'') );
