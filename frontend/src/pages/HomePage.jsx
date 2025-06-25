import { useAuth } from "../components/providers/AuthProvider"
import { Header } from "../components/layout/Header"
import { Link } from "react-router-dom"

// --- Placeholder Data ---
const featuredFilms = [
    { id: 465649, name: 'M3GAN', year: 2022, poster: 'https://a.ltrbxd.com/resized/film-poster/4/6/5/6/4/9/465649-m3gan-0-150-0-225-crop.jpg?v=7b22fdec79' },
    { id: 591931, name: 'Infinity Pool', year: 2023, poster: 'https://a.ltrbxd.com/resized/film-poster/5/9/1/9/3/1/591931-infinity-pool-0-150-0-225-crop.jpg?v=1c4f80439e' },
    { id: 831182, name: 'Saint Omer', year: 2022, poster: 'https://a.ltrbxd.com/resized/film-poster/8/3/1/1/8/2/831182-saint-omer-0-150-0-225-crop.jpg?v=a774fd6e9c' },
    { id: 812015, name: 'Close', year: 2022, poster: 'https://a.ltrbxd.com/resized/film-poster/8/1/2/0/1/5/812015-close-0-150-0-225-crop.jpg?v=06927afaf8' },
]

const popularReviews = [
    { filmName: 'You People', filmYear: 2023, user: 'tyler', text: '"a netflix original" yeah we can tell', likes: '2.3k', avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/1/9/8/9/7/shard/avtr-0-48-0-48-crop.jpg?v=514df6a134', poster: 'https://a.ltrbxd.com/resized/film-poster/7/8/0/3/2/1/780321-you-people-0-70-0-105-crop.jpg?v=294e240eb6' },
    { filmName: 'Puss in Boots', filmYear: 2022, user: 'NicoPico', text: 'Puss in Boots: Into the Pussy-Verse', likes: '14.9k', avatar: 'https://a.ltrbxd.com/resized/avatar/upload/6/9/6/4/5/9/6/shard/avtr-0-48-0-48-crop.jpg?v=9a645f8e44', poster: 'https://a.ltrbxd.com/resized/film-poster/2/4/2/2/8/5/242285-puss-in-boots-the-last-wish-0-70-0-105-crop.jpg?v=9e9109c5cd' },
]

// Popular movies data for authenticated users
const popularMovies = [
    { id: 574475, name: 'Final Destination Bloodlines', poster: 'https://image.tmdb.org/t/p/w500//6WxhEvFsauuACfv8HyoVX6mZKFj.jpg' },
    { id: 552524, name: 'Lilo & Stitch', poster: 'https://image.tmdb.org/t/p/w500//7c5VBuCbjZOk7lSfj9sMpmDIaKX.jpg' },
    { id: 1442776, name: 'Crazy Lizard', poster: 'https://image.tmdb.org/t/p/w500//9TFaFsSXedaALXTzba349euDeoY.jpg' },
    { id: 1311844, name: 'The Twisters', poster: 'https://image.tmdb.org/t/p/w500//8OP3h80BzIDgmMNANVaYlQ6H4Oc.jpg' },
    { id: 605722, name: 'Distant', poster: 'https://image.tmdb.org/t/p/w500//czh8HOhsbBUKoKsmRmLQMCLHUev.jpg' },
    { id: 1181039, name: 'Candle in the Tomb: The Worm Valley', poster: 'https://image.tmdb.org/t/p/w500//7Hk1qxAvZi9H9cfBb4iHkoGjapH.jpg' },
]

// --- Logged Out View ---
const LoggedOutHome = () => (
    <>
        {/* Backdrop Image */}
        <div className="absolute inset-0 -z-10 h-[675px] overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(https://a.ltrbxd.com/resized/sm/upload/g5/6a/0u/c6/m3gan-1920-1920-1080-1080-crop-000000.jpg?v=0f6275b262)" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent"></div>
        </div>
        
        <main className="pt-[88px]">
            <div className="mx-auto max-w-4xl px-4">
                 <div className="text-center">
                    <h2 className="font-headline text-4xl md:text-5xl leading-tight text-white">
                        Track films you've watched.
                        <br />
                        Save those you want to see.
                        <br />
                        Tell your friends what's good.
                    </h2>
                    <Link to="/signup" className="mt-8 inline-block bg-brand-accent text-white font-bold uppercase tracking-wider px-8 py-3 rounded-md hover:bg-brand-accent-hover transition-colors">
                        Get started — it's free!
                    </Link>
                    <p className="mt-4 text-brand-text">The social network for film lovers.</p>
                 </div>

                 {/* Featured Films Section */}
                 <section className="mt-16">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text mb-4">Featured this week</h3>
                    <ul className="flex flex-wrap justify-center gap-4">
                       {featuredFilms.map(film => (
                           <li key={film.id} className="w-1/3 md:w-1/5 lg:w-[150px] flex-shrink-0 group">
                                <div className="relative">
                                    <img src={film.poster} alt={film.name} className="w-full h-auto rounded-lg shadow-lg" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <div className="absolute inset-0 ring-2 ring-brand-accent/50 group-hover:ring-brand-accent rounded-lg"></div>
                                    </div>
                                </div>
                           </li>
                       ))}
                    </ul>
                 </section>

                 {/* Popular Reviews Section */}
                 <section className="mt-16">
                     <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text mb-4">Popular Reviews this week</h3>
                     <ul className="space-y-6">
                        {popularReviews.map((review, index) => (
                            <li key={index} className="flex items-start space-x-4">
                                <img src={review.poster} alt={review.filmName} className="w-[70px] h-auto rounded-md shadow-md" />
                                <div className="flex-1">
                                    <h4 className="text-lg font-serif text-white">
                                        {review.filmName} <span className="text-sm font-sans text-brand-text-dark">{review.filmYear}</span>
                                    </h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <img src={review.avatar} alt={review.user} className="w-6 h-6 rounded-full" />
                                        <span className="text-sm font-semibold text-brand-text-bright">{review.user}</span>
                                    </div>
                                    <div className="mt-2 text-brand-text-bright">
                                        <p>{review.text}</p>
                                    </div>
                                    <p className="text-xs text-brand-text-dark mt-2">{review.likes} likes</p>
                                </div>
                            </li>
                        ))}
                     </ul>
                 </section>
            </div>
        </main>
    </>
)

// --- Logged In View ---
const LoggedInHome = ({ username }) => (
    <div className="site-body py-5 pt-[88px] min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--color-gradient-start), var(--color-gradient-end))' }}>
        <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
            <div className="text-h-grey text-center text-3xl font-normal">
                Welcome back, <Link className="border-h-grey text-p-white hover:border-p-white border-b border-solid" to="/profile">{username}</Link>. 
                <span className="hidden pb-2 md:inline-block">Here’s what we’ve been watching…</span>
            </div>
            
            <p className="text-h-grey mb-8 text-center text-lg md:mb-8">
              This homepage will become customized as you follow active members on Filmboxd.
            </p>
            
            <div className="section-heading border-b-grey text-sh-grey mb-3 flex justify-between border-b border-solid text-xs">
                <p className="hover:text-hov-blue text-sm hover:cursor-pointer">POPULAR ON FILMBOXD</p> 
                <Link className="hover:text-hov-blue text-[11px] hover:cursor-pointer" to="/films">MORE</Link>
            </div>
            
            <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {popularMovies.map(movie => (
                    <div key={movie.id} className="hover:border-3 border-pb-grey/25 hover:border-pb-grey relative aspect-[2/3] basis-1/6 rounded border border-solid shadow-[0_0_1px_1px_rgba(20,24,28,1)] hover:cursor-pointer hover:rounded">
                        <Link to={`/movie/${movie.id}`}>
                            <div className="relative h-full w-full">
                                <img 
                                    alt={movie.name} 
                                    loading="lazy" 
                                    decoding="async" 
                                    className="rounded border object-cover" 
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }} 
                                    src={movie.poster}
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            
            {/* Pro Upgrade Banner */}
            <Link to="/pro" className="mb-8 block self-center md:hidden">
                <img 
                    alt="upgrade to pro banner" 
                    loading="lazy" 
                    width="100" 
                    height="100" 
                    decoding="async" 
                    className="block self-center md:hidden" 
                    style={{ color: 'transparent' }} 
                    src="https://a.ltrbxd.com/sm/upload/1n/js/vs/bi/pro-mobile.png?k=8ce50124d8"
                />
            </Link>
            <Link to="/pro" className="mb-8 hidden self-center md:block">
                <img 
                    alt="upgrade to pro banner" 
                    loading="lazy" 
                    width="950" 
                    height="100" 
                    decoding="async" 
                    className="hidden self-center md:block" 
                    style={{ color: 'transparent' }} 
                    src="https://a.ltrbxd.com/resized/sm/upload/j8/gt/r8/ss/pro-950-0-950-0-0.png?k=bc62c7df04"
                />
            </Link>
        </div>
    </div>
)

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header />
      {user ? <LoggedInHome username={user.username} /> : <LoggedOutHome />}
    </div>
  )
}
