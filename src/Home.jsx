import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Company colors
const colors = {
  primary: '#A6CE39',
  primaryDark: '#7FBF3F',
  secondary: '#4F86C6',
  secondaryDark: '#2F5597',
  neutral: '#8A8C8E'
};

// Animation styles
const animationStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in {
    from {
      width: 0;
      left: 50%;
    }
    to {
      width: 100%;
      left: 0;
    }
  }

  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-slide-in {
    animation: slide-in 0.8s ease-out forwards;
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-800 {
    animation-delay: 0.8s;
  }

  .animation-delay-1000 {
    animation-delay: 1s;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .bg-grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }
`;

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    yearsExcellence: '25+',
    dailyDeliveries: '1,500+',
    safetyRecord: '99.9%',
    industrialPartners: '500+',
  });

  // Mock data for industries - would come from API
  const industries = [
    {
      id: 1,
      name: 'Manufacturing',
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80&w=600',
      clients: '250+ clients',
      gradient: 'from-secondary to-secondaryDark',
    },
    {
      id: 2,
      name: 'Mining',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600',
      clients: '150+ sites',
      gradient: 'from-primary to-primaryDark',
    },
    {
      id: 3,
      name: 'Medical',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=600',
      clients: '300+ hospitals',
      gradient: 'from-secondary to-primary',
    },
    {
      id: 4,
      name: 'Energy',
      image: 'https://images.unsplash.com/photo-1473876637954-4b483d675aa9?auto=format&fit=crop&q=80&w=600',
      clients: '100+ plants',
      gradient: 'from-primaryDark to-secondaryDark',
    },
    {
      id: 5,
      name: 'Construction',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
      clients: '500+ projects',
      gradient: 'from-secondary to-secondaryDark',
    },
  ];

  // Mock data for features
  const features = [
    {
      id: 1,
      icon: 'fa-solid fa-building',
      title: 'Trusted Industrial Supplier',
      description: 'Serving industry leaders since 1985',
    },
    {
      id: 2,
      icon: 'fa-solid fa-truck',
      title: 'Nationwide Distribution',
      description: 'Fast shipping across South Africa',
    },
    {
      id: 3,
      icon: 'fa-solid fa-shield',
      title: 'Safety & Compliance Focused',
      description: 'Certified gas equipment standards',
    },
    {
      id: 4,
      icon: 'fa-solid fa-microchip',
      title: 'Integrated with Trojan Forge',
      description: 'Seamless API integration',
    },
  ];

  // Mock data for forge dashboard
  const forgeStats = [
    { label: 'Inventory', value: '2,847' },
    { label: 'Orders', value: '156' },
    { label: 'Revenue', value: 'R48.2k' },
    { label: 'Alerts', value: '3' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bg-white'>
      <style>{animationStyles}</style>

      {/* Navigation */}
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <Link to='/'>
                  <h1 className='text-2xl font-bold' style={{ color: colors.primaryDark }}>
                    TROJAN
                  </h1>
                </Link>
              </div>
              <div className='hidden md:block ml-10'>
                <div className='flex items-center space-x-8'>
                  <Link to='/' className='text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition' style={{ '--hover-color': colors.primary }}>
                    Home
                  </Link>
                  <Link to='/products' className='text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition' style={{ '--hover-color': colors.primary }}>
                    Products
                  </Link>
                  <Link to='/industries' className='text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition' style={{ '--hover-color': colors.primary }}>
                    Industries
                  </Link>
                  <Link to='/about' className='text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition' style={{ '--hover-color': colors.primary }}>
                    About
                  </Link>
                  <Link to='/contact' className='text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition' style={{ '--hover-color': colors.primary }}>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Link to='/login' className='text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition' style={{ '--hover-color': colors.primary }}>
                Login
              </Link>
              <Link 
                to='/register' 
                className='text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg hover:shadow-xl'
                style={{ backgroundColor: colors.primary, '&:hover': { backgroundColor: colors.primaryDark } }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Get Started
              </Link>
            </div>
            <div className='md:hidden'>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
          <div className='px-4 py-3 space-y-2'>
            <Link to='/' className='block text-gray-900 hover:text-primary py-2' onClick={() => setMobileMenuOpen(false)} style={{ '--hover-color': colors.primary }}>
              Home
            </Link>
            <Link to='/products' className='block text-gray-600 hover:text-primary py-2' onClick={() => setMobileMenuOpen(false)} style={{ '--hover-color': colors.primary }}>
              Products
            </Link>
            <Link to='/industries' className='block text-gray-600 hover:text-primary py-2' onClick={() => setMobileMenuOpen(false)} style={{ '--hover-color': colors.primary }}>
              Industries
            </Link>
            <Link to='/about' className='block text-gray-600 hover:text-primary py-2' onClick={() => setMobileMenuOpen(false)} style={{ '--hover-color': colors.primary }}>
              About
            </Link>
            <Link to='/contact' className='block text-gray-600 hover:text-primary py-2' onClick={() => setMobileMenuOpen(false)} style={{ '--hover-color': colors.primary }}>
              Contact
            </Link>
            <div className='pt-4 space-y-2'>
              <Link to='/login' className='block text-center text-gray-600 border border-gray-300 px-4 py-2 rounded-lg' onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link 
                to='/register' 
                className='block text-center text-white px-4 py-2 rounded-lg' 
                onClick={() => setMobileMenuOpen(false)}
                style={{ backgroundColor: colors.primary }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className='relative h-[600px] lg:h-[700px] flex items-center text-white overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80')" }}></div>
          <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent'></div>
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30'></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl'>
            <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8 animate-fade-in-up'>
              <i className='fa-solid fa-shield-halved' style={{ color: colors.primary }}></i>
              <span className='text-sm font-medium text-gray-200'>
                Trusted by {stats.industrialPartners} industrial partners worldwide
              </span>
              <i className='fa-regular fa-star text-yellow-400/70'></i>
            </div>

            <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up animation-delay-200'>
              <span className='bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent'>
                The Right Candidate
              </span>
              <br />
              <span className='relative'>
                for the
                <span className='relative inline-block ml-2'>
                  <span className='bg-gradient-to-r from-primary via-primaryDark to-primary bg-clip-text text-transparent' style={{ '--primary': colors.primary, '--primaryDark': colors.primaryDark }}>
                    Job
                  </span>
                  <span className='absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r rounded-full animate-slide-in' style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})` }}></span>
                </span>
              </span>
            </h1>

            <p className='text-lg md:text-xl text-gray-300 max-w-2xl mb-8 animate-fade-in-up animation-delay-400 leading-relaxed'>
              At Trojan Trading, we take pride in our extensive experience and in-depth industry knowledge in the supply of high-quality domestic and industrial gas equipment, as well as gas water heaters, to the construction industry, gas installers, and plumbing companies.
            </p>

            <div className='flex flex-wrap gap-4 mb-10 animate-fade-in-up animation-delay-600'>
              <span className='flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10'>
                <i className='fa-solid fa-industry' style={{ color: colors.primary }}></i>
                <span className='text-sm'>Industrial</span>
              </span>
              <span className='flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10'>
                <i className='fa-solid fa-heart-pulse' style={{ color: colors.secondary }}></i>
                <span className='text-sm'>Medical</span>
              </span>
              <span className='flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10'>
                <i className='fa-solid fa-flask' style={{ color: colors.primaryDark }}></i>
                <span className='text-sm'>Specialty</span>
              </span>
            </div>

            <div className='flex flex-wrap gap-4 mb-12 animate-fade-in-up animation-delay-800'>
              <Link 
                to='/products' 
                className='group relative overflow-hidden text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3'
                style={{ backgroundColor: colors.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Shop Products
                <i className='fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform'></i>
              </Link>
              <Link 
                to='/quote' 
                className='group relative overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3'
              >
                Request a Quote
                <i className='fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform'></i>
              </Link>
            </div>

            <div className='grid grid-cols-3 gap-8 max-w-md animate-fade-in-up animation-delay-1000'>
              <div>
                <div className='text-2xl font-bold' style={{ color: colors.primary }}>{stats.yearsExcellence}</div>
                <div className='text-xs text-gray-400 mt-1'>Years Excellence</div>
              </div>
              <div>
                <div className='text-2xl font-bold' style={{ color: colors.primary }}>{stats.dailyDeliveries}</div>
                <div className='text-xs text-gray-400 mt-1'>Daily Deliveries</div>
              </div>
              <div>
                <div className='text-2xl font-bold' style={{ color: colors.primary }}>{stats.safetyRecord}</div>
                <div className='text-xs text-gray-400 mt-1'>Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Bar */}
      <div className='bg-white border-y border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {features.map((feature) => (
              <div key={feature.id} className='group relative bg-white/80 rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform' style={{ backgroundColor: colors.primary }}>
                    <i className={`${feature.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-gray-900'>{feature.title}</h3>
                    <p className='text-xs text-gray-500 mt-1'>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-2xl mx-auto mb-12'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4' style={{ backgroundColor: `${colors.primary}20` }}>
              <i className='fa-regular fa-star' style={{ color: colors.primary }}></i>
              <span className='text-sm font-semibold' style={{ color: colors.primaryDark }}>Industry Expertise</span>
            </div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Industries We Serve</h2>
            <p className='text-lg text-gray-600'>Comprehensive gas solutions tailored to the unique needs of each sector</p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {industries.map((industry) => (
              <Link to={`/industries/${industry.id}`} key={industry.id} className='group relative'>
                <div className='relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all'>
                  <img src={industry.image} alt={industry.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' loading='lazy' />
                  <div className={`absolute inset-0 bg-gradient-to-t opacity-80 group-hover:opacity-90 transition-opacity`} style={{ backgroundImage: `linear-gradient(to top, ${colors.secondaryDark}, ${colors.primaryDark})` }}></div>
                  <div className='absolute inset-0 p-3 flex flex-col justify-end text-white'>
                    <h3 className='text-sm font-bold mb-1'>{industry.name}</h3>
                    <div className='text-xs mb-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full inline-block w-fit'>{industry.clients}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className='text-center mt-10'>
            <Link to='/industries' className='inline-flex items-center gap-2 font-medium group' style={{ color: colors.primary }}>
              <span>Explore all industries</span>
              <i className='fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform'></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Trojan Forge Section */}
      <section className='relative text-white py-20 overflow-hidden' style={{ backgroundColor: colors.secondaryDark }}>
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob' style={{ backgroundColor: colors.primary }}></div>
          <div className='absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' style={{ backgroundColor: colors.secondary }}></div>
        </div>
        <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='lg:w-1/2 space-y-6'>
              <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20'>
                <i className='fa-solid fa-microchip' style={{ color: colors.primary }}></i>
                <span className='text-sm font-medium' style={{ color: colors.primary }}>Integrated Ecosystem</span>
              </div>

              <h2 className='text-3xl md:text-4xl font-light text-gray-200'>More Than a Store —</h2>
              <h3 className='text-4xl md:text-5xl font-bold'>
                <span className='bg-gradient-to-r bg-clip-text text-transparent' style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark}, ${colors.primary})` }}>
                  A Complete Operations
                </span>
                <br />
                Platform
              </h3>

              <p className='text-lg text-gray-300 leading-relaxed max-w-lg'>
                Fully integrated with Trojan Forge. Manage your inventory, warehouse, workshop, invoicing, and accounting from one powerful software suite.
              </p>

              <div className='flex flex-wrap gap-3 pt-2'>
                <span className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10'>
                  <i className='fa-solid fa-box text-xs' style={{ color: colors.primary }}></i>
                  <span className='text-xs text-gray-300'>Inventory</span>
                </span>
                <span className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10'>
                  <i className='fa-solid fa-warehouse text-xs' style={{ color: colors.primary }}></i>
                  <span className='text-xs text-gray-300'>Warehouse</span>
                </span>
                <span className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10'>
                  <i className='fa-solid fa-file-invoice text-xs' style={{ color: colors.primary }}></i>
                  <span className='text-xs text-gray-300'>Invoicing</span>
                </span>
                <span className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10'>
                  <i className='fa-solid fa-calculator text-xs' style={{ color: colors.primary }}></i>
                  <span className='text-xs text-gray-300'>Accounting</span>
                </span>
              </div>

              <Link 
                to='/register' 
                className='inline-flex items-center gap-3 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-4'
                style={{ backgroundColor: colors.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Explore Trojan Forge
                <i className='fa-solid fa-arrow-right'></i>
              </Link>
            </div>

            <div className='lg:w-1/2'>
              <div className='relative group'>
                <div className='absolute -inset-1 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition' style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}></div>
                <div className='relative bg-gradient-to-br p-1 rounded-2xl shadow-2xl border border-white/10' style={{ backgroundColor: colors.secondaryDark }}>
                  <div className='rounded-xl overflow-hidden border border-white/5' style={{ backgroundColor: colors.secondaryDark }}>
                    <div className='p-4 border-b border-white/10' style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}33, ${colors.secondary}33)` }}>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='w-3 h-3 rounded-full bg-red-400/80'></div>
                          <div className='w-3 h-3 rounded-full bg-yellow-400/80'></div>
                          <div className='w-3 h-3 rounded-full bg-green-400/80'></div>
                        </div>
                        <span className='text-xs font-mono' style={{ color: colors.primary }}>Trojan Forge v2.0</span>
                      </div>
                    </div>
                    <div className='p-6'>
                      <div className='flex items-center gap-3 mb-6'>
                        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})` }}>
                          <i className='fa-solid fa-grid-2 text-white'></i>
                        </div>
                        <div>
                          <div className='text-sm font-semibold'>TROJAN FORGE</div>
                          <div className='text-xs text-gray-400'>Operations Dashboard</div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        {forgeStats.map((stat, index) => (
                          <div key={index} className='bg-white/5 rounded-lg p-3 border border-white/5'>
                            <div className='text-xs text-gray-400'>{stat.label}</div>
                            <div className='text-sm font-semibold mt-1' style={{ color: colors.primary }}>{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='text-white py-12' style={{ backgroundColor: colors.secondaryDark }}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-2xl font-bold mb-4' style={{ color: colors.primary }}>TROJAN</h3>
              <p className='text-gray-300 text-sm'>Powering industry with reliable gas solutions since 1985.</p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2 text-gray-300'>
                <li><Link to='/about' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>About Us</Link></li>
                <li><Link to='/products' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Products</Link></li>
                <li><Link to='/industries' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Industries</Link></li>
                <li><Link to='/contact' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Support</h4>
              <ul className='space-y-2 text-gray-300'>
                <li><Link to='/help' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Help Center</Link></li>
                <li><Link to='/sds' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Safety Data Sheets</Link></li>
                <li><Link to='/shipping' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Shipping Info</Link></li>
                <li><Link to='/returns' className='hover:text-primary transition' style={{ '--hover-color': colors.primary }}>Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Connect</h4>
              <div className='flex space-x-4'>
                <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-primary transition' style={{ '--hover-color': colors.primary }}>
                  <i className='fa-brands fa-linkedin text-xl'></i>
                </a>
                <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-primary transition' style={{ '--hover-color': colors.primary }}>
                  <i className='fa-brands fa-twitter text-xl'></i>
                </a>
                <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-primary transition' style={{ '--hover-color': colors.primary }}>
                  <i className='fa-brands fa-facebook text-xl'></i>
                </a>
              </div>
            </div>
          </div>
          <div className='border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm'>
            <p>&copy; {new Date().getFullYear()} Trojan Trading. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .hover\\:text-primary:hover {
          color: ${colors.primary} !important;
        }
        .text-primary {
          color: ${colors.primary};
        }
        .bg-primary {
          background-color: ${colors.primary};
        }
        .border-primary {
          border-color: ${colors.primary};
        }
      `}</style>
    </div>
  );
};

export default Home;