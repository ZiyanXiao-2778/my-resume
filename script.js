/* ============================================================
   script.js — 肖子言个人简历网站
   功能: 移动端菜单 · 滚动淡入动画 · 一键复制
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ========== 元素引用 ========== */
  var hamburger = document.getElementById("hamburger");
  var navLinks  = document.getElementById("navLinks");

  /* ========== 移动端菜单切换 ========== */
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  /* 点击导航链接后自动关闭菜单 */
  var links = navLinks.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ========== 滚动淡入动画 (IntersectionObserver) ========== */
  var fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* 低版本浏览器降级：直接显示 */
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* 首屏封面立即触发 */
  var heroEl = document.querySelector(".hero .fade-in");
  if (heroEl) {
    heroEl.classList.add("visible");
  }

  /* ========== 联系方式一键复制 ========== */
  var copyPhone = document.getElementById("copyPhone");
  var copyEmail = document.getElementById("copyEmail");

  if (copyPhone) {
    copyPhone.addEventListener("click", function () {
      copyText("13786866259", copyPhone);
    });
  }

  if (copyEmail) {
    copyEmail.addEventListener("click", function () {
      copyText("2048936559@qq.com", copyEmail);
    });
  }

  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * @param {HTMLElement} el  - 触发元素（用于显示"已复制"提示）
   */
  function copyText(text, el) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied(el);
      }).catch(function () {
        fallbackCopy(text, el);
      });
    } else {
      fallbackCopy(text, el);
    }
  }

  /** 降级复制方案（兼容旧浏览器） */
  function fallbackCopy(text, el) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showCopied(el);
    } catch (e) {
      /* 复制失败，静默处理 */
    }
    document.body.removeChild(textarea);
  }

  /** 显示"已复制"提示并在 1.8 秒后隐藏 */
  function showCopied(el) {
    el.classList.add("copied");
    setTimeout(function () {
      el.classList.remove("copied");
    }, 1800);
  }

});
