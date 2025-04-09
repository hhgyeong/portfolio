$(function(){
    
    $(window).on('resize', function(){
        var winW = $(window).width();
        if(winW > 768){
            // 큰 화면인 경우
            $('#responsiveVideo').attr('src', 'videos/large_video.mp4');
        } else {
            // 작은 화면인 경우
            $('#responsiveVideo').attr('src', 'videos/small_video.mp4');
        }
    });
});