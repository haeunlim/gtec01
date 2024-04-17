let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", vh + "px");
window.addEventListener("resize", function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh + "px");
});
function downloadURI(uri, name) {
  var link = document.createElement("a");
  // var link2 = document.createElement("a");
  link.download = name;
  // link2.download = name2;
  link.href = `./assets/down/${uri}`;
  // link2.href = `./assets/down/${uri2}`;
  link.click();
  // link2.click();
}

$(function () {
  Main.init();
});

var Main = {
  init: function (e) {
    // Main.professor_sect();
    Main.commonF();
    Main.mainVisualF();
    Main.overViewF();
    Main.graphF();
    Main.pointsF();
    Main.programF();
    Main.certofocateF();
    Main.professorF();
    Main.facilitiesF();
    Main.careerF();
    Main.roadMapF();
    Main.subjectF();
    Main.videoF();
    Main.communityF();
    Main.summaryF();
    Main.ScrollEvent();
  },
  commonF: function () {
    // main visual
    $(window).on("load", function () {
      $(".main_visual .ani_el").addClass("move");
    });
    //   all menu function
    $(".ham_btn").click(function () {
      $("html").toggleClass("gnb_open");
    });
    $(".gnb a").on("click", function () {
      let idx = $(this).index() + 1;
      let target = $("#container section").eq(idx).offset().top;
      $("body, html").animate({ scrollTop: target });

      $("html").removeClass("gnb_open");
    });
  },
  mainVisualF: function () {
    /*유투브 API 적용*/
    var playerReady = false;
    window.onYouTubeIframeAPIReady = function () {
      //simple implementation
      playerReady = true;
    };
    var tag;
    var firstScriptTag;
    tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var i_cnt = 0;
    window.onYouTubeIframeAPIReady = function () {
      if (i_cnt == 0) {
        i_cnt++;
        interval_id = setInterval(onYouTubeIframeAPIReady, 0);
      } else {
        i_cnt++;
        clearInterval(interval_id);
        ytp_player = new YT.Player("playYtArea", {
          videoId: $("#playYtArea").data("ytid"),
          width: "100%",
          height: "100%",
          playerVars: {
            rel: 0,
            modestbranding: 0,
            controls: 0,
            fs: 0,
            disablekb: 1,
            loop: 0,
            muted: 1,
          }, //설정
          events: {
            onReady: onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
            onStateChange: onPlayerStateChange, // 플레이어의 상태가 변경될 때마다 실행
          },
        });
      }
    };

    if (playerReady) {
      onYouTubeIframeAPIReady();
    }

    function onPlayerReady(event) {
      //vidRescale();
      event.target.mute();
      event.target.seekTo(0, true);
      event.target.playVideo();
      //event.target.playVideo();//자동재생
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
      }
      if (event.data == YT.PlayerState.ENDED) {
        event.target.playVideo();
      }
    }
    /*유투브 API 적용*/
  },
  overViewF: function () {
    var overviewSwiper = new Swiper(".overview_slider", {
      slidesPerView: "auto",
      spaceBetween: 40,
      loop: true,
      navigation: {
        nextEl: ".overview_sect .swiper-button-next",
        prevEl: ".overview_sect .swiper-button-prev",
      },
      breakpoints: {
        850: {
          spaceBetween: 15,
        },
      },
    });
  },
  graphF: function () {
    $(".percent.gtec strong").counterUp({
      delay: 10,
      time: 2000,
    });
    $(".percent.whole strong").counterUp({
      delay: 10,
      time: 1500,
    });
  },
  pointsF: function () {},
  programF: function () {
    $(".program_sect .swiper-slide-btn").each(function (index, element) {
      var $this = $(this);
      $this.addClass(`program-slider-btn-${index}`);
    });
    $(".program_slider").each(function (index) {
      let $this = $(this);
      let ProgramSwiper = undefined;
      let slideNum = $this.find(".swiper-slide").length; //슬라이드 총 개수
      let slideInx = 0; //현재 슬라이드 index

      //디바이스 체크
      let oldWChk = window.innerWidth > 850 ? "pc" : "mo";
      sliderAct();
      $(window).on("resize", function () {
        let newWChk = window.innerWidth > 850 ? "pc" : "mo";
        if (newWChk != oldWChk) {
          oldWChk = newWChk;
          sliderAct();
        }
      });

      function sliderAct() {
        //슬라이드 인덱스 클래스 추가
        $this.addClass(`program-slider-${index}`);

        //슬라이드 초기화
        if (ProgramSwiper != undefined) {
          ProgramSwiper.destroy();
          ProgramSwiper = undefined;
        }

        //slidesPerView 옵션 설정

        ProgramSwiper = new Swiper(`.program-slider-${index}`, {
          slidesPerView: "auto",
          spaceBetween: 40,
          loop: true,
          loopAdditionalSlides: 1,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: $(`.program-slider-btn-${index} .swiper-button-next`),
            prevEl: $(`.program-slider-btn-${index} .swiper-button-prev`),
          },
          watchOverflow: true,
          breakpoints: {
            850: {
              spaceBetween: 15,
            },
          },
        });

        $(".program_sect .slide_tab button").on("click", function () {
          let target = $(this).val();
          $(".program_sect .program_slider").removeClass("active");
          $(".program_sect .swiper-slide-btn").removeClass("active");
          $(".program_sect .text-box p").removeClass("active");
          $("." + target).addClass("active");
          addRemove(this);
          ProgramSwiper.init();
        });
      }
    });
  },
  certofocateF: function () {},
  professorF: function () {
    if ($(".professor_sect .swiper-slide ").length <= 4) {
      var clonee = $(".mySwiper .swiper-slide").clone();
      clonee.prependTo(".professor_sect .swiper-wrapper");
    } else {
      console.log("no");
    }

    var slide = new Swiper(".mySwiper .swiper-container", {
      slidesPerView: "auto",
      spaceBetween: -1,
      speed: 1000,
      initialSlide: 0,
      loop: true,
      loopAdditionalSlides: 1,
      navigation: {
        nextEl: ".professor_sect .swiper-button-next",
        prevEl: ".professor_sect .swiper-button-prev",
        breakpoints: {
          1380: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
          },
        },
      },
    });
  
    if ($(".professor_sect").length > 0) {
      setTimeout(function () {
        slide.update();
      }, 300);

      var resizeCheck; // 리사이즈 END체크
      $(window).resize(function () {
        if (resizeCheck) {
          //계속 리사이즈중이면 clear
          clearTimeout(resizeCheck);
        }

        //0.5초이상 리사이즈 지속하지않으면 실행
        resizeCheck = setTimeout(function () {
          slide.update(); //스와이퍼 업데이트
        }, 500);
      });
    }
  },
  facilitiesF: function () {
    var facilitiesSwiper = new Swiper(".facilities_slider", {
      slidesPerView: "auto",
      spaceBetween: 50,
      loop: true,
      navigation: {
        nextEl: ".facilities_sect .swiper-button-next",
        prevEl: ".facilities_sect .swiper-button-prev",
      },
      breakpoints: {
        850: {
          spaceBetween: 15,
        },
      },
    });
  },
  careerF: function () {

    /* Swiper Slider Cards Home - Show only on mobile */
    var careerSwiper = Swiper;
    var init = false;
    function swiperMode() {
      let mobile = window.matchMedia("(min-width: 0px) and (max-width: 850px)");

      if (mobile.matches) {
        if (!init) {
          init = true;
           careerSwiper = new Swiper(".career_slider", {
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
            loopAdditionalSlides: 1,
            spaceBetween: 40,
            navigation: {
              nextEl: ".career_slider .swiper-button-next",
              prevEl: ".career_slider .swiper-button-prev",
            },
            breakpoints: {
              850: {
                slidesPerView: "auto",
                spaceBetween: 15,
                centeredSlides: false,
              },
            },
          });
        }
        $('.career_slider').removeClass('web');
        $('.career_slider').addClass('mo');
      } else {
        careerSwiper.destroy();
        init = false;
        $('.career_slider').removeClass('mo');
        $('.career_slider').addClass('web');
      }
    }

    window.addEventListener("load", function () {
      swiperMode();
    });

    window.addEventListener("resize", function () {
      swiperMode();
    });
  


   
  },
  roadMapF: function () {},
  subjectF: function () {},
  videoF: function () {
    $(".thumnail_slider figure").on("click", function () {
      let videoInput = $(".video_container iframe");
      let src = $(this).attr("src");
      videoInput.attr("src", src);
      console.log(videoInput);
    });
    var videoSwiper = new Swiper(".thumnail_slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".video_sect .swiper-button-next",
        prevEl: ".video_sect .swiper-button-prev",
      },
      breakpoints: {
        850: {
          slidesPerView: "auto",
          spaceBetween: 10,
        },
      },
    });
  },
  communityF: function () {
    // filter items on button click
    $(".tab_btns a").on("click", function (e) {
      e.preventDefault();
      var filterValue = $(this).attr("data-filter");
      $(".grid").isotope({ filter: filterValue });
      $(".tab_btns a").removeClass("on");
      $(this).addClass("on");
    });
  },
 
  summaryF: function () {
    var winW = $(window).width();
    $(window).on("load", function () {
      summaryDelay();
    });
    $(window).on("resize", function () {
      summaryDelay();
    });
    function summaryDelay() {
      if (winW < 850) {
        $(".summary_list li").each(function () {
          $(this).attr("data-ani-delay", 0);
        });
      }
    }
  },
  ScrollEvent: function () {
    var aniDiv = document.querySelectorAll(".ani_el");
    var aniDivArry = new Array();

    Array.prototype.forEach.call(aniDiv, function (ele) {
      aniDivArry.push(ele);
    });

    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop(),
        windowH = ($(window).height() / 4) * 3;
      var scrollBottom =
        $(document).height() - $(window).height() - $(window).scrollTop();

      if (scrollBottom <= 0) {
        $(".ani_el").addClass("move");
      }
      // section animate
      for (var i = 0; i < aniDivArry.length; i++) {
        if ($(aniDivArry[i]).offset().top < scrollTop + windowH) {
          $(aniDivArry[i]).addClass("move");
          aniDivArry.splice(i, 1);
        }
      }

      // header animate
      if (scrollTop > 0) {
        $("html").addClass("header_on");
      } else {
        $("html").removeClass("header_on");
      }

      // graph animate
      $(".graph").each(function () {
        var value = $(this).data("percent");
        if ($(".graph_area").hasClass("move")) {
          setTimeout(() => {
            $(this).css({ height: value });
          }, 100);
        }
      });
      $(".mo_graph").each(function () {
        var value = $(this).data("percent");
        if ($(".graph_area").hasClass("move")) {
          setTimeout(() => {
            $(this).css({ width: value });
          }, 100);
        }
      });
    });
  },
};
