import { parseCookies } from '@/helpers/index'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ cams, token }) {
  console.log('%c cams ', 'background: red; color: white', cams)
  const router = useRouter()

  const deleteCam = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/cams/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.reload()
      }
    }
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Cams</h3>

        {cams.map((cam) => (
          <DashboardEvent key={cam.id} cam={cam} handleDelete={deleteCam} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/cams/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const cams = await res.json()

  return {
    props: {
      cams,
      token,
    },
  }
}
