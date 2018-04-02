
$(document).ready(function() {
    $('#fullpage').fullpage()
    main.box_reset()

})
$(window).resize(function(){
	main.box_reset()
})
var main_data={
	test:true,
}
var main = {
    box_reset: function() {
    	$('.content_box').hide()
        var plan_key = 1440 / 620
        var win_h = $(window).height()
        var win_w = $(window).width()
        var run_key = win_w / win_h
        var change_key
        if (plan_key > run_key) {
             change_key = win_w / 1440
        } else {
             change_key = win_h / 620
        }
        main_data.test && console.log(change_key)
        $('.content_box').css('transform',`translate(-50%,-50%) scale(${change_key}) `)
        $('.content_box').show()
    },
}