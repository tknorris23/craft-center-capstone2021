//function to get profile from the login textboxes and save to session variable
function getProfile() {
    //get the profile to search for
    try {
        var get_profile = document.getElementById('get_profile').value;
    } catch (e) {
        var get_profile = document.getElementById('Uname').value;
    }
    //construct the URL and redirect to it
    window.location = '/profile/' + encodeURI(get_profile)
}

//event listeners for when user clicks login
window.addEventListener('DOMContentLoaded', function() {
    var getProfileButton = document.getElementById('getProfileButton');
    if (getProfileButton) {
        getProfileButton.addEventListener('click', getProfile);
    }

    var login = document.getElementsByClassName('login-button')[0];
    if (login) {
        login.addEventListener('click', getProfile);
    }
});