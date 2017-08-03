'use strict'

//MOBILE TOGGLER
//Toggles the mobile dropdown menu open and closed

document.querySelector('.flexnav__toggler').addEventListener('click', () => {
    document.querySelector('.flexnav__toptab-ul').classList.toggle('js--mobile-nav-revealer');
    closeSubMenus();
    toggleButtonState();
});


//Changes the toggle button icon between a '+' and an 'x'

const toggleButtonState = () => {
    let toggle = document.querySelector('.flexnav__toggler').innerHTML
    if (toggle === '+') {
        document.querySelector('.flexnav__toggler').innerHTML = '&times;';
    } else {
        document.querySelector('.flexnav__toggler').innerHTML = '&#43;';
    }
}

//Closes the submenus: Is called from MOBILE TOGGLER above & from the 'Submenus open on click for smaller screens' javaScript media query below.
const closeSubMenus = () => {
        levelTwoArr.forEach(levelTwo => {
            levelTwo.classList.remove('js--submenu-revealer');
        });
    }



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//Submenu Reset: on click outside navbar.
//
//Closes Mobile view dropdown menu if anywhere outside of the navbar (.flexnav) is clicked.

let flexNavUnorderedList = document.querySelector('.flexnav');

document.addEventListener('touchstart', function (event) {
    let isClickInside = flexNavUnorderedList.contains(event.target);
    if (!isClickInside) {
        document.querySelector('.flexnav__toggler').innerHTML = '&#43;';
        document.querySelector('.flexnav__toptab-ul').classList.remove('js--mobile-nav-revealer');
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
        document.querySelector('.flexnav__toptab-ul').classList.remove('js--mobile-nav-revealer');
    }
});



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//Submenus open on click for smaller screens

// INSTRUCTIONS:
// 1). To the <li> with class flexnav__toptab-li add these 2 classes: js--has-submenu & js--flexnav__toptab-li
// 2). To the <ul> with class flexnav__submenu add this class: js--flexnav__submenu


    //Variables:
    //create array of all top tier menu items
    let topTab = Array.from(document.querySelectorAll('.js-flexnav__toptab-li')),
    //create array of level 1 menu items that have sub-menus
        levelOneArr = Array.from(document.querySelectorAll('.js--has-submenu')),
        //create array of level 2 sub-menus
        levelTwoArr = Array.from(document.querySelectorAll('.js--flexnav__submenu'));

if (window.matchMedia("(max-width: 1023px)").matches) {
    ////////////////
    //iterate over the array of all top tier menu items
    topTab.forEach(item => {
        //add event listeners to each of them
        item.addEventListener('click', () => {
            //if one of the menu items that does NOT have a sub-menu is clicked then close/hide any open submenus
            if (item.classList.contains('js--submenu-revealer')) {
                closeSubMenus();
            }
        });
    });

    // const closeSubMenus = () => {
    //     levelTwoArr.forEach(levelTwo => {
    //         levelTwo.classList.remove('js--submenu-revealer');
    //     });
    // }

    ////////////////
    //iterate over the array of level 1 items that have sub-menus
    levelOneArr.forEach(item => {
        //add event listeners to each of them
        item.addEventListener('click', () => {
            //store the array index of the level 1 item clicked
            let index = levelOneArr.indexOf(item);
            //store the level 2 sub-menu that corresponds to the same array index value and the index value of the level 1 array that was clicked
            let subMenu = levelTwoArr[index];
            //iterate over the level 2 sub-menu array and close any that are open - before the next step of openning the one clicked
            levelTwoArr.forEach(item => {
                if (item.classList.contains('js--submenu-revealer') && levelTwoArr.indexOf(item) != index) {
                    item.classList.remove('js--submenu-revealer');
                }
            });
            //open/reveal the level 2 sub-menu
            subMenu.classList.toggle('js--submenu-revealer');
        });
    });
}

////////////////
//Closes any open sub-menus if anywhere outside of the nav menu list is clicked
// let flexNavUnorderedList = document.querySelector('.js__click-outside-to-close');

// document.addEventListener('click', function (event) {
//     let isClickInside = flexNavUnorderedList.contains(event.target);
//     if (!isClickInside) {
//         closeSubMenus();
//     }
// });



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
