/**
 * Created with JetBrains WebStorm.
 * User: geronimo
 * Date: 9/24/13
 * Time: 11:59 PM
 * To change this template use File | Settings | File Templates.
 */
function makeGallery(itemHook){
    var
        images = [].slice.call(document.querySelectorAll(itemHook + ' img')),
        MAX_IMAGES = images.length,
        current = 0,
        $modal = $('#modal-gallery');

    function findInCollection(needle, haystack){
        var idx = -1;
        haystack.some(function(el){
            idx++;
            return el.src == needle;
        });

        return idx;
    }

    function showImage(old, $container){
        //Create a place holder image
        var newImg = document.createElement('IMG');

        //Point the new source to the image, append it to the container, but first empty it
        //set the title to the alt image, and show the modal
        newImg.src = old.src;
        newImg.alt = old.alt;
        $container.find('.modal-image').empty().append($(newImg).hide());
        $container.find('.modal-title').text(newImg.alt);
        $(newImg).fadeIn();
    }

    $modal.on('hidden.bs.modal', function(){
        current = 0;
    });

    $(itemHook).on('click', function(e){

        var
            //Find the clicked img
            img = $('img', e.currentTarget)[0];

        //We don't know which possition we took, BUT, we can find out!
        current = findInCollection(img.src, images);

        showImage(img, $modal);
        $modal.modal();
    });

    $('#takeMeRight').on('click', function(e){
        var oldImg;

        //update the index
        current = (++current)%MAX_IMAGES;
        //Find the image AND update current. Use a mod cap to cycle through all the images
        oldImg = images[current];

        $modal.find('.modal-image img');
        showImage(oldImg, $modal);
    });

    $('#takeMeLeft').on('click', function(e){
        var oldImg;

        //update the index
        current = (--current)>=0?current:(MAX_IMAGES-1);
        //Find the image AND update current. Use a mod cap to cycle through all the images
        oldImg = images[current];

        showImage(oldImg, $modal);
    });
}

makeGallery('.image-cell');