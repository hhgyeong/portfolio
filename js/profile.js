
$(document).ready(function () {
    // 메뉴 active 효과
    $('.menu-btn').click(function () {
        $('.menu-btn').removeClass('active');
        $(this).addClass('active');
    });

    $('.copy-text').click(function(){
        // 클릭한 문구의 텍스트 가져오기
        var text = $(this).text();
        
        // 임시 입력 필드에 텍스트 넣기 및 선택
        $('#tempInput').val(text).select();
        
        // 문서 명령어를 이용해 복사 실행
        document.execCommand('copy');
        
        // 복사 완료 알림
        alert('복사완료!');
      });
});