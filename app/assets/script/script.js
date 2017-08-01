'use strict'

//MOBILE TOGGLER
//Toggles the mobile dropdown menu open and closed

document.querySelector('.flexnav__toggler').addEventListener('click', () => {
    document.querySelector('.flexnav__toptab-ul').classList.toggle('mobile-nav-revealer');
    toggleButton();
});


//Changes the toggle button icon between a '+' and an 'x'

const toggleButton = () => {
    let toggle = document.querySelector('.flexnav__toggler').innerHTML
    if (toggle === '+') {
        document.querySelector('.flexnav__toggler').innerHTML = '&times;';
    } else {
        document.querySelector('.flexnav__toggler').innerHTML = '&#43;';
    }
}



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//Submenu Reset: on click outside navbar.
//
//Closes Mobile view dropdown menu if anywhere outside of the navbar (.flexnav) is clicked.

let flexNavUnorderedList = document.querySelector('.flexnav');

document.addEventListener('click', function (event) {
    let isClickInside = flexNavUnorderedList.contains(event.target);
    if (!isClickInside) {
        document.querySelector('.flexnav__toggler').innerHTML = '&#43;';
        document.querySelector('.flexnav__toptab-ul').classList.remove('mobile-nav-revealer');
    }
});



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//Submenu Reset: on changing browser/screen size.
//
//javaScript Media Query to reset toggle button to a + when screen size enlarges.
//Also it removes the '.mobile-nav-revealer' class from the '.flexnav__toptab-ul'.
//By doing this the state of the submenu and toggle button are 'reset' so it's not left open if someone is e.g. dragging the side of the browser window between small and large width repeatedly while the mobile submenu is open (now it will close automatically on screen resize).

let mq = window.matchMedia('(min-width: 1024px)');

mq.addListener((changed) => {
    if (changed.matches) {
        document.querySelector('.flexnav__toggler').innerHTML = '&#43;';
        document.querySelector('.flexnav__toptab-ul').classList.remove('mobile-nav-revealer');
    }
});



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



//MODALS//
//Modals must be put into the HTML in the same order as their corresponding News Column items.

let modalButtonArray = Array.from(document.querySelectorAll('.modal-button--open'));
let modalsArray = Array.from(document.querySelectorAll('.modal'));
let modalButtonClose = Array.from(document.querySelectorAll('.modal-button--close'));
let modalPrintButton = Array.from(document.querySelectorAll('.modal__print-button'))
let modalButtonClicked;


modalButtonArray.forEach(item => {
    //add event listeners to each of the modal buttons
    item.addEventListener('click', () => {
        //get the index of the clicked one
        modalButtonClicked = modalButtonArray.indexOf(item);
        //remove the .modal--hidden class from the corresponding modal of the same index value;
        modalsArray[modalButtonClicked].classList.remove('modal--hidden');
    });

});


modalButtonClose.forEach(item => {
    //    let modalsArray = Array.from(document.querySelectorAll('.modal'));
    item.addEventListener('click', () => {
        modalsArray[modalButtonClicked].classList.add('modal--hidden');
    });
});


//PRINTING MODALS

modalPrintButton.forEach(item => {
    //    let modalsArray = Array.from(document.querySelectorAll('.modal'));
    item.addEventListener('click', () => {
        modalsArray[modalButtonClicked].classList.add('printThis');
        printContent();
    });
});

function printContent() {
    var restorepage = document.body.innerHTML;
    var printcontent = document.querySelector('.printThis').innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
    //reload the page so the event listeners are reset.
    location.reload();
}

//PRINTING
//function printContent(el) {
//    var restorepage = document.body.innerHTML;
//    var printcontent = document.getElementById(el).innerHTML;
//    document.body.innerHTML = printcontent;
//    window.print();
//    document.body.innerHTML = restorepage;
//    //reload the page so the event listeners are reset.
//    location.reload();
//}
