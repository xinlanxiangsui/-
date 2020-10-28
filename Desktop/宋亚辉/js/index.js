window.onload = function () {
  /* 
    常规交互部分
  */
  let nav = document.getElementsByClassName("nav");
  for (let i = 0; i < nav.length; i++) {
    let siblings = [];
    let child = nav[i].parentNode.children;
    for (let j = 0; j < child.length; j++) {
      if (child[j] != nav[i]) {
        siblings.push(child[j]);
      }
    }

    nav[i].parentNode.onmouseover = function () {
      this.className = "nav selected";
      for (let index = 0; index < siblings.length; index++) {
        siblings[index].style.height = '37px';
      }
    }
    nav[i].parentNode.onmouseout = function () {
      this.className = "nav";
      for (let index = 0; index < siblings.length; index++) {
        siblings[index].style.height = '0';
      }
    }
  }
  let drop = document.querySelectorAll('.drop');
  for (let i = 0; i < drop.length; i++) {
    drop[i].addEventListener('mouseover', function () {
      this.classList.add('selected');
    })
    drop[i].addEventListener('mouseout', function () {
      this.classList.remove('selected');
    })
  }


  let tog1 = document.querySelectorAll('.toggle1');
  let topList = document.querySelectorAll('.con-right-top .list');
  let btmList = document.querySelectorAll('.con-right-btm .list');
  for (let i = 0; i < tog1.length; i++) {
    tog1[i].addEventListener("mouseover", function () {
      for (let j = 0; j < tog1.length; j++) {
        tog1[j].classList.remove('blue');
      }
      this.classList.add('blue');
      for (let k = 0; k < topList.length; k++) {
        topList[k].style.display = 'none';
        topList[k].classList.remove('listSelected');
      }
      topList[i].style.display = 'block';
      topList[k].classList.add('listSelected');

    })

  }
  let tog2 = document.querySelectorAll('.toggle2');
  for (let i = 0; i < tog2.length; i++) {
    tog2[i].addEventListener("mouseover", function () {
      for (let j = 0; j < tog2.length; j++) {
        tog2[j].classList.remove('blue');
      }
      this.classList.add('blue');
      for (let k = 0; k < btmList.length; k++) {
        btmList[k].style.display = 'none';
        btmList[k].classList.remove('listSelected');
      }
      btmList[i].style.display = 'block';
      btmList[k].classList.add('listSelected');

    })

  }

  /* 
    轮播图部分
  */

  let slide = document.querySelectorAll('.slide-img img');
  let ball = document.querySelectorAll('.slide-ball ul li');
  let arrow = document.querySelectorAll('.slide-arrow img');
  let shade = document.querySelector('.slide .shade');
  let flag = 1;
  let blink = 'blink1';

  // 本函数是用于在切换图片时进行短暂的闪烁效果
  // 闪烁是使用frames实现的短暂动画效果
  // 因为frames是在图片切换时再起作用，之前想的是触发点击事件后先把frames样式移除，再重新添加一遍，这样就会让它重新闪烁一遍：shade.style.animation = 'blink 1s'; shade.style.animation = '';
  // 但是这两段放一起执行的话，永远只会执行后面那段，可能是js执行机制的问题
  // 因此做了两个样式相同但名字不同frames，然后再这两个之间来回切换，就可以实现重复闪烁
  function imgBlink() {
    if (blink == 'blink1') {
      blink = 'blink2';
      shade.style.animation = 'blink2 1s';
    } else if (blink == 'blink2') {
      blink = 'blink1'
      shade.style.animation = 'blink1 1s';
    }
  }
  // 为球球绑定点击事件
  for (let i = 0; i < ball.length; i++) {
    ball[i].addEventListener('click', function () {
      imgBlink();
      clearInterval(timer);
      clean();
      slide[i].style.display = 'inline-block';
      ball[i].style.backgroundColor = '#be0a0d';
      flag = i + 1;
      reloadTimer();
    })
  }

  // 问题：为什么点击球球切换图片不需要暂停定时器，而用箭头就需要？ 解答：flag的问题，自动播放的flag是在跳转完再++的，因此点击球球切换后，定时器的flag值没变，还从当前的flag图播放一遍，然后接着轮播后面图片
  // 原来的球球点击事件：
  // for (let i = 0; i < ball.length; i++) {
  //   ball[i].addEventListener('click', function () {
  //     imgBlink();

  //     flag = i;
  //     clean();
  //     slide[flag].style.display = 'inline-block';
  //     ball[flag].style.backgroundColor = '#be0a0d';

  //   })
  // }


  // 为箭头绑定点击事件
  arrow[0].addEventListener('click', function () {
    imgBlink();
    clearInterval(timer);
    if (flag == 1) {
      flag = 6;
    } else {
      flag = flag - 1;
    }
    clean();
    slide[flag - 1].style.display = 'inline-block';
    ball[flag - 1].style.backgroundColor = '#be0a0d';
    reloadTimer();
  })
  // 右箭头
  arrow[1].addEventListener('click', function () {
    imgBlink();
    clearInterval(timer);
    if (flag >= 6) {
      flag = 1;
    } else {
      flag += 1;
    }
    clean();
    slide[flag - 1].style.display = 'inline-block';
    ball[flag - 1].style.backgroundColor = '#be0a0d';
    // 重新开启定时器
    reloadTimer();
  })

  // 定时器重启函数
  function reloadTimer() {
    timer = setInterval(function () {
      // 如果循环到第6张，则将flag置零，从新开始循环
      if (flag >= 6) {
        flag = 0;
      }
      clean();
      // 这样的写法会导致每2秒必闪一次，不管图片是否切换
      // 当第flag张图片设置为可见
      imgBlink();
      slide[flag].style.display = 'inline-block';
      // 将第flag个球设置为红色
      ball[flag].style.backgroundColor = '#be0a0d';
      // flag++
      flag += 1;
    }, 2000);
  }
  // 轮播定时器
  let timer = setInterval(function () {
    // 如果循环到第6张，则将flag置零，从新开始循环
    if (flag >= 6) {
      flag = 0;
    }
    clean();
    // 这样的写法会导致每2秒必闪一次，不管图片是否切换
    // 当第flag张图片设置为可见
    imgBlink();
    slide[flag].style.display = 'inline-block';
    // 将第flag个球设置为红色
    ball[flag].style.backgroundColor = '#be0a0d';
    // flag++
    flag += 1;
  }, 2000);

  function clean() {
    // 先将所有图片设置不可见
    for (let j = 0; j < slide.length; j++) {
      slide[j].style.display = 'none';
    }
    // 将所有球球设置为白色
    for (let j = 0; j < ball.length; j++) {
      ball[j].style.backgroundColor = '#fff';
    }
  }
}
