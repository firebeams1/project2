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

/* 音乐部分 */
let play_pause=document.querySelector('.play-pause'),
  player_track=document.querySelector('.player-track'),
  album_cover=document.querySelector('.album-cover'),
  album_name=document.querySelector('.album-name'),
  track_name=document.querySelector('.track-name'),
  track_time=document.querySelector('.track-time'),
  current_time=document.querySelector('.current-time'),
  total_time=document.querySelector('.total-time'),
  progress_box=document.querySelector('.progress-box'),
  hover_time=document.querySelector('.hover-time'),
  hover_bar=document.querySelector('.hover-bar'),
  progress_bar=document.querySelector('.progress-bar'),
  play_prev=document.querySelector('.play-prev'),
  play_next=document.querySelector('.play-next');

/* 专辑数组名 */
let albums=["本草纲目","布拉格广场","威廉古堡","晴天","七里香","告白气球"]
let track_names=["周杰伦 - 本草纲目","蔡依林周杰伦 - 布拉格广场","周杰伦 - 威廉古堡",
"周杰伦 - 晴天","周杰伦 - 七里香","周杰伦 - 告白气球"]

/* 定义变量 */
let progress_t,/* 鼠标在进度条上悬停的位置 */
    progress_loc,/* 鼠标在进度条上悬停的音频位置 */
    c_m,/* 悬停音频位置（分钟） */
    ct_minutes,/* 悬停播放位置（分钟） */
    ct_seconds,/* 悬停播放位置（秒） */
    cur_minutes,/* 当前播放位置（分钟） */
    cur_seconds,/* 当前播放位置（秒） */
    dur_minutes,/* 音频总时长（分钟）*/
    dur_seconds,/* 音频总时长（秒） */
    play_progress;/* 播放进度 */
let cur_index=-1;/* 当前歌曲下标 */

/* 初始化 */
function initPlayer(){
  audio=new Audio();
  audio.loop=false;
  selectTrack(0);
  play_pause.addEventListener('click',playPause);
  progress_box.addEventListener('mousemove',function(e){
    showHover(e);
  });
  progress_box.addEventListener('mouseout',hideHover)

  progress_box.addEventListener('click',playFromClickedPos);

  audio.addEventListener('timeupdate',updateCurTime);

  play_prev.addEventListener('click',function(){
    selectTrack(-1);
  })
  play_next.addEventListener('click',function(){
    selectTrack(1);
  })

  

}

/* 播放暂停 */
function playPause(){
  setTimeout(function(){
    if(audio.paused){
      player_track.classList.add('active');
      play_pause.querySelector('.fa').classList='fa fa-pause';
      album_cover.classList.add('active');
      audio.play();
    }
    else{
      player_track.classList.remove('active');
      play_pause.querySelector('.fa').classList='fa fa-play';
      album_cover.classList.remove('active');
      audio.pause();
    }
  },300);

}

/* 显示悬停播放位置弹层 */
function showHover(e){
  console.log(ct_minutes);
  console.log(ct_seconds);
  /* 计算鼠标在进度条上的悬停位置（当前鼠标的x坐标-进度条在窗口的left位置） */
  progress_t=e.clientX - progress_box.getBoundingClientRect().left;
  /* 计算鼠标进度条上悬停时的音频位置 */
  /* audio.duration 音频总时长 */

  progress_loc=audio.duration*(progress_t/progress_box.getBoundingClientRect().width);    
  /* 设置悬停进度条的宽度（较宽部分） */
  hover_bar.style.width=progress_t+'px'
  /* 将悬停音频位置转为分钟 */
  c_m=progress_loc /60;
  ct_minutes=Math.floor(c_m);
  ct_seconds=Math.floor(progress_loc-ct_minutes*60);

  if(ct_minutes<10){
    ct_minutes='0'+ct_minutes;
  }
  if(ct_seconds<10){
    ct_seconds='0'+ct_seconds;
  }

  if(isNaN(ct_minutes)||isNaN(ct_seconds))
  {
    hover_time.innerText='--:--';
  }
  else{
    hover_time.innerText=ct_minutes+':'+ct_seconds;
  }
/* 设置悬停播放位置弹层位置并显示 */
  hover_time.style.left=progress_t+'px';
  hover_time.style.marginLeft='-20px';
  hover_time.style.display='block';

}


/* 隐藏悬停播放位置弹层 */
function hideHover(){
  hover_bar.style.width='0px';
  hover_time.innerText='00:00';
  hover_time.style.left='0px';
  hover_time.style.marginLeft='0px';
  hover_time.style.display='none';
}
/* 从点击位置开始播放 */
function playFromClickedPos()
{/* 设置当前播放时间 */
  audio.currentTime=progress_loc;
/* 设置进度条宽度 */
  progress_bar.style.width=progress_t+'px';
/* 隐藏悬停播放位置弹层 */
  hideHover();
}


function updateCurTime()
{/* 当前播放分 */
  cur_minutes=Math.floor(audio.currentTime/60);
  /* 当前播放秒 */
  cur_seconds=Math.floor(audio.currentTime - cur_minutes*60);
  /* 音频总分 */
  dur_minutes=Math.floor(audio.duration/60);
  /* 音频总秒 */
  dur_seconds=Math.floor(audio.duration-dur_minutes*60);
  /* 计算播放进度 */
  play_progress=audio.currentTime/audio.duration*100;

  if(ct_minutes<10){
    ct_minutes='0'+ct_minutes;
  }
  if(ct_seconds<10){
    ct_seconds='0'+ct_seconds;
  }
  if(dur_minutes<10){
    dur_minutes='0'+dur_minutes;
  }
  if(dur_seconds<10){
    dur_seconds='0'+dur_seconds;
  }
/* 设置播放时间 */
  if(isNaN(cur_minutes)||isNaN(cur_seconds))
  {
    current_time.innerText='00:00';
  }
  else{
    current_time.innerText=cur_minutes+':'+cur_seconds;
  }
/* 设置总时长 */
  if(isNaN(dur_minutes)||isNaN(dur_seconds))
  {
    total_time.innerText='00:00';
  }
  else{
    total_time.innerText=dur_minutes+':'+dur_seconds;
  }
  /* 设置进度条 */
  progress_bar.style.width=play_progress+"%";
/* 播放完毕恢复样式 */
if(play_progress==100){
  play_pause.querySelector('.fa').classList='fa fa-play';
  progress_bar.style.width='0px';
  current_time.innerText='00:00';
  player_track.classList.remove('active');
  album_cover.classList.remove('active');
}


}

/* 切换歌曲（flag：0=初始），1下一首，-1上一首 */
function selectTrack(flag){
  console.log(flag);
  if(flag==0||flag==1){
    ++cur_index;
    console.log(cur_index)
  }
  else{
    --cur_index;
    console.log(cur_index)
  }
  if(cur_index>-1&&cur_index<albums.length){
    if(flag==0){
      play_pause.querySelector('.fa').classList='fa fa-play';

    }else{
      play_pause.querySelector('.fa').classList='fa fa-pause';
    }
    progress_bar.style.width='0px';
    current_time.innerText='00:00';
    total_time.innerText='00:00';
    let cur_album=albums[cur_index];
    let cur_track_name=track_names[cur_index];

    audio.src='music/'+cur_album+'.mp3';
    console.log(audio.src);
    if(flag!=0){
      audio.play();
      player_track.classList.add('active');
      album_cover.classList.add('active');
    }
    album_name.innerText=cur_album;
    track_name.innerText=cur_track_name;
    /* 设置封面 */
    album_cover.querySelector('.active').classList.remove('active');
    album_cover.getElementsByTagName('img')[cur_index].classList.add('active');
  }
  else{

    /* 切换溢出专辑数组时，恢复cur_index */
    if(flag==0||flag==1){
      --cur_index;
    }
    else{
      ++cur_index;
    }
  }
}
/*  绑定播放按钮用的*/
initPlayer();