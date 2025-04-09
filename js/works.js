// $(function(){
//     alert('rudrh')
// })

$(function () {
  //팝업창 띄우기
  //바로 그 애를 띄워야함

  // .work-item 클릭 시 해당 data-id 값을 기반으로 팝업 열기
  // 먼저 위치 설정이 되어있어야 중앙에 있음
  $('.popup').css({
      "top": '50%',
      "left": '50%'
    });
  
  $('.work-item').click(function () {
      var workId = $(this).data('id');
      $('.popup').hide();
      // .popupbox를 먼저 보이게 함
      $('.popupbox').fadeIn();
      // data-id 값을 이용해 id 선택자 구성 후 해당 팝업 보여주기
      $('#work_' + workId).fadeIn();
  });

  $('.popupbox .close').click(function () {
      $(".popupbox").css("display", "none");
      $(".popup").css("display", "none");
      $("body").css("overflow", "auto")
  })
  //팝업창에서 슬라이드
  var swiper = new Swiper(".mySwiper", {
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
  });

    // [추가] 팝업 내 prev 버튼 클릭 시, 현재 필터링된 이전 작품의 팝업 띄우기
    $('.popup .prev').click(function(){
        var currentPopup = $(this).closest('.popup');
        // 현재 팝업 id에서 "work_"를 제거해 data-id 추출
        var currentId = currentPopup.attr('id').replace('work_', '');
        // 현재 필터링된 작품들 (보이는 상태)
        var visibleItems = $('.work-item:visible');
        var currentIndex = -1;
        visibleItems.each(function(index) {
          if ($(this).data('id') === currentId) {
            currentIndex = index;
            return false; // break out of loop
          }
        });
        if (currentIndex === 0) {
          alert("첫 번째 작업물입니다!");
          return;
        }
        var prevItem = visibleItems.eq(currentIndex - 1);
        var prevId = prevItem.data('id');
        // 현재 팝업 닫기 후 이전 팝업 띄우기
        currentPopup.fadeOut();
        $('#work_' + prevId).fadeIn();
      });
    
      // [추가] 팝업 내 next 버튼 클릭 시, 현재 필터링된 다음 작품의 팝업 띄우기
      $('.popup .next').click(function(){
        var currentPopup = $(this).closest('.popup');
        var currentId = currentPopup.attr('id').replace('work_', '');
        var visibleItems = $('.work-item:visible');
        var currentIndex = -1;
        visibleItems.each(function(index) {
          if ($(this).data('id') === currentId) {
            currentIndex = index;
            return false;
          }
        });
        if (currentIndex === visibleItems.length - 1) {
          alert("마지막 작업물입니다!");
          return;
        }
        var nextItem = visibleItems.eq(currentIndex + 1);
        var nextId = nextItem.data('id');
        currentPopup.fadeOut();
        $('#work_' + nextId).fadeIn();
      });

  

  // 메뉴 active 효과
  $('.menu-btn').click(function (e) {
      $('.menu-btn').removeClass('active');
      $(this).addClass('active');
  });

  // 카테고리 active 효과 + 필터링 기능
  $('.cat-btn').click(function (e) {
      e.preventDefault();
      $('.cat-btn').removeClass('active');
      $(this).addClass('active');

      const category = $(this).text().trim();
      // 클릭한 버튼의 텍스트 (예: ALL, 3D, VFX, MOTION, EDITING)
      // trim은 대상 문자열 앞뒤의 공백을 제거한 값을 반환함

      // 필터링
      if (category === 'ALL') {
          $('.work-item').fadeIn(300);
      } else {
          $('.work-item').each(function () {
              // hover-content 안의 span 텍스트를 가져와 비교 (#태그 포함)
              let tags = $(this).find('.hover-content span').text();
              if (tags.includes('#' + category)) {
                  $(this).fadeIn(300);
              } else {
                  $(this).fadeOut(300);
              }
          });
      }
  });

  // Hover 효과 (작품 hover 시 hover-content 전체 fadeIn)
  $('.work-item').hover(
      function () {
          $(this).find('.hover-content').fadeIn(300);
      },
      function () {
          $(this).find('.hover-content').fadeOut(300);
      }
  );
});



document.oncontextmenu = function () {
  return false;
}	// 오른쪽 클릭 방지

var omitformtags = ["input", "textarea", "select"]
omitformtags = omitformtags.join("|") // 드래그 방지

function disableselect(e) {
  if (omitformtags.indexOf(e.target.tagName.toLowerCase()) == -1)
      return false
}

function reEnable() {
  return true
}

if (typeof document.onselectstart != "undefined")
  document.onselectstart = new Function("return false")
else {
  document.onmousedown = disableselect
  document.onmouseup = reEnable
}