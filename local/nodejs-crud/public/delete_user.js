//ajax function to delete user from database
function deleteUser(user_ID) {
    $.ajax({
        url: '/users/' + user_ID,
        type: 'DELETE',
        success: function(result) {
            window.location.reload(true);
        }
    })
}