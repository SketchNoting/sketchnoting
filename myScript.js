var initial = 1;
var threshold = 100;
var end = initial + threshold

for (var i = 1; i < 104; i++){

    // console.log('HELLO')
    $('.grid').append(`
        <div class="grid-item">
            <img src="hello/image (`+i+`).jpg" />
        </div>
    `)
    // console.log( `<img src="hello/1 (`+i+`).jpg" />`)
}

initial = end;
end = initial + threshold

var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200,
    gutter: 10

});

$grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });
