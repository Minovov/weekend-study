// $('선택자').이벤트(함수)
$('#light-theme-btn').click(function () {
    $('header').addClass('light-theme');
})

$('#dark-theme-btn').click(function () {
    $('header').removeClass('light-theme');
})

$('#theme-btn').click(function () {
    $('header').toggleClass('light-theme');
})
