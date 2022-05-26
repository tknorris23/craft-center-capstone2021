//js file for search function on the registration page

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

function mySearchFunction() {
    //feeSearch();
    // Declare variables
    var input, cards, item, i, j, txtValue, card;
    var collapsible, category, instructor, fee;
    var listArr = [];
    // User Input
    input = document.getElementById("searchbar").value.toLowerCase();
    // Grabs the parent element by id
    cards = document.getElementById("cards");
    // Individual item on list
    collapsible = cards.getElementsByClassName("collapsible");

    category = cards.getElementsByClassName("item2-category");

    instructor = cards.getElementsByClassName("item1-instructor");

    fee = cards.getElementsByClassName("item4-fee");

    description = cards.getElementsByClassName("item7-descrip");

    card = cards.getElementsByClassName("card");
    console.log(collapsible);

    var collectibles = [collapsible, category, instructor, fee, description];

    // Treats lists items like an array, where each item can be accessed through it's index
    for (j = 0; j < collectibles.length; j++) {
        for (i = 0; i < collectibles[j].length; i++) {
            item = collectibles[j][i];
            //console.log(item.innerHTML);
            // Iterate over each list item to see if the value of the input, ignoring case, matches the inner text or inner html of the item.
            txtValue = item.innerHTML;
            if (txtValue.toLowerCase().indexOf(input) > -1) {
                // add list items to an array
                listArr.push(card[i]);
            } else {
                card[i].style.display = "none";
            }
        }
    }

    //loop through positive searches and display them.
    for (i = 0; i < listArr.length; i++) {
        listArr[i].style.display = "";

    }
}

// function feeSearch() {
//     var card, fee, input, cost, cards, i, item;

//     input = document.getElementById("select-box-fee").value.toLowerCase();
//     // Grabs the parent element by id
//     card = document.getElementById("cards");

//     fee = card.getElementsByClassName("item4-fee");

//     cards = card.getElementsByClassName("card");

//     for (i = 0; i < cards.length; i++) {
//       item = cards[i];
//             // Iterate over each list item to see if the value of the input, ignoring case, matches the inner text or inner html of the item.
//             txtValue = item.innerHTML;
//             if (txtValue.toLowerCase().indexOf(input) > -1) {
//                 // add list items to an array
//                 listArr.push(card[i]);
//             } else {
//                 card[i].style.display = "none";
//             }
//     }



// }