//ajax function to delete form from database
function deleteForm(form_ID) {
    $.ajax({
        url: '/forms/' + form_ID,
        type: 'DELETE',
        success: function(result) {
            window.location.reload(true);
        }
    })
}