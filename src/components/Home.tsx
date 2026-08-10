type HomeProps = {
  title: string
}

function Home({ title }: HomeProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Track your vehicle maintenance in one place.</p>
    </div>
  )
}

export default Home