const wrapper = document.querySelector('.sliderWrapper');
const menuItems = document.querySelectorAll('.menuItem');

const currentProductTitle = document.querySelector('.productTitle');
const currentProductImg = document.querySelector('.productImg');
const currentProductPrice = document.querySelector('.productPrice');
const currentProductColors = document.querySelectorAll('.color');
const currentProductSizes = document.querySelectorAll('.size');

//产品数据
const products = [
  {
    id: 1,
    title: '跑鞋',
    price: 298,
    colors: [
      {
        code: 'salmon',
        img: './img/shoes/paoxie1.png',
      },
      {
        code: 'black',
        img: './img/shoes/paoxie2.png',
      },
    ],
  },
  {
    id: 2,
    title: '休闲鞋',
    price: 198,
    colors: [
      {
        code: 'lightgray',
        img: './img/shoes/xiuxian1.png',
      },
      {
        code: 'white',
        img: './img/shoes/xiuxian2.png',
      },
    ],
  },
  {
    id: 3,
    title: '篮球鞋',
    price: 328,
    colors: [
      {
        code: 'salmon',
        img: './img/shoes/lanqiu1.png',
      },
      {
        code: 'darkcyan',
        img: './img/shoes/lanqiu3.png',
      },
    ],
  },
  {
    id: 4,
    title: '板鞋',
    price: 168,
    colors: [
      {
        code: 'white',
        img: './img/shoes/banxie1.png',
      },
      {
        code: 'burlywood',
        img: './img/shoes/banxie2.png',
      },
    ],
  },
  {
    id: 5,
    title: '户外综训鞋',
    price: 428,
    colors: [
      {
        code: 'gray',
        img: './img/shoes/huaxue1.png',
      },
      {
        code: 'black',
        img: './img/shoes/huaxue2.png',
      },
    ],
  },
];
//显示默认产品
let choosenProduct = products[0];

//导航菜单栏
menuItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    //移动滑块
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //更新产品
    choosenProduct = products[index];

    //同步产品详情
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = '¥' + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //产品颜色同步
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

//切换产品颜色
currentProductColors.forEach((color, index) => {
  color.addEventListener('click', () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

//设置尺寸样式
currentProductSizes.forEach((size, index) => {
  size.addEventListener('click', () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = 'white';
      size.style.color = 'black';
    });
    size.style.backgroundColor = 'black';
    size.style.color = 'white';
  });
});
