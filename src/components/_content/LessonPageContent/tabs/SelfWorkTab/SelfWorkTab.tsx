import { MathJax } from 'better-react-mathjax'
import { format } from 'date-fns'
import React from 'react'

import { useQueryStudentLesson } from '@http/student/client.lesson'

import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'

import { SelfWorkTabContent } from '_content/LessonPageContent/tabs/SelfWorkTabContent'

import type { SelfWorkTabProps } from './SelfWorkTab.props'

export function SelfWorkTab({ selfId }: SelfWorkTabProps) {
  const {
    self: { data, isLoading, isError },
  } = useQueryStudentLesson({ self_id: selfId })

  if (isLoading) return <Loader />

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <>
      <div className="lesson-section__block">
        {data?.deadline && (
          <div className="lesson-section__deadline">
            Дедлайн:
            <div className="lesson-section__date date date--blue">{format(new Date(data.deadline), 'dd.MM H:mm')}</div>
          </div>
        )}
        <div className="lesson-section__info">
          <div className="lesson-section__text">
            <div className="text-wrapp">
              {!!data?.title?.length && <h2>{data?.title}</h2>}
              <MathJax>
                <div dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
              </MathJax>
            </div>
          </div>

          {/*{!!data?.files?.length && (*/}
          {/*  <div className="lesson-section__files">*/}
          {/*    <h2 className="lesson-section__title">Матеріали:</h2>*/}
          {/*    <div className="lesson-section__document-block document-block">*/}
          {/*      <ul className="document-block__list">*/}
          {/*        {data.files.map((i) => (*/}
          {/*          <UploadDocumentItem*/}
          {/*            key={i.id}*/}
          {/*            type="download"*/}
          {/*            name={i.name}*/}
          {/*            link={i.file}*/}
          {/*          />*/}
          {/*        ))}*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>

        <SelfWorkTabContent
          selfWork={data}
          // marks={lesson?.marks}
        />
      </div>
    </>
  )
}
