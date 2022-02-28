function updateProfile() {
  $.ajax({
    url: '/profile/',
    type: 'PUT',
    data: $('#profileForm').serialize(),
    success: function (result) {
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
