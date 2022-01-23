import React, { useRef, useEffect, useState } from 'react';
// import { editor, KeyMod, KeyCode  } from "monaco-editor";
// import { debounce } from 'lodash';
// import message from 'antd/lib/message';
// import 'antd/lib/message/style/index.css';
import './markdownEditor.css'

// message.config({ top: 20, duration: 2, maxCount: 1 });

function MarkdownEditor(props) {
  const container = useRef(null);
  const { value, onChange } = props;
  

  useEffect(() => {
    if(typeof window!==`undefined`&&typeof navigator!==`undefined`){
      let {editor} = require('monaco-editor')
      const _editor =  editor.create(container.current, {
            value: value,
            language: "markdown",
            theme:"vs-dark",
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,				
            glyphMargin: true,
            lightbulb: {
              enabled: true
            }
          });
      const _model = _editor.getModel();
    
      
      _model.onDidChangeContent(e=>{
        let x = _model.getValue()
        onChange(x)
      })
  }
  

  }, [value, onChange])
  return (
    <div className="markdownEditor" ref={container} />
  );
}

MarkdownEditor.defaultProps = {
  value: '',
  onChange:() => { }
};

export default MarkdownEditor;