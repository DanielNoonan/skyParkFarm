'use strict'

//VERSION 1.0 THAT OPENED AND CLOSE ON CLICK

//////////////////////////////
//Toggle level two sub-menus//
//////////////////////////////

//Variables:
//create array of level 1 menu items that have sub-menus
let levelOneArr = Array.from(document.querySelectorAll('.flex-nav__has-sub-menu')),
    //create array of level 2 sub-menus
    levelTwoArr = Array.from(document.querySelectorAll('.flex-nav__ul-level-2')),
    //create array of all top tier menu items
    topTier = Array.from(document.querySelectorAll('.js-top-tier'));

////////////////
//iterate over the array of all top tier menu items
topTier.forEach(item => {
    //add event listeners to each of them
    item.addEventListener('click', () => {
        //if one of the menu items that does NOT have a sub-menu is clicked then close/hide any open sub menues
        if (item.classList.contains('flex-nav__has-sub-menu') === false) {
            closeSubMenus();
        }
    });
});

const closeSubMenus = () => {
    levelTwoArr.forEach(levelTwo => {
        levelTwo.classList.add('js-hide-sub-menu');
    });
}

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
            if (item.classList.contains('js-hide-sub-menu') === false && levelTwoArr.indexOf(item) != index) {
                item.classList.add('js-hide-sub-menu');
            }
        });
        //open/reveal the level 2 sub-menu
        subMenu.classList.toggle('js-hide-sub-menu');
    })
})


////////////////
//Closes any open sub-menus if anywhere outside of the nav menu list is clicked
let flexNavUnorderedList = document.querySelector('.js__click-outside-to-close');

document.addEventListener('click', function (event) {
    let isClickInside = flexNavUnorderedList.contains(event.target);
    if (!isClickInside) {
        closeSubMenus();
    }
});
