function addClass(class_ID){
    $.ajax({
        url: '/open_classes/' + class_ID,
        type: 'POST',
        success: function(result){
            window.location.reload(true);
        }
    })
}