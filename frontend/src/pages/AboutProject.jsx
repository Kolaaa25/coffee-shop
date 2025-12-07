import { Link } from 'react-router-dom';

const AboutProject = () => {
  const technologies = {
    frontend: [
      { name: 'React', description: 'UI library for building interactive interfaces', icon: '⚛️' },
      { name: 'Vite', description: 'Next-generation frontend build tool', icon: '⚡' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: '🎨' },
      { name: 'React Router', description: 'Client-side routing', icon: '🧭' },
      { name: 'Zustand', description: 'Lightweight state management', icon: '🐻' },
      { name: 'Axios', description: 'Promise-based HTTP client', icon: '📡' },
      { name: 'React Hot Toast', description: 'Toast notifications', icon: '🔔' },
    ],
    backend: [
      { name: 'Node.js', description: 'JavaScript runtime environment', icon: '🟢' },
      { name: 'Express.js', description: 'Fast, minimalist web framework', icon: '🚂' },
      { name: 'MongoDB', description: 'NoSQL database for flexibility', icon: '🍃' },
      { name: 'Mongoose', description: 'MongoDB object modeling', icon: '🔗' },
      { name: 'JWT', description: 'JSON Web Tokens for authentication', icon: '🔐' },
      { name: 'Bcrypt', description: 'Password hashing library', icon: '🔒' },
      { name: 'Stripe', description: 'Payment processing', icon: '💳' },
    ],
    deployment: [
      { name: 'Vercel', description: 'Frontend hosting & deployment', icon: '▲' },
      { name: 'Render', description: 'Backend hosting & deployment', icon: '🚀' },
      { name: 'MongoDB Atlas', description: 'Cloud database service', icon: '☁️' },
      { name: 'GitHub', description: 'Version control & CI/CD', icon: '🐙' },
    ],
  };

  const features = [
    { title: 'User Authentication', description: 'Secure login/register with JWT tokens', icon: '👤' },
    { title: 'Shopping Cart', description: 'Persistent cart with local storage', icon: '🛒' },
    { title: 'Payment Integration', description: 'Stripe checkout for secure payments', icon: '💰' },
    { title: 'Responsive Design', description: 'Mobile-first, works on all devices', icon: '📱' },
    { title: 'Admin Dashboard', description: 'Manage menu, orders, and users', icon: '📊' },
    { title: 'Order Tracking', description: 'Real-time order status updates', icon: '📦' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9)), url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-gray-900/50"></div>
        
        {/* Code-like floating elements */}
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">{'{ }'}</div>
        <div className="absolute top-40 right-20 text-3xl opacity-20 animate-float" style={{animationDelay: '0.5s'}}>{'</>'}</div>
        <div className="absolute bottom-40 left-20 text-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}>{'< />'}</div>
        <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>{'[ ]'}</div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-6xl">☕💻</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            About This Project
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-gray-300">
            A full-stack e-commerce coffee shop application built as a portfolio project
          </p>
          <div className="inline-block glass-effect px-8 py-4 rounded-2xl backdrop-blur-md">
            <p className="text-lg">
              Created by <span className="font-bold text-brown-light text-xl">Mykola Matekha</span>
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-gradient-to-b from-cream-light to-white">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
              👨‍💻 About the Developer
            </h2>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-brown to-primary flex items-center justify-center text-5xl text-white shadow-lg">
                MM
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4">Mykola Matekha</h3>
              <p className="text-xl text-gray-600 mb-6">Full-Stack Developer</p>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
                This coffee shop project was built as a portfolio piece to demonstrate my skills in 
                modern web development. It showcases a complete e-commerce solution with user authentication, 
                payment processing, and an admin dashboard for managing the business.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a 
                  href="https://github.com/Kolaaa25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <span>🐙</span> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/mykola-matekha-75611633a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <span>💼</span> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-4">
            🚀 Key Features
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            This project includes all essential features of a modern e-commerce application
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-cream-light to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gradient-to-b from-white to-cream-light">
        <div className="container-custom px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-4">
            🛠️ Tech Stack
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Built with modern technologies for optimal performance and developer experience
          </p>

          {/* Frontend */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2 justify-center">
              <span className="text-3xl">🎨</span> Frontend
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {technologies.frontend.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h4 className="font-bold text-primary">{tech.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2 justify-center">
              <span className="text-3xl">⚙️</span> Backend
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {technologies.backend.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-green-500"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h4 className="font-bold text-primary">{tech.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2 justify-center">
              <span className="text-3xl">☁️</span> Deployment & DevOps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {technologies.deployment.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-purple-500"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h4 className="font-bold text-primary">{tech.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
            🏗️ Project Architecture
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="text-5xl mb-4">🖥️</div>
                <h3 className="text-xl font-bold mb-2">Frontend</h3>
                <p className="text-gray-300 text-sm mb-4">React SPA hosted on Vercel</p>
                <div className="text-xs bg-white/20 rounded-lg p-2">
                  vercel.com
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Backend API</h3>
                <p className="text-gray-300 text-sm mb-4">Express.js REST API on Render</p>
                <div className="text-xs bg-white/20 rounded-lg p-2">
                  render.com
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="text-5xl mb-4">🗄️</div>
                <h3 className="text-xl font-bold mb-2">Database</h3>
                <p className="text-gray-300 text-sm mb-4">MongoDB on Atlas Cloud</p>
                <div className="text-xs bg-white/20 rounded-lg p-2">
                  mongodb.com/atlas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-cream-light to-white">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
            Want to see it in action?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Explore the full functionality of this e-commerce application by browsing the menu, 
            adding items to cart, and experiencing the checkout process.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/menu" className="btn-primary text-lg px-8 py-3">
              Browse Menu ☕
            </Link>
            <a 
              href="https://github.com/Kolaaa25/coffee-shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-3"
            >
              View Source Code 🐙
            </a>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-primary/5">
        <div className="container-custom px-4 text-center">
          <p className="text-gray-600">
            © 2024 Coffee Shop Project by <span className="font-bold">Mykola Matekha</span>. 
            Built with ❤️ and lots of ☕
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutProject;
