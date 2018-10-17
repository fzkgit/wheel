export function lazyLoad(el){
  /**
   * 判断元素是否出现在视口中
   * @param {*} ele
   * @returns
   */
  function inView(ele){
    let rect = ele.getBoundingClientRect();
    if (rect.left > 0 && rect.left < window.innerWidth && rect.top > -100 && rect.top < window.innerHeight + 20){
        return true;
    }
    return false;
  }

  /**
   * 判断图片是否已经加载
   * @param {*} ele
   * @returns
   */
  function isDeal(ele){
    return ele.src == ele.dataset.src;
  }

  function deal(){
    let nodes = [...document.querySelectorAll('img[data-src]')];
    nodes.forEach((item)=>{
      //设置默认图片
      item.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539265163944&di=949a5b2842683f097b7cc9ded38673cb&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cddc57a93f670000018c1bff1e12.gif'
      if (inView(item) && !isDeal(item)){
          item.src = item.dataset.src;
      }
    })
  }
  deal()
  if (el){
    document.querySelector(el).addEventListener('scroll', deal);
  }else{
    window.onscroll = deal;
  }
}