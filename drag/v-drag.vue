<template>
  <div class="root">
    <div
      v-show="selectVisible"
      class="select-frame"
      v-bind:style="{
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
      }"
    >
      <!-- dashed line -->
      <div class="dashed-line">
        <div class="inner-line-v1"></div>
        <div class="inner-line-v2"></div>
        <div class="inner-line-h1"></div>
        <div class="inner-line-h2"></div>
      </div>
      <!-- handle-box -->
      <div class="handle-box">
        <!-- handle line -->
        <div class="resize-line left"></div>
        <div class="resize-line right"></div>
        <div class="resize-line top"></div>
        <div class="resize-line bottom"></div>
        <!-- handle corner--->
        <div class="resize-corner top-left"></div>
        <div class="resize-corner top-right"></div>
        <div class="resize-corner bottom-left"></div>
        <div class="resize-corner bottom-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 1.
 */
export default {
  name: "v-drag",
  props: {
    selectWidth: Number,
    selectHeight: Number,
    selectVisible: Boolean,
    offsetLeft: Number,
    offsetTop: Number,
    allowDraw: Boolean,
  },
  data() {
    return {
      workWidth: 0,
      workHeight: 0,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    };
  },
  watch: {
    selectWidth(newVal) {
      this.width = newVal;
    },
    selectHeight(newVal) {
      this.height = newVal;
    },
    offsetLeft(newVal) {
      this.left = newVal;
    },
    offsetTop(newVal) {
      this.top = newVal;
    },
  },
  methods: {
    initEvent() {
      //拖拽、改变位置、大小事件
      //绘制选取事件
      this.registerDrawSelectEvent();
      this.registerDragSelectEvent();
    },
    /**
     * @resizeType left,top,right,bottom
     * @offsetObject { offsetX,offsetY }
     * @cacheProps { cacheWidth,cacheHeight,cacheLeft,cacheTop }
     */
    handleResizeLineEvent(resizeType, offsetObject, cacheProps) {
      switch (resizeType) {
        case "left":
          var minOffsetX = -cacheProps.cacheLeft;
          var maxOffsetY = cacheProps.cacheWidth;
          if (offsetObject.offsetX <= minOffsetX) {
            //左边界
            this.left = 0;
            this.width = cacheProps.cacheWidth + cacheProps.cacheLeft;
          } else if (offsetObject.offsetX >= maxOffsetY) {
            //右边界
            this.left = cacheProps.cacheLeft + cacheProps.cacheWidth - 8;
            this.width = 8;
          } else {
            //正常情况
            this.left = cacheProps.cacheLeft + offsetObject.offsetX;
            this.width = cacheProps.cacheWidth - offsetObject.offsetX;
          }
          break;
        case "top":
          var minOffsetY = -cacheProps.cacheTop;
          var maxOffsetY = cacheProps.cacheHeight;
          if (offsetObject.offsetY <= minOffsetY) {
            this.top = 0;
            this.height = cacheProps.cacheHeight + cacheProps.cacheTop;
          } else if (offsetObject.offsetY >= maxOffsetY) {
            this.top = cacheProps.cacheHeight + cacheProps.cacheTop - 8;
            this.height = 8;
          } else {
            //正常情况
            this.top = cacheProps.cacheTop + offsetObject.offsetY;
            this.height = cacheProps.cacheHeight - offsetObject.offsetY;
          }
          break;
        case "right":
          var minOffsetX = -cacheProps.cacheWidth;
          var maxOffsetX =
            this.workWidth - cacheProps.cacheLeft - cacheProps.cacheWidth;
          if (offsetObject.offsetX <= minOffsetX) {
            //左边界
            this.width = 8;
          } else if (offsetObject.offsetX >= maxOffsetX) {
            //右边界
            this.width = this.workWidth - cacheProps.cacheLeft;
          } else {
            //正常情况
            //正常情况
            this.width = cacheProps.cacheWidth + offsetObject.offsetX;
          }
          break;
        case "bottom":
          var minOffsetY = -cacheProps.cacheHeight;
          var maxOffsetY =
            this.workHeight - cacheProps.cacheTop - cacheProps.cacheHeight;
          if (offsetObject.offsetY >= maxOffsetY) {
            this.height = this.workHeight - cacheProps.cacheTop;
          } else if (offsetObject.offsetY <= minOffsetY) {
            this.height = 8;
          } else {
            //正常情况
            this.height = cacheProps.cacheHeight + offsetObject.offsetY;
          }
          break;
      }
    },
    /**
     * @resizeType top-left,top-right,bottom-right,bottom-left
     * @offsetObject { offsetX,offsetY }
     * @cacheProps { cacheWidth,cacheHeight,cacheLeft,cacheTop }
     */
    handleResizeCornerEvent(resizeType, offsetObject, cacheProps) {
      switch (resizeType) {
        case "top-left":
          var minOffsetX = -cacheProps.cacheLeft;
          var maxOffsetX = cacheProps.cacheWidth;
          var minOffsetY = -cacheProps.cacheTop;
          var maxOffsetY = cacheProps.cacheHeight;

          this.left = cacheProps.cacheLeft + offsetObject.offsetX;
          this.top = cacheProps.cacheTop + offsetObject.offsetY;
          this.width = cacheProps.cacheWidth - offsetObject.offsetX;
          this.height = cacheProps.cacheHeight - offsetObject.offsetY;
          //x
          if (offsetObject.offsetX <= minOffsetX) {
            this.left = 0;
            this.width = cacheProps.cacheLeft + cacheProps.cacheWidth;
          } else if (offsetObject.offsetX >= maxOffsetX) {
            this.width = 8;
            this.left = cacheProps.cacheLeft + cacheProps.cacheWidth - 8;
          }
          //y
          if (offsetObject.offsetY <= minOffsetY) {
            this.height = cacheProps.cacheTop + cacheProps.cacheHeight;
            this.top = 0;
          } else if (offsetObject.offsetY >= maxOffsetY) {
            this.top = cacheProps.cacheTop + cacheProps.cacheHeight - 8;
            this.height = 8;
          }
          break;
        case "top-right":
          var minOffsetX = -cacheProps.cacheWidth;
          var minOffsetY = -cacheProps.cacheTop;
          var maxOffsetX =
            this.workWidth - cacheProps.cacheWidth - cacheProps.cacheLeft;
          var maxOffsetY = cacheProps.cacheHeight;

          this.width = cacheProps.cacheWidth + offsetObject.offsetX;
          this.top = cacheProps.cacheTop + offsetObject.offsetY;
          this.height = cacheProps.cacheHeight - offsetObject.offsetY;
          //x
          if (offsetObject.offsetX <= minOffsetX) {
            this.width = 8;
          } else if (offsetObject.offsetX >= maxOffsetX) {
            this.width = cacheProps.cacheWidth + maxOffsetX;
          }
          //y
          if (offsetObject.offsetY <= minOffsetY) {
            this.top = 0;
            this.height = cacheProps.cacheTop + cacheProps.cacheHeight;
          } else if (offsetObject.offsetY >= maxOffsetY) {
            this.height = 8;
            this.top = cacheProps.cacheTop + cacheProps.cacheHeight - 8;
          }

          break;
        case "bottom-right":
          var minOffsetX = -cacheProps.cacheWidth;
          var maxOffsetX =
            this.workWidth - cacheProps.cacheWidth - cacheProps.cacheLeft;
          var minOffsetY = -cacheProps.cacheHeight;
          var maxOffsetY =
            this.workHeight - cacheProps.cacheHeight - cacheProps.cacheTop;

          this.width = cacheProps.cacheWidth + offsetObject.offsetX;
          this.height = cacheProps.cacheHeight + offsetObject.offsetY;
          //x
          if (offsetObject.offsetX <= minOffsetX) {
            this.width = 8;
          } else if (offsetObject.offsetX >= maxOffsetX) {
            this.width = cacheProps.cacheWidth + maxOffsetX;
          }
          //y
          if (offsetObject.offsetY <= minOffsetY) {
            this.height = 8;
          } else if (offsetObject.offsetY >= maxOffsetY) {
            this.height = cacheProps.cacheHeight + maxOffsetY;
          }
          break;
        case "bottom-left":
          var minOffsetX = -cacheProps.cacheLeft;
          var maxOffsetX = cacheProps.cacheWidth;
          var minOffsetY = -cacheProps.cacheHeight;
          var maxOffsetY =
            this.workHeight - cacheProps.cacheHeight - cacheProps.cacheTop;

          this.left = cacheProps.cacheLeft + offsetObject.offsetX;
          this.width = cacheProps.cacheWidth - offsetObject.offsetX;
          this.height = cacheProps.cacheHeight + offsetObject.offsetY;
          //x
          if (offsetObject.offsetX <= minOffsetX) {
            this.left = 0;
            this.width = cacheProps.cacheWidth + cacheProps.cacheLeft;
          } else if (offsetObject.offsetX >= maxOffsetX) {
            this.width = 8;
            this.left = cacheProps.cacheLeft + cacheProps.cacheWidth - 8;
          }
          //y
          if (offsetObject.offsetY <= minOffsetY) {
            this.height = 8;
          } else if (offsetObject.offsetY >= maxOffsetY) {
            this.height = cacheProps.cacheHeight + maxOffsetY;
          }
          break;
      }
    },
    /**
     * @offsetObject { offsetX,offsetY }
     * @cacheProps { cacheWidth,cacheHeight,cacheLeft,cacheTop }
     */
    handleDragEvent(offsetObject, cacheProps) {
      const minOffsetX = -cacheProps.cacheLeft;
      const maxOffsetX =
        this.workWidth - cacheProps.cacheWidth - cacheProps.cacheLeft;
      const minOffsetY = -cacheProps.cacheTop;
      const maxOffsetY =
        this.workHeight - cacheProps.cacheHeight - cacheProps.cacheTop;
      //处理边界情况
      if (offsetObject.offsetX <= minOffsetX) {
        this.left = 0;
      } else if (offsetObject.offsetX >= maxOffsetX) {
        this.left = this.workWidth - cacheProps.cacheWidth;
      } else {
        this.left = cacheProps.cacheLeft + offsetObject.offsetX;
      }
      //处理边界情况
      if (offsetObject.offsetY <= minOffsetY) {
        this.top = 0;
      } else if (offsetObject.offsetY >= maxOffsetY) {
        this.top = this.workHeight - cacheProps.cacheHeight;
      } else {
        this.top = cacheProps.cacheTop + offsetObject.offsetY;
      }
    },
    registerDrawSelectEvent() {
      this.$el.addEventListener("mousedown", (outerEvent) => {
        var isRoot = outerEvent.target.classList.contains("root");
        //return in case it is from children node ,not from the root node
        if (!isRoot) {
          return;
        }
        //return if allowDraw not allowed!
        if (!this.allowDraw) {
          return;
        }

        //reset the size of the existing properties of the select frame
        this.width = this.height = this.left = this.top = 0;

        this.left = outerEvent.clientX - this.$el.getBoundingClientRect().left;
        this.top = outerEvent.clientY - this.$el.getBoundingClientRect().top;
        
        //handle boundary situation
        var maxWidth = this.workWidth - this.left;
        var maxHeight = this.workHeight - this.top;
        //over
        
        const moveFn = (innerEvent) => {
          this.width = Math.min(maxWidth,innerEvent.clientX - outerEvent.clientX);
          this.height = Math.min(innerEvent.clientY - outerEvent.clientY,maxHeight);
        };
        const upFn = () => {
          document.removeEventListener("mousemove", moveFn);
          document.removeEventListener("mouseup", upFn);
          this.$el.removeEventListener("mouseup", upFn);
          this.$emit("onDraw", {
            width: this.width,
            height: this.height,
            left: this.left,
            top: this.top,
          });
        };
        document.addEventListener("mousemove", moveFn);
        document.addEventListener("mouseup", upFn);
        this.$el.addEventListener("mouseup", upFn);
      });
    },
    registerDragSelectEvent() {
      //四条边
      //四个角落
      //拖拽改变位置
      this.$el
        .querySelector(".handle-box")
        .addEventListener("mousedown", (outerEvent) => {
          outerEvent.preventDefault();
          const classList = event.target.classList;

          const cacheLeft = this.left;
          const cacheTop = this.top;
          const cacheWidth = this.width;
          const cacheHeight = this.height;

          const mouseMoveFn = (innerEvent) => {
            if (classList.contains("handle-box")) {
              //本体：select-frame
              this.handleDragEvent(
                {
                  offsetX: innerEvent.clientX - outerEvent.clientX,
                  offsetY: innerEvent.clientY - outerEvent.clientY,
                },
                {
                  cacheLeft,
                  cacheTop,
                  cacheWidth,
                  cacheHeight,
                }
              );
            } else if (classList.contains("resize-line")) {
              //四条边：resize-line
              //type,offsetProps,cacheObject
              const type = classList.contains("left")
                ? "left"
                : classList.contains("top")
                ? "top"
                : classList.contains("right")
                ? "right"
                : classList.contains("bottom")
                ? "bottom"
                : "";
              this.handleResizeLineEvent(
                type,
                {
                  offsetX: innerEvent.clientX - outerEvent.clientX,
                  offsetY: innerEvent.clientY - outerEvent.clientY,
                },
                {
                  cacheLeft,
                  cacheTop,
                  cacheWidth,
                  cacheHeight,
                }
              );
            } else if (classList.contains("resize-corner")) {
              //四个角落：resize-corner
              //type,offsetProps,cacheObject
              const type = classList.contains("top-left")
                ? "top-left"
                : classList.contains("top-right")
                ? "top-right"
                : classList.contains("bottom-left")
                ? "bottom-left"
                : classList.contains("bottom-right")
                ? "bottom-right"
                : "";
              this.handleResizeCornerEvent(
                type,
                {
                  offsetX: innerEvent.clientX - outerEvent.clientX,
                  offsetY: innerEvent.clientY - outerEvent.clientY,
                },
                {
                  cacheLeft,
                  cacheTop,
                  cacheWidth,
                  cacheHeight,
                }
              );
            }
          };
          const mouseUpFn = () => {
            document.removeEventListener("mousemove", mouseMoveFn);
            this.$el
              .querySelector(".handle-box")
              .removeEventListener("mouseup", mouseUpFn);
            document.removeEventListener("mouseup", mouseUpFn);

            //emit size or position changed event
            this.$emit("onChange", {
              width: this.width,
              height: this.height,
              left: this.left,
              top: this.top,
            });
          };

          document.addEventListener("mousemove", mouseMoveFn);
          this.$el
            .querySelector(".handle-box")
            .addEventListener("mouseup", mouseUpFn);
          document.addEventListener("mouseup", mouseUpFn);
        });
    },
  },
  mounted() {
    const style = getComputedStyle(this.$el);
    this.workWidth = parseFloat(style.width);
    this.workHeight = parseFloat(style.height);
    this.initEvent();
    //应该有size、position改变得事件分发
    //应该有选框新建得事件分发
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.root {
  position: relative;
  border: 1px solid #ccc;
  .select-frame {
    cursor: move;
    position: absolute;
    .dashed-line {
      position: absolute;
      width: 100%;
      height: 100%;
      [class^="inner-line"] {
        position: absolute;
        background-color: #ccc;
      }
      .inner-line-v1 {
        left: 33.33%;
        width: 1px;
        height: 100%;
      }
      .inner-line-v2 {
        left: 66.66%;
        width: 1px;
        height: 100%;
      }
      .inner-line-h1 {
        top: 33.33%;
        height: 1px;
        width: 100%;
      }
      .inner-line-h2 {
        top: 66.66%;
        height: 1px;
        width: 100%;
      }
    }
    .handle-box {
      position: absolute;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid #39f;
      .resize-line {
        position: absolute;
        opacity: 0.1;
        background-color: #39f;
        &.left {
          width: 7px;
          height: 100%;
          left: -4px;
          cursor: ew-resize;
        }
        &.right {
          width: 7px;
          height: 100%;
          right: -4px;
          cursor: ew-resize;
        }
        &.top {
          height: 7px;
          width: 100%;
          top: -4px;
          cursor: ns-resize;
        }
        &.bottom {
          height: 7px;
          width: 100%;
          bottom: -4px;
          cursor: ns-resize;
        }
      }
      .resize-corner {
        position: absolute;
        width: 7px;
        height: 7px;
        background-color: #39f;
        &.top-left {
          left: -4px;
          top: -4px;
          cursor: nwse-resize;
        }
        &.top-right {
          right: -4px;
          top: -4px;
          cursor: nesw-resize;
        }
        &.bottom-left {
          left: -4px;
          bottom: -4px;
          cursor: nesw-resize;
        }
        &.bottom-right {
          right: -4px;
          bottom: -4px;
          cursor: nwse-resize;
        }
      }
    }
  }
}
</style>
