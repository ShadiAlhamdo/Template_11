//Check If There IS local Color Option
let mainColors = localStorage.getItem("color_option");
if (mainColors != null) {

    //Set Color In Root
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"))
    //Remove Active Class From All Colors List item
    document.querySelectorAll(".colors-list li").forEach(ele => {

        ele.classList.remove("active");

        //Add ACtive Class On Element With Data-color===LocalStorage Item

        if (ele.dataset.color === mainColors) {
            //Add Class Active To List Item
            ele.classList.add("active");

        }
        switch (mainColors) {
            case "#FFEB3B": document.querySelector(".about-us .image-box img").src = "images/about-us-1.png"; break;
            case "#009688": document.querySelector(".about-us .image-box img").src = "images/about-us-3.png"; break;
            case "#03A9F4": document.querySelector(".about-us .image-box img").src = "images/about-us.png"; break;
            case "#ff5722": document.querySelector(".about-us .image-box img").src = "images/about-us-2.png"; break;
            case "#9c27b0": document.querySelector(".about-us .image-box img").src = "images/about-us-4.png"; break;
        }

    });
};




//Toggel Spin Class On Icon //
document.querySelector(".icon-gear").onclick = function () {
    //Toggle Class Fa Spin For Rotaion On Self
    this.classList.toggle("fa-spin");
    //Toggel Class Open On Main Box
    document.querySelector(".settings-box").classList.toggle("open");

};

//Switch Colors //
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach(li => {
    li.addEventListener("click", (e) => {
        //Set Color In Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //Set image section About Lke The Same Color
        colormain = e.target.dataset.color;
        switch (colormain) {
            case "#FFEB3B": document.querySelector(".about-us .image-box img").src = "images/about-us-1.png"; break;
            case "#009688": document.querySelector(".about-us .image-box img").src = "images/about-us-3.png"; break;
            case "#03A9F4": document.querySelector(".about-us .image-box img").src = "images/about-us.png"; break;
            case "#ff5722": document.querySelector(".about-us .image-box img").src = "images/about-us-2.png"; break;
            case "#9c27b0": document.querySelector(".about-us .image-box img").src = "images/about-us-4.png"; break;
        }
        //Set Color In LocalStorage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);

    });
});


//Random Background Option
let backgroundOption = true;

//variable To Control The Background Interval
let backgroundInterval;

//Check if There`s LocalStorage Random Backgrond ITem
let backgroundLocalitem = localStorage.getItem("bacground_option");

//Check If Local Storage Is No Empty
if (backgroundLocalitem !== null) {
    if (backgroundLocalitem === "true") {
        backgroundOption = true;
    }
    else {
        backgroundOption = false;
    }

    //Remove Active Class From All span
    document.querySelectorAll(".random-background span").forEach(e => {
        e.classList.remove("active");
    });
    if (backgroundLocalitem === "true") {
        document.querySelector(".random-background .yes").classList.add("active");
        
    }
    else if (backgroundLocalitem === "false") {
        document.querySelector(".random-background .no").classList.add("active");
        
    }
}

//Switch Background Options //
const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach(span => {
    //Click On Every Span
    span.addEventListener("click", (e) => {
        handleActive(e);//call handle Function
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeimg();
            localStorage.setItem("bacground_option", true);

        }
        else if (e.target.dataset.background === "no") {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("bacground_option", false)

        }
    });
});


// Select Landing Page Element //
let landingPage = document.querySelector(".landing-page");

//Get Array Of Images //
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "05.jpg", "04.jpg"];


// Function TO Randomize Img
function randomizeimg() {
    if (backgroundOption === true)
        backgroundInterval = setInterval(() => {

            //Get Random Number//
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //Change Background Img Url//
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';

        }, 3000);
};
randomizeimg();

//Select Skills Selector 
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};


//creat Popup With The Image
let ourGallery = document.querySelectorAll(".images-box img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {
        //creat OverLay Element 
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = "popup-overlay";

        //Append Overlay To Body
        document.body.appendChild(overlay);

        //Creat The Popup
        let popupBox = document.createElement("div");

        //Add Class To The PopupBox
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            //Create Heading
            let imgHeading = document.createElement("h3");

            //Creat Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append The Text To The Heading
            imgHeading.appendChild(imgText);

            //Append he Heading To The PopupBox
            popupBox.append(imgHeading);

        }

        //Creat The Image
        let popupImage = document.createElement("img");

        //Set Image Source
        popupImage.src = img.src;

        //Add Image yo Popup Box
        popupBox.appendChild(popupImage);

        //Append The PopupBOx To Body
        overlay.appendChild(popupBox);

        //Create Close Span
        let closeButton = document.createElement("span");

        //Create The Close Button Text
        let closeText = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(closeText);

        //Add Class To Close Button
        closeButton.className = "close-button";
        //Add Close Button To PopupBox
        popupBox.appendChild(closeButton);

    });

});

//Close Popup

document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
        //Remove The Current Popup
        e.target.parentElement.remove();

        //Remove The Overlay
        document.querySelector(".popup-overlay").remove();
    }

});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSomewhere(allBullets);//Call Function ScrollIntevew
//Sellects All Links
const allLinks = document.querySelectorAll(".header-area .links li a");
scrollToSomewhere(allLinks);//Call Function ScrollIntevew


//Scroll To Any WHere
function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

//Handle Active State

//Remove Atcive Class From All Children
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active"); 
    });
    //Add Active Class To On Self
    ev.target.classList.add("active");
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
    bulletsSpan.forEach( span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === 'show') {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = "none";
                document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
    
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option",'show')        }
        else if (span.dataset.display === "hide") {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option","hide") 
        }
        handleActive(e);
    
    });
    
});

//Reset All options
document.querySelector(".reset-options").onclick = function () {
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("bacground_option");
    //Reload Window
    window.location.reload();

};

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    //Toggle Class "menu-active " On Button
    this.classList.toggle("menu-active");
    //Toggle Class "Open" On Links
    tlinks.classList.toggle("open");
};

//Click Any Where Outside Menu And TOggle Btn
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tlinks) {
        //Check If Menu IS Open
        if (tlinks.classList.contains("open")) {
            tlinks.classList.toggle("open");
            toggleBtn.classList.toggle("menu-active")
        }
    }
});

//Stop Propagation On Menu
tlinks.onclick = function (e) {
    e.stopPropagation();
};