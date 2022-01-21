function searchUsersByOSUID() {
    //get the OSU_ID 
    var OSU_ID_search_string  = document.getElementById('OSU_ID_search_string').value
    //construct the URL and redirect to it
    window.location = '/users_classes/search/' + encodeURI(OSU_ID_search_string)
}
