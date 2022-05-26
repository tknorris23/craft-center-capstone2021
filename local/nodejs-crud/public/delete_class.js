//ajax function to delete class from database
function deleteClass(class_ID) {
    $.ajax({
        url: '/classes/' + class_ID,
        type: 'DELETE',
        success: function(result) {
            window.location.reload(true);
        }
    })
}