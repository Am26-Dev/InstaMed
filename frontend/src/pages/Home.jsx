import ArticleBanner from '../components/Article'
import { Banner } from '../components/Banner'
import Header from '../components/header'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
    return (
        <div>
            <Header />
            <ArticleBanner />
            <TopDoctors />
            <Banner />
        </div>
    )
}

export default Home
