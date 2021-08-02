$(document).ready(function () {
    $('#count').before('<input class="add_btn" id="add_btn" type="button" value="ردیف جدید">');
    $('.repeatable').append('<a class="remove" href="javascript:void(0);">حدف ردیف</a>');

    updateRemoveLinks = function () {
        if ($('.repeatable').length > 1) {
            $('.repeatable').children('.remove').css({ 'display': 'block' });
            $('.inRow').addClass("multiLine");
        } else {
            $('.repeatable').children('.remove').css({ 'display': 'none' });
            $('.inRow').removeClass("multiLine");
        }
    }
    updateRemoveLinks();
    destroy = function () {
        $('.remove').click(function () {
            $(this).parent('.repeatable').remove();
            updateNumber();
            updateRemoveLinks();
            updatePrice();
        });
    }
    $('.add_btn').click(function () {
        $('.repeatable').first().clone().insertBefore(this).html();
        var num = $('.repeatable').length;
        $('.repeatable').last().find('input').each(function () {
            dattr = $(this).data('structure') + num;
            $(this).val("");
            $(this).attr({
                'id': dattr,
                'name': dattr
            }).siblings('label').attr('for', dattr);
            $('#count').val($('.repeatable').length);
        });
        destroy();
        updateRemoveLinks();
        updateNumber();
    });
    updateNumber = function () {
        $('.repeatable').each(function () {
            var r = this;
            var num = $(r).index() + 1;
            $(r).find('input').each(function () {
                dattr = $(this).data('structure') + num;
                $(this).attr({
                    'id': dattr,
                    'name': dattr
                }).siblings('label').attr('for', dattr);
            });
        });
    }

    updatePrice = function () {
        var totalSum = 0;
        $('.repeatable').each(function () {
            var r = this;
            var number = $(r).find('input[data-structure="productNumber_"]').val();
            var price = $(r).find('input[data-structure="productPrice_"]').val();
            $(r).find('input[data-structure="productSum_"]').val(number * price);
            totalSum += number * price;
        });
        $('#totalSum').html(totalSum);
        var discountAmount = discountCalculate(totalSum);
        var finalSum = totalSum - discountAmount;
        $('#finalSum').html(finalSum);
    }

    $('.curr').html(localStorage.getItem("currency"));

    window.addEventListener('storage', () => {
        if (localStorage.getItem("currencyFlag") == 1) {
            $('.curr').html(localStorage.getItem("currency"));
            localStorage.removeItem('currencyFlag');
        }
        logo();
        discount();
    });

    function logo() {
        document.getElementById("userLogo").src = localStorage.getItem("logoSrc");
        if (localStorage.getItem("logo") === 'true') {
            document.getElementById("userLogo").style.visibility = "visible";
        } else {
            document.getElementById("userLogo").style.visibility = "hidden";
        }
    }

    function discount() {
        if (localStorage.getItem("discount") == 'riali') {
            $("#discountSuffix").html(localStorage.getItem("currency"));
            document.getElementById("discount").removeAttribute("max");
        } else {
            $("#discountSuffix").html("%");
            document.getElementById("discount").setAttribute("max", 100);

        }
        updatePrice();
    }

    function discountCalculate(sum) {
        if (localStorage.getItem("discount") == 'riali') {
            return $('#discount').val();
        } else {
            if (sum != 0) {
                return ((sum * $('#discount').val()) / 100);
            } else {
                return 0;
            }
        }
    }
    logo();
    discount();
    $('#openSetting').on("click", function () {
        $('#modal').css("display", "block");
    });
    $('#closeSetting').on("click", function () {
        $('#modal').css("display", "none");
    });

});