$(document).ready(function () {
      /*localStorage*/
    $('.articles-table tbody').html(localStorage.getItem('articles'));

    /*-----------jQuery Form validation starts here----------------------*/

    jQuery.validator.addMethod("ContainsAtLeastOneDigit", function (value) {
        return /^[a-z]+[0-9]/i.test(value);
    });

    $(function () {
        $(".articles-form").validate({
            highlight: function (element) {
                $(element).closest('.form-group').addClass("has-danger");
                $(element).addClass("form-control-danger");
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
                $(element).removeClass('form-control-danger').addClass('form-control-success');
            },
            rules: {
                name: {
                    required: true,
                    rangelength: [4, 20]
                },
                barcode: {
                    required: true,
                    digits: true
                },
                message: {
                    required: true,
                    maxlength: 200
                },
                price: {
                    required: true,
                    number: true
                },
                picture: {
                    required: true,
                    extension: "png"
                },
                articlesType: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: 'Polje Ime je obavezno.',
                    rangelength: 'Ime mora da sadrzi izmedju 4 i 20 karaktera.'
                },
                barcode: {
                    required: 'Barkod je obavezno polje.',
                    digits: 'Barkod sadrzi samo cifre.'
                },
                message: {
                    required: 'Polje je obavezno',
                    maxlength: 'Polje ne sme biti duze od 200 karaktera.'
                },
                price: {
                    required: 'Polje je obavezno.',
                    number: 'Unesite samo broj.'
                },
                picture: {
                    required: 'Polje je obavezno.',
                    extension: 'Slika mora biti u png formatu.'
                },
                articlesType: {
                    required: 'Polje je obavezno.'
                }
            },
            errorElement: 'p',
            errorPlacement: function (error, element) {
                error.appendTo($(element).closest('.form-group').find('.error-msg'));
            }
        });
    });

    /*------------------------ insert data into table-------------------- */

    $('.submitBtn').click(function(e) {
        e.preventDefault();
        let errors = $('.error-msg').text();
        if (errors.length == 0) {
           
            let articleName = $('.articles-form .name').val();
            let barcode = $('.articles-form .barcode').val();
            let description = $('.articles-form .description').val();
            let price = $('.articles-form .price').val();
            let pricePDV = price * 1.2;
            if ($("input[type='radio'].form-check-input").is(':checked')) {
                var articlesType = $("input[type='radio'].form-check-input:checked").val();
            }
            let currentdate = new Date();
            let datetime = currentdate.getDate() + "."
                + (currentdate.getMonth() + 1) + "."
                + currentdate.getFullYear() + " - "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            let articleImg = $('.articles-form .myPicture').val();

            if(articleName.length != 0 && barcode.length !=0){
            $('.articles-table tbody').prepend('<tr class="text-center">' + '<td class="name"> ' + articleName + ' </td>' + '<td>' + barcode + '</td>' + '<td>' + description + '</td>' + '<td>' + price + '</td>' + '<td>' + pricePDV.toFixed(2) + '</td>' + '<td>' + articlesType + '</td>' + '<td>' + articleImg + '</td>' + '<td>' + datetime + '</td>' + '</tr>');
           
            localStorage.setItem('articles', $('.articles-table tbody').html());
            /* delete values from input */
            $('.articles-form .name').val('').parent().removeClass('has-success');
            $('.articles-form .barcode').val('').parent().removeClass('has-success');
            $('.articles-form .description').val('').parent().removeClass('has-success');
            $('.articles-form .price').val('').parent().removeClass('has-success');
            $('.articles-form .myPicture').val('').parent().removeClass('has-success');
        }
    }
    });

    /*-------------------------- search article by his name--------------------- */
    $('.articles-table .search').on('keyup', 'input', function () {
        let target = $(this).data('search');
        let inputValue = $(this).val().toLowerCase();

        $(target).each(function () {
            let text = $(this).text().toLowerCase();

            if (text.indexOf(inputValue) < 0) {
                $(this).closest('tr').hide();
            } else {
                $(this).closest('tr').show();
            }
        });
    });


});






