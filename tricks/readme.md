# What is 'tricks'

some useful skills to implement special effects/features.

# tricks list

## hacks

- [IE-hacks]()

IE条件注释Hack：IE条件注释是微软从IE5开始就提供的一种非标准逻辑语句。比如针对所有IE：<!–[if IE]><!–您的代码–><![endif]–>，针对IE7以下版本：<!–[if lt IE 7]><!–您的代码–><![endif]–>，这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都 会生效。
PS：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。可以通过IE条件注释载入不同的CSS、JS、HTML和服务器代码等。


``` html
/* CSS选择符级Hack */
*html #demo { color:red;} /* 仅IE6 识别 */
*+html #demo { color:red;} /* 仅IE7 识别 */
body:nth-of-type(1) #demo { color:red;} /* IE9+、FF3.5+、Chrome、Safari、Opera 可以识别 */
head:first-child+body #demo { color:red; } /* IE7+、FF、Chrome、Safari、Opera 可以识别 */
:root #demo { color:red\9; } : /* 仅IE9识别 */

/* IE条件注释Hack */
<!--[if IE]>此处内容只有IE可见<![endif]-->
<!--[if IE 6]>此处内容只有IE6.0可见<![endif]-->
<!--[if IE 7]>此处内容只有IE7.0可见<![endif]-->
<!--[if !IE 7]>此处内容只有IE7不能识别，其他版本都能识别，当然要在IE5以上。<![endif]-->
<!--[if gt IE 6]> IE6以上版本可识别,IE6无法识别 <![endif]-->
<!--[if gte IE 7]> IE7以及IE7以上版本可识别 <![endif]-->
 <!--[if lt IE 7]> 低于IE7的版本才能识别，IE7无法识别。 <![endif]-->
  <!--[if lte IE 7]> IE7以及IE7以下版本可识别<![endif]-->
  <!--[if !IE]>此处内容只有非IE可见<![endif]-->
```

## layout

- [center horizontally with margin-auto](https://wbpmrck.github.io/css-layout-study/tricks/margin-auto-center/demo.html)

    > 使用margin-auto实现水平居中

```css
     div {
     	position: absolute;
     	width: 300px;
     	height: 300px;
     	margin: auto;
     	top: 0;
     	left: 0;
     	bottom: 0;
     	right: 0;
     	background-color: pink;	/* 方便看效果 */
     }

```


- (ing)[css-percent-padding-image-layout](https://wbpmrck.github.io/css-layout-study/tricks/css-percent-padding-image-layout/demo.html)

    > CSS百分比padding实现比例固定图片自适应布局

- (ing)[margin-in-BFC]()

    > 在1个BFC中，使用margin属性，可

- (ing)[multy-col-height-ajust]()

    > "css多列等高"，可参考[1](http://www.cnblogs.com/2050/archive/2012/07/31/2616460.html),[2](https://codepen.io/yangbo5207/post/equh)
## shapes

- [draw a circle with "border-radius"](https://wbpmrck.github.io/css-layout-study/tricks/round-with-border-radius/demo.html)

    > 块的顶部外边距和底部外边距有时被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为外边距塌陷(margin collapsing)，有的地方翻译为外边距合并。

      发生外边距塌陷的三种基本情况:

      - 相邻的兄弟姐妹元素

      - 块级父元素与其第一个/最后一个子元素

       > 如果块级父元素中，不存在上边框、上内边距、内联元素、 清除浮动 这四条属性（也可以说，当上边框宽度及上内边距距离为0时），那么这个块级元素和其第一个子元素的上边距就可以说”挨到了一起“。此时这个块级父元素和其第一个子元素就会发生上外边距合并现象，换句话说，此时这个父元素对外展现出来的外边距将直接变成这个父元素和其第一个子元素的margin-top的较大者。
        类似的，若块级父元素的 margin-bottom 与它的最后一个子元素的margin-bottom 之间没有父元素的 border、padding、inline content、height、min-height、 max-height 分隔时，就会发生 下外边距合并 现象。



## loadings

- [simple dot loading](https://wbpmrck.github.io/css-layout-study/tricks/loading/demo.html)

    > 简易的纯cssloading

## code preview

- [iframe-html5-blob-code-view](https://wbpmrck.github.io/css-layout-study/tricks/iframe-html5-blob-code-view/demo.html)

    > iframe和HTML5 blob实现JS,CSS,HTML直接当前页预览

