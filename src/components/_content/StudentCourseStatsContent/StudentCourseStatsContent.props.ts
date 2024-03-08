export interface StudentCourseStatsContentProps {
  course_id: string
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
}
