<template>
  <div id="app">
    <div class="section">
      <div class="code">
        <div class="template-code">
          <h2>Template:</h2>
          <div>
            <pre>
              {{ templateCodeDefault }}
            </pre>
          </div>
        </div>
        <div class="event-section">
          <h2>Events:</h2>
          <div class="event-name">onShapeDrag</div>
          <div class="event-feedback" v-html="onShapeDragParamStr">
          </div>
          <div class="event-name">onShapeResize</div>
          <div class="event-feedback" v-html="onShapeResizeParamStr">
          </div>
          
          <div class="event-name">onShapeDraw</div>
          <div class="event-feedback" v-html="onShapeDrawParamStr">
          </div>
        </div>
      </div>
      <div class="preview">
        <v-drag style="width:600px;height:500px;" 
        @onShapeResize="handleSizeChange"
        @onShapeDrag="handleDrag"
        @onShapeDraw="handleNewShape"
        :drawEnable="true"
        :offsetLeft="200" :offsetTop="150" :selectWidth="200" :selectHeight="200" :visible="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      templateCodeDefault:
`
<v-drag 
  style="width:600px;
  height:500px;" 
  @onShapeResize="handleSizeChange"
  @onShapeDrag="handleDrag"
  @onShapeDraw="handleNewShape"
  :visible="true"
  :drawEnable="true"
  :offsetLeft="200" 
  :offsetTop="150" 
  :selectWidth="200" 
  :selectHeight="200"/>`,
      onShapeResizeParamStr:"",
      onShapeDragParamStr:"",
      onShapeDrawParamStr:"",
    }
  },
  methods:{
    handleSizeChange(info){
      this.onShapeResizeParamStr = `<pre>${JSON.stringify(info,"",2)}</pre>`
    },
    handleDrag(info){
      this.onShapeDragParamStr = `<pre>${JSON.stringify(info,"",2)}</pre>`
    },
    handleNewShape(info){
      this.onShapeDrawParamStr = `<pre>${JSON.stringify(info,"",2)}</pre>`
    }
  }
}
</script>

<style lang="less">
#app{
  .section{
    display: flex;
    .code{
      width: 400px;
      .event-section{
          .event-name{
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
          }
          .event-feedback{
            color: #801378;
          }
      }
    }
  }
}
</style>
