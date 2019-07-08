<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'jsonEditor',
  data() {
    return {
      jsonEditor: false
    }
  },
  props: ['value'],
  watch: {
    value(value) {
      const editor_value = this.jsonEditor.getValue()
      if (value !== editor_value) {
        if(typeof this.value != 'object'){
          this.jsonEditor.setValue(this.value, null, 2)
        }else{
          this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
        }
        
      }
    }
  },
  created(){
    //this.value ="";
  },
  
  mounted() { 
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true,
      lineWrapping:true,
      matchBrackets:true,
    })
    
    if(typeof this.value != 'object'){
      this.jsonEditor.setValue(this.value, null, 2)
    }else{
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    }
      
    //this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style scoped>
.json-editor{
  width:100%;
  height:100%;

  position: relative;
  padding:0 30px;
  
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height:200px;
  max-height:300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 200px;
  max-height:300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
