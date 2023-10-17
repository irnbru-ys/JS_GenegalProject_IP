"use strict";

window.addEventListener("DOMContentLoaded", () => {
    //  Tabes

    const page = {
        previewTabs: {
            tabs: document.querySelectorAll(".tabheader__item"),
            tabsContent: document.querySelectorAll(".tabcontent"),
            tabsParent: document.querySelector(".tabheader__items"),
        },
    };

    function hideTabContent() {
        page.previewTabs.tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        page.previewTabs.tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        page.previewTabs.tabsContent[i].classList.add("show", "fade");
        page.previewTabs.tabsContent[i].classList.remove("hide");
        page.previewTabs.tabs[i].classList.add("tabheader__item_active");
    }

    page.previewTabs.tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            page.previewTabs.tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

 
    (() => {
        //  Tabes
        hideTabContent();
        showTabContent(0);
    })();
});
