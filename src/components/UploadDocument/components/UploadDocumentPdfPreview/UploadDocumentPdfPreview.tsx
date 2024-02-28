'use client'

import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import SimpleBar from 'simplebar-react'
import { useWindowSize } from 'usehooks-ts'

import type { UploadDocumentPdfPreviewProps } from './UploadDocumentPdfPreview.props'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

export function UploadDocumentPdfPreview({ file }: UploadDocumentPdfPreviewProps) {
  const { width } = useWindowSize()

  return (
    <SimpleBar className="document__preview--pdf">
      <Document
        className="document__preview--pdf-document"
        file={file}
        onLoadError={(error) => console.log('onLoadError', error)}
      >
        <Page
          pageNumber={1}
          width={width < 992 ? 125 : 200}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </SimpleBar>
  )
}
