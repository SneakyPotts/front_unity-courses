import type { ReactNodeLike } from 'prop-types'

import type { EditorConfig } from '@ckeditor/ckeditor5-core'

export type TextEditorProps = {
  onChange: (str: string) => void
} & (
  | {
      version: 4
      initData: ReactNodeLike & string
    }
  | {
      version: 5
      config?: EditorConfig
      data?: string | null | undefined
    }
)
