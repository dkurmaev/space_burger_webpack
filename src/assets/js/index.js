// Импорт стилей
import "../styles/reset.scss";
import "../styles/mixins.scss";
import "../styles/colors.scss";
import "../styles/styles.scss";

// Импорт библиотеки Swiper
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import { languages } from "./languages";

Swiper.use([Navigation]);

document.addEventListener("DOMContentLoaded", function () {
  // Добавляем класс "loaded" к body
  document.body.classList.add("loaded");

  // Задержка перед добавлением класса "loading" к body
  setTimeout(() => {
    document.body.classList.add("loading");
  }, 1);

  // Через 1 секунду удаляем класс "loading" у body
  setTimeout(() => {
    document.body.classList.remove("loading");
  }, 1000);

  // Получаем кнопку "Наверх"
  const btnTop = document.getElementById("btnTop");

  // При прокрутке страницы
  window.addEventListener("scroll", function () {
    // Если прокрутка больше 20 пикселей
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      // Показываем кнопку "Наверх"
      btnTop.style.display = "block";
    } else {
      // Скрываем кнопку "Наверх"
      btnTop.style.display = "none";
    }
  });

  // При клике на кнопку "Наверх"
  btnTop.addEventListener("click", scrollToTop);
});

// Объект с чекбоксами и их значениями
const checkboxes = {
  beilagen: ["kids_burger", "kids_chicken"],
  versions: ["kids_burger", "kids_chicken"],
};

// Переменная для состояния видео (воспроизводится или на паузе)
let isPlay = false;

// Классы для управления элементами
const classes = {
  opened: "opened",
  hidden: "hidden",
  active: "active",
};

const values = [
  {
    price: 9.89,
    title: "Burgers",
  },
  {
    price: 8.89,
    title: "Kids Menü",
  },
  {
    price: 8.89,
    title: "Pommes",
  },
];

// Получаем элементы страницы
const checkbox = document.querySelectorAll(".checkbox");
const header = document.querySelector(".header");
const menuLink = document.querySelectorAll(".menu-link");
const menuButton = document.querySelector(".header-menu__button");
const video = document.getElementById("video");
const videoButton = document.querySelectorAll(".video-button");
const faqItem = document.querySelectorAll(".faq-item");
const sections = document.querySelectorAll(".section");
const language = document.querySelectorAll(".language");
const buyButton = document.querySelectorAll(".buy-button");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalTitle = document.querySelector(".modal-subtitle");
const modalPrice = document.querySelector(".modal-total__price");
const modalClose = document.querySelector(".modal-close");

// Функция для переключения меню
const toggleMenu = () => header.classList.toggle(classes.opened);

// Функция для прокрутки к разделу
const scrollToSection = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const section = href.slice(1);
  const top = document.getElementById(section).offsetTop;
  window.scrollTo({ top, behavior: "smooth" });
};

// Функция для форматирования значения таймера
const formatValue = (value) => (value < 10 ? `0${value}` : value);

// Функция для получения значений таймера
const getTimerValues = (diff) => ({
  seconds: (diff / 1000) % 60,
  minutes: (diff / (1000 * 60)) % 60,
  hours: (diff / (1000 * 60 * 60)) % 24,
  days: (diff / (1000 * 60 * 60 * 24)) % 30,
});

// Функция для установки значений таймера
const setTimerValues = (values) => {
  Object.entries(values).forEach(([key, value]) => {
    const timerValue = document.getElementById(key);
    if (timerValue) {
      timerValue.innerText = formatValue(Math.floor(value));
    }
  });
};

// Функция для запуска таймера
const startTimer = (date) => {
  const id = setInterval(() => {
    const diff = new Date(date).getTime() - new Date().getTime();
    if (diff < 365) {
      clearInterval(id);
      return;
    }
    setTimerValues(getTimerValues(diff));
  }, 1000);
};

// Функция для управления видео
const handleVideo = ({ target }) => {
  const info = target.parentElement;
  isPlay = !isPlay;
  info.classList.toggle(classes.hidden, isPlay);
  target.innerText = isPlay ? "Pause" : "Play";
  isPlay ? video.play() : video.pause();
};

// Функция для управления чекбоксами
const handleCheckbox = ({ currentTarget: { checked, name } }) => {
  const { active } = classes;
  const value = checkboxes[name][Number(checked)];
  const list = document.getElementById(value);
  const tabs = document.querySelectorAll(`[data-${name}]`);
  const siblings = list.parentElement.children;
  for (const item of siblings) item.classList.remove(active);
  for (const tab of tabs) {
    tab.classList.remove(active);
    tab.dataset[name] === value && tab.classList.add(active);
  }
  list.classList.add(active);
};

// Функция для инициализации слайдера
const initSlider = () => {
  // Код инициализации слайдера
  new Swiper(".swiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    initialSlide: 2,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

//
const handleFaqItem = ({ currentTarget: target }) => {
  target.classList.toggle(classes.opened);
  const isOpened = target.classList.contains(classes.opened);
  const height = target.querySelector("p").clientHeight;
  const content = target.querySelector(".faq-item__content");

  content.style.height = `${isOpened ? height : 0}px`;
};
// Функция для прокрутки к началу страницы
const handleScroll = () => {
  const { scrollY: y, innerHeight: h } = window;
  sections.forEach((section) => {
    if (y > section.offsetTop - h / 2) section.classList.remove(classes.hidden);
  });
};

const setTexts = () => {
  const lang = localStorage.getItem("lang") || "de";
  const content = languages[lang];

  Object.entries(content).forEach(([key, value]) => {
    const items = document.querySelectorAll(`[data-text = "${key}"]`);
    items.forEach((item) => (item.innerText = value));
  });
};

const toggleLanguage = ({ target }) => {
  const { lang } = target.dataset;

  if (!lang) return;

  localStorage.setItem("lang", lang);
  setTexts();
};

const handleBuyButton = ({ currentTarget: target }) => {
  const { value } = target.dataset;
  if (!value) return;
  const { price, title } = values[value];

  modalTitle.innerText = title;
  modalPrice.innerText = `${price} €`;
  modal.classList.add(classes.opened);
  overlay.classList.add(classes.opened);

};

const closeModal = () => {
  modal.classList.remove(classes.opened);
  overlay.classList.remove(classes.opened);
}

// Вызываем функцию инициализации слайдера
initSlider();

setTexts();

// Запускаем таймер до указанной даты
startTimer("December 31, 2024 00:00:00");

//
window.addEventListener("scroll", handleScroll);

// Добавляем обработчик клика на кнопку меню
menuButton.addEventListener("click", toggleMenu);

// Добавляем обработчики клика на кнопки видео
videoButton.forEach((btn) => btn.addEventListener("click", handleVideo));

// Добавляем обработчики клика на ссылки меню
menuLink.forEach((link) => link.addEventListener("click", scrollToSection));

// Добавляем обработчики изменения состояния чекбоксов
checkbox.forEach((box) => box.addEventListener("change", handleCheckbox));

//
faqItem.forEach((item) => item.addEventListener("click", handleFaqItem));

//
language.forEach((item) => item.addEventListener("click", toggleLanguage));

buyButton.forEach((btn) => btn.addEventListener("click", handleBuyButton));

modalClose.addEventListener("click", closeModal);
