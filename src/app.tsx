import { motion } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { CryptoWidget } from './components/CryptoWidget';

export function App() {
  return (
    <>
      <ParticleBackground />
      <div className="min-h-screen text-white font-robit relative z-10">
        <header className="fixed w-full top-0 bg-black/50 backdrop-blur-md z-20">
          <nav className="container mx-auto px-6 py-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-accent hover:animate-neon-pulse"
            >
              Imbibed.Solutions
            </motion.div>
          </nav>
        </header>

        <main className="container mx-auto px-6">
          <section className="pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-tertiary bg-clip-text text-transparent">
                Web3 Software Agency
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Building the future of decentralized applications with blockchain technology and artificial intelligence.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-white px-8 py-3 rounded-lg hover:animate-neon-pulse"
              >
                Connect Wallet
              </motion.button>
            </motion.div>
          </section>

          <section className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Blockchain', 'AI Integration', 'Web3 Development'].map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 2) }}
                  className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-accent/20 hover:animate-neon-pulse"
                >
                  <h3 className="text-xl font-bold text-secondary mb-4">{service}</h3>
                  <p className="text-gray-300">
                    Leveraging cutting-edge technology to build the next generation of decentralized applications.
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        <CryptoWidget />
      </div>
    </>
  );
} 