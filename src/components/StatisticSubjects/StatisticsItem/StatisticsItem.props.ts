import type { TStatsItem, TStatsTypes } from '@http/student/types'

export interface StatisticsItemProps extends TStatsItem {
  type: TStatsTypes
  progress?: number
}

export type StatisticSubjectItem = {
  title: string
  icon: string
}
