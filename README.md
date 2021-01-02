# A Vue.js drag plugin
## Support
- Vue.js : `2.x`
- Browser: only work in Desktop browser,will consider Mobile browser in the future version

## Installation
`npm i vue-drag-plugin`
## Usage
### Configuartion
you need to import plugin in your `main.js`

```javascript
import Vue from 'vue'
import VueDragPlugin from "vue-drag-plugin"
Vue.use(VueDragPlugin)
```
set the css property `width` and `height` to limit the space that maybe be manipulated on ,for example:
```html
<v-drag style="width:800px;height:200px;">
```
### Props
|  name   | type  | description  |
|  ----  | ----  | ----  |
| visible  | required:`boolean` | visibility of the drag shape |
| drawEnable  | optional:`boolean` | whether or not you can draw a new shape with mouse in the blank,default:`false` |
| selectWidth  | optional:`number` | width of the drag shape,default:`0` |
| selectHeight  | optional:`number` | width of the drag shape,default:`0` |
| offsetLeft  | optional:`number` | offset relative to the plugin 's X axis,default:`0`  |
| offsetTop  |  optional:`number` | offset relative to the plugin 's Y axis,default:`0`  |
### Events
|  name   | params  | description  |
|  ----  | ----  | ----  |
| onShapeDrag  | the new size、position of shape | when shape has been draged |
| onShapeResize  | the new size、position of shape | when shape has been resized |
| onShapeDraw  | the new size、position of shape | when a new shape created |
## Examples
you can checkout [Demo](https://anderlaw.github.io/vue-drag-plugin/example/index.html) here
