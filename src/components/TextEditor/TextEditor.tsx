import { CKEditor as CKEditor4 } from 'ckeditor4-react'
import Editor from 'ckeditor5-custom-build'
import React from 'react'

import { CKEditor as CKEditor5 } from '@ckeditor/ckeditor5-react'

import type { TextEditorProps } from './TextEditor.props'

export function TextEditor({ onChange, ...props }: TextEditorProps) {
  if (props.version === 5)
    return (
      <CKEditor5
        editor={Editor}
        config={props.config} //{ placeholder: 'Some text...' }
        onChange={(_, editor) => onChange(editor.getData())} //(event, editor) => setText(editor.getData())
        data={props.data || ''}
      />
    )

  if (props.version === 4)
    return (
      <CKEditor4
        editorUrl={`${window.location.origin}/ckeditor/ckeditor.js`}
        config={{
          customConfig: '/ckeditor/config.js',
        }}
        {...props}
        initData={props.initData}
        onChange={(evt) => onChange(evt.editor.getData())} //(evt) => setText(evt.editor.getData())
      />
    )
}
