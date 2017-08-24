# 说明

- 参考：http://www.zhangxinxu.com/wordpress/2017/08/iframe-html5-blob-code-view/
- 核心功能：
    - 例子演示了如何通过`Blob`和`iframe.src = URL.createObjectURL(blob);`这样的方式，动态创建出一个可以预览html的iframe
    - 因为url是blob,所以不存在跨域问题，所以第二个按钮演示了`parent`可直接访问到`内部iframe`的全局变量

    > 这个特性产生了很多想象空间，比如可以对iframe内外的object做同步，来实现一些可视化编辑的功能。

# 使用

打开页面，然后输入框里输入下面的html+css,点击查看按钮

``` html

<style>
    html {
        height: 100vh;
    }
    body {
        height: inherit;
        background: #2e576b;
        display: -ms-grid;
        display: grid;
    }
    .container {
        margin: auto;
    }
    .card {
        position: relative;
        width: 300px; height: 350px;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 15px 3px rgba(0, 0, 0, 0.08);
        overflow: hidden;
    }
    .card::after {
        content: '';
        display: block;
        width: 100%;  height: 100%;
        background: linear-gradient(to bottom, #0065a8, rgba(221, 238, 255, 0.4) 46%, rgba(255, 255, 255, 0.5));
    }
    .wave {
        position: absolute;
        top: 3%; left: 50%;
        width: 400px;  height: 400px;
        margin-top: -200px; margin-left: -200px;
        background: #0af;
        border-radius: 40%;
        opacity: .4;
        animation: shift 3s infinite linear;
    }
    .wave.w2 {
        background: yellow;
        opacity: .1;
        animation: shift 7s infinite linear;
    }
    .wave.w3 {
        animation: shift 5s infinite linear;
        background: crimson;
        opacity: 0.1;
    }
    @-webkit-keyframes shift {
        from {
            transform: rotate(360deg);
        }
    }
    @keyframes shift {
        from {
            transform: rotate(360deg);
        }
    }
</style>

<div class="container">
    <div class="card">
        <div class="wave w1"></div>
        <div class="wave w2"></div>
        <div class="wave w3"></div>
    </div>
</div>

<script>
 window.in = 'haha';
 alert("inner window has 'window.in' = 'haha'");
  </script>

```

