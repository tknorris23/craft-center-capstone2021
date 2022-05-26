//testing js file for registration page search bar. Use open_class_registration.js instead of this file.

const userCardTemplate = document.querySelector("[data-user-template]")
    // const userCardContainer = document.querySelector("[data-user-card-container]")
const searchInput = document.querySelector("[data-search]")

let classes2 = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    classes2.forEach(classesItem => {
        const isVisible = classesItem.className.toLowerCase().includes(value) ||
            classesItem.instructor.toLowerCase().includes(value) ||
            classesItem.description.toLowerCase().includes(value)
        classesItem.element.classList.toggle("hide", !isVisible)
    })
})


//const classes = [];

// let card = document.getElementsByClassName("card");
// let classes = jQuery.makeArray(card);



// classes.push({
//     "className": "Beginning Wheel Throwing Mondays Session A",
//     "category": "Ceramics",
//     "instructor": "Rachel Kirby (she/her)",
//     "date": "Mon Jan 7 - Feb 7",
//     "time": " 2:30-5",
//     "term": "Winter 2022",
//     "fee": "$100",
//     "max_enrl": 5,
//     "actual_enrl": 4,
//     "description": "In this 4 week class, you will learn the basics of throwing. From centering to trimming and glazing, this class will get you going in ceramics!"
// });

// classes.push({
//     "className": "Make a Mug Workshop!",
//     "category": "Ceramics",
//     "instructor": "Rachel Kirby (she/her)",
//     "date": "Mon Jan 7 - Feb 7",
//     "time": " 2:30-5",
//     "term": "Winter 2022",
//     "fee": "$20",
//     "max_enrl": 2,
//     "actual_enrl": 1,
//     "description": "Make your own hand built mug while learning handbuilding techniques!"
// });

// const myJSON = JSON.stringify(classes);

let data = JSON.parse(myJSON);

classes2 = data.map(classesItem => {
    const card = userCardTemplate.content.cloneNode(true).children[0]
    console.log(card)
    const collapsible = card.querySelector("[collapsible-header]")
    const item1_instructor = card.querySelector("[item1-instructor-body]")
    const item2_dates = card.querySelector("[item2-dates-body]")
    const item3_time = card.querySelector("[item3-time-body]")
    const item4_fee = card.querySelector("[item4-fee-body]")
    const item5_max_enrl = card.querySelector("[item5-max-enrl-body]")
    const item6_actual_enrl = card.querySelector("[item6-actual-enrl-body]")
    const item7_descrip = card.querySelector("[item7-descrip-body]")

    collapsible.textContent = classesItem.className
    item1_instructor.textContent = classesItem.instructor
    item2_dates.textContent = classesItem.date
    item3_time.textContent = classesItem.time
    item4_fee.textContent = classesItem.fee
    item5_max_enrl.textContent = classesItem.max_enrl
    item6_actual_enrl.textContent = classesItem.actual_enrl
    item7_descrip.textContent = classesItem.description

    userCardContainer.append(card)
    return {
        className: classesItem.className,
        instructor: classesItem.instructor,
        date: classesItem.date,
        time: classesItem.time,
        fee: classesItem.fee,
        max_enrl: classesItem.max_enrl,
        actual_enrl: classesItem.actual_enrl,
        description: classesItem.description,
        element: card
    }
})

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
}