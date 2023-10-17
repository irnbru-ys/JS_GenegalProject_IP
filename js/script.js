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

    //Timer
    const deadline = "2023-10-16";

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = hours = minutes = seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    // Modal

    const findModal = document.querySelectorAll("[data-modal]");
    const showModal = document.querySelector(".modal");
    const hideModal = document.querySelector("[data-close]");

    function openModal() {
        showModal.classList.add("show");
        showModal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // clearInterval(madalTimerId);
    }

    findModal.forEach((el) => {
        el.addEventListener("click", openModal);
    });

    function closeModal() {
        showModal.classList.add("hide");
        showModal.classList.remove("show");
        document.body.style.overflow = "visible";
    }

    hideModal.addEventListener("click", closeModal);

    showModal.addEventListener("click", (event) => {
        if (event.target === showModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && showModal.classList.contains("show")) {
            closeModal();
        }
    });

    // const madalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (
            window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    (() => {
        //  Tabes
        hideTabContent();
        showTabContent(0);

        //Timer
        setClock(".timer", deadline);
    })();
});
