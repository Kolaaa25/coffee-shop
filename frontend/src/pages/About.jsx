const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white parallax overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(44, 25, 15, 0.2), rgba(139, 111, 71, 0.2)), url(https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&h=1080&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-brown/40 gradient-animate"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cream/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brown/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <img src="/favicon.svg" alt="About Us" className="w-28 h-28 mx-auto animate-float" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-3xl mb-4 font-light">Crafting Excellence Since 2010</p>
          <div className="flex justify-center gap-4 mt-8">
            <div className="glass-effect px-8 py-4 rounded-2xl backdrop-blur-md">
              <div className="text-4xl font-bold text-brown-light">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="glass-effect px-8 py-4 rounded-2xl backdrop-blur-md">
              <div className="text-4xl font-bold text-brown-light">10K+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="glass-effect px-8 py-4 rounded-2xl backdrop-blur-md">
              <div className="text-4xl font-bold text-brown-light">50+</div>
              <div className="text-sm">Coffee Varieties</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-gradient-to-b from-white to-cream-light">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-serif font-bold mb-4 ">
              <span className="text-brown-dark">Our Mission</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brown to-brown-dark mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-12 hover-lift">
            <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
              At Coffee House, we believe that great coffee is more than just a
              beverage—it's an <span className="font-bold text-brown">experience</span>. Our mission is to bring the finest
              coffee from around the world directly to your cup, crafted with
              precision and passion by our expert baristas.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              We source our beans from <span className="font-bold text-brown">sustainable farms</span>, ensuring that every sip
              supports both quality and ethical practices. From bean to cup, we're
              committed to excellence in every step of the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-light to-brown text-cream relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-xl text-cream-dark max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Sustainability */}
            <div className="text-center group hover-lift bg-white/10 p-10 rounded-3xl glass-effect">
              <div className="mb-6 relative inline-block">
                <div className="w-28 h-28 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-pulse-glow">
                  <svg className="w-14 h-14 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">
                Sustainability
              </h3>
              <p className="text-cream-dark leading-relaxed text-lg">
                We partner with farms that prioritize environmental conservation
                and fair labor practices.
              </p>
            </div>

            {/* Quality */}
            <div className="text-center group hover-lift bg-white/10 p-10 rounded-3xl glass-effect">
              <div className="mb-6 relative inline-block">
                <div className="w-28 h-28 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-pulse-glow">
                  <svg className="w-14 h-14 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">
                Quality
              </h3>
              <p className="text-cream-dark leading-relaxed text-lg">
                Every bean is carefully selected and roasted to perfection,
                ensuring the highest quality in every cup.
              </p>
            </div>

            {/* Passion */}
            <div className="text-center group hover-lift bg-white/10 p-10 rounded-3xl glass-effect">
              <div className="mb-6 relative inline-block">
                <div className="w-28 h-28 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-pulse-glow">
                  <svg className="w-14 h-14 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">
                Passion
              </h3>
              <p className="text-cream-dark leading-relaxed text-lg">
                Our team of expert baristas are passionate about coffee and
                dedicated to creating the perfect brew.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Head Barista',
                image:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
              },
              {
                name: 'Michael Chen',
                role: 'Coffee Roaster',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
              },
              {
                name: 'Emily Davis',
                role: 'Pastry Chef',
                image:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-brown font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Coffee House</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
            ].map((img, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt={`Coffee house ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
