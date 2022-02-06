function getProfile() {
    //get the OSU_ID 
    var get_profile  = document.getElementById('get_profile').value
    //construct the URL and redirect to it
    window.location = '/profile/' + encodeURI(get_profile)
}

window.addEventListener('DOMContentLoaded', function () {
    var getProfileButton = document.getElementById('getProfileButton');
    if (getProfileButton) {
      getProfileButton.addEventListener('click', getProfile);
    }
});
