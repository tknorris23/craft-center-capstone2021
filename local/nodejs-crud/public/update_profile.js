//ajax funtion to update the user's information in the database
function updateProfile() {
    $.ajax({
        url: '/profile/update',
        type: 'POST',
        data: $('#profileForm').serialize(),
        success: function(result) {
            alert("Profile Updated Successfully");
            window.location.reload("./profile");

        }
    })
};

/*window.addEventListener('DOMContentLoaded', function () {
  var updateProfileButton = document.getElementById('saveButton');
  if (updateProfileButton) {
    updateProfileButton.addEventListener('click', updateProfile);
  }
});
*/