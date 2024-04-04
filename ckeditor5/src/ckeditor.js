/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Undo } from '@ckeditor/ckeditor5-undo';
// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.
class Editor extends ClassicEditor {
}
Editor.builtinPlugins = [
    BlockQuote,
    Bold,
    Essentials,
    Italic,
    List,
    Paragraph,
    Underline,
    Undo
];
Editor.defaultConfig = {
    toolbar: {
        items: [
            'blockQuote',
            'bold',
            'italic',
            'underline',
            'bulletedList',
            'numberedList'
        ]
    },
    language: 'uk'
};
export default Editor;
//# sourceMappingURL=ckeditor.js.map