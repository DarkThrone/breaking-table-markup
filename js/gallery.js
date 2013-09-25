/**
 * Created with JetBrains WebStorm.
 * User: geronimo
 * Date: 9/24/13
 * Time: 11:59 PM
 * To change this template use File | Settings | File Templates.
 */
function makeGallery(itemHook){
    var $links = $(itemHook);
    $(itemHook).on('click', function(e){
        var img = $('img', e.currentTarget)[0],
            src = img.src;
        $('.modal-image').html('<img src="'+ src +'" />');
        $('.modal-title').text(img.alt);
        $('#modal-gallery').modal();
    });
}
makeGallery('.image-cell');