import { Button } from '@UI/Button'

export default function Home() {
  return (
    <main>
      <br />
      <h1>HELLO, WORLD!</h1>
      <br />
      <Button href="courses">COURSES</Button>
      <br />
      <Button href="courses/detail">COURSES detail</Button>
      <br />
      <Button href="courses/lesson">COURSES lesson</Button>
      <br />
      <Button href="courses/my">COURSES my</Button>
      <br />
      <Button href="courses/archive">COURSES archive</Button>
    </main>
  )
}
