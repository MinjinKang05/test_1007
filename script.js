'use strict';

// 스크롤 방향에 따라 헤더 숨기기/보이기
let lastScrollY = 0;
const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  header.classList.toggle('scrolled', currentScrollY > headerHeight);
  if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScrollY = currentScrollY;
});

// "맨 위로" 버튼 기능
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  arrowUp.classList.toggle('show', window.scrollY > window.innerHeight / 2);
});
arrowUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Works 섹션 필터링 기능
const workCategories = document.querySelector('.work__categories');
const projectsContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

if (workCategories) {
    workCategories.addEventListener('click', (e) => {
      const button = e.target.closest('.category__btn');
      if (!button) return;
      const filter = button.dataset.filter;
      if (filter == null) return;
      
      document.querySelector('.category__btn.active').classList.remove('active');
      button.classList.add('active');

      projectsContainer.classList.add('anim-out');
      setTimeout(() => {
        projects.forEach((project) => {
          project.classList.toggle('hidden', !(filter === '*' || filter === project.dataset.type));
        });
        projectsContainer.classList.remove('anim-out');
      }, 300);
    });
}

// Intersection Observer를 이용한 통합 스크롤 관리
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.header__menu__item');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const link = document.querySelector(`.header__menu__item[href="#${entry.target.id}"]`);
      if (link) {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => scrollObserver.observe(section));

window.addEventListener('load', () => {
    document.querySelector('.header__menu__item[href="#home"]').classList.add('active');
});

// 파티클 배경 애니메이션 스크립트
if (window.particlesJS) {
  particlesJS('particle-canvas', {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 }},
      "color": { "value": "#64ffda" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#8892b0", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_opacity": 1 },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
}

// [추가] 모바일 햄버거 메뉴 기능
const headerNav = document.querySelector('.header__nav');
const headerToggle = document.querySelector('.header__toggle');
const menuItems = document.querySelectorAll('.header__menu__item');

if(headerToggle) {
    headerToggle.addEventListener('click', () => {
      headerNav.classList.toggle('visible');
      // [개선] 메뉴 아이콘 변경 (menu <-> close)
      const icon = headerToggle.querySelector('.material-symbols-outlined');
      icon.textContent = headerNav.classList.contains('visible') ? 'close' : 'menu';
    });
}

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    headerNav.classList.remove('visible');
    const icon = headerToggle.querySelector('.material-symbols-outlined');
    icon.textContent = 'menu';
  });
});