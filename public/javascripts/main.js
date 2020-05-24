/*  ---------------------------------------------------
    Template Name: Local Direction
    Description: Local Direction HTML Template
    Author: Colorlib
    Author URI: https://www.colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    $('.slicknav_nav ul ').prepend('<li class="header-right-warp"></li>');
    $('.header-right').clone().prependTo('.slicknav_nav > ul > .header-right-warp');

    /*----------------------
        Testimonial Slider
    -----------------------*/
    $(".testimonial-item").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoplay: false,
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.pop-up').magnificPopup({
        type: 'image'
    });

    /*-------------------
		Category Select
	--------------------- */
    $('.ca-search').niceSelect();

    /*-------------------
		Local Select
	--------------------- */
    $('.lo-search').niceSelect();

    /*-------------------
		Arrange Select
	--------------------- */
    $('.arrange-select select').niceSelect();

    /*-------------------
		Radio Btn
	--------------------- */
    $(".filter-left .category-filter .category-option .co-item label").on('click', function () {
        $(".filter-left .category-filter .category-option .co-item label").removeClass('active');
        $(this).addClass('active');
    });

    $(".filter-left .rating-filter .rating-option .ro-item label").on('click', function () {
        $(".filter-left .rating-filter .rating-option .ro-item label").removeClass('active');
        $(this).addClass('active');
    });

    $(".filter-left .distance-filter .distance-option .do-item label").on('click', function () {
        $(".filter-left .distance-filter .distance-option .do-item label").removeClass('active');
        $(this).addClass('active');
    });


    /*-------------------
        확인 버튼
    --------------------- */


    $("#submit").click(function () {
        let data = {
            reference_num: $('input[name="reference_num"]').val(),
            building_id: $('input[name="building_id"]').val(),
            name: $('input[name="name"]').val(),
            telephone: $('input[name="telephone"]').val(),
            email: $('input[name="email"]').val(),
            department: $('input[name="department"]').val()
        }
        Swal.fire({
            title: '건물의 어느 위치로 방문하십니까?',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            preConfirm: (visiting_dept) => {
                data['visiting_dept'] = visiting_dept
                return fetch(`//localhost:3000/visitor/new`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value.status === false) {
                Swal.fire({
                    icon: 'error',
                    title: '앗, 이런..',
                    text: result.value.message,
                })
            }

            if (result.value.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: '감사합니다!',
                    text: '정상적으로 처리되었습니다.',
                    timer: 2000,
                    timerProgressBar: true,
                    onClose: () => {
                        $("input[type=text], textarea").val("");
                    }
                })
            }
        })
    })

    /*-------------------
        학번 체크 기능....
    --------------------- */
    var callback = function(event) {			
        event.preventDefault();
        // Do exciting things here.	
        var data = {
            reference_num: $(this).val()
        }

        var additional_info = 0;

        if (data.reference_num.length > 4) {
            fetch('//localhost:3000/helper/check/reference', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(result => {
                if (result.status === false && additional_info == 0) {
                    $('.additional_info').slideDown()
                    additional_info = 1;
                } else {
                    $('.additional_info').slideUp()
                    additional_info = 0;
                }
            })
        }
        
    };
    $('input[name="reference_num"]').on({
        submit: callback,
        keyup: $.debounce(350, callback)
    })

})(jQuery);