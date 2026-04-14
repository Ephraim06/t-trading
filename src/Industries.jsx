import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  TruckIcon,
  HeartIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  StarIcon,
  AcademicCapIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  BeakerIcon,
  FireIcon,
  CloudIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Navigation from './components/Navigation';

// Animation styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out forwards;
  }

  .animate-scale-in {
    animation: scaleIn 0.4s ease-out forwards;
  }

  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
`;

const Industries = () => {
  const { industryId } = useParams();
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Complete industries data
  const industries = [
    {
      id: 1,
      name: 'Manufacturing',
      slug: 'manufacturing',
      icon: BuildingOfficeIcon,
      image:
        'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80&w=600',
      heroImage:
        'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80&w=1200',
      clients: '250+ clients',
      stats: {
        projects: '500+',
        countries: '15+',
        satisfaction: '98%',
        growth: '+32%',
      },
      gradient: 'from-blue-600 to-cyan-600',
      color: 'blue',
      description:
        'Comprehensive gas solutions for modern manufacturing processes, from metal fabrication to electronics production.',
      fullDescription:
        'We provide high-purity industrial gases essential for manufacturing operations. Our solutions include oxygen for cutting and welding, nitrogen for inerting and purging, and argon for shielding in welding applications. With over 25 years of experience, we help manufacturers optimize their processes, reduce costs, and improve product quality.',
      applications: [
        'Metal Fabrication & Welding',
        'Electronics Manufacturing',
        'Automotive Production',
        'Heat Treatment',
        'Laser Cutting',
        'Plastic Manufacturing',
      ],
      products: [
        {
          name: 'Oxygen',
          description: 'For cutting, welding, and steel production',
        },
        { name: 'Nitrogen', description: 'For inerting, purging, and cooling' },
        { name: 'Argon', description: 'Shielding gas for welding' },
        { name: 'Hydrogen', description: 'For annealing and heat treating' },
      ],
      benefits: [
        'Increased production efficiency',
        'Improved product quality',
        'Reduced waste and scrap',
        'Enhanced workplace safety',
        'Lower operating costs',
      ],
      caseStudy: {
        title: 'Automotive Manufacturer Increases Production by 35%',
        description:
          'A leading automotive manufacturer implemented our optimized gas delivery system, resulting in a 35% increase in production efficiency and 25% reduction in gas consumption.',
        metrics: [
          '35% Production Increase',
          '25% Gas Reduction',
          '40% ROI Increase',
        ],
      },
    },
    {
      id: 2,
      name: 'Mining',
      slug: 'mining',
      icon: TruckIcon,
      image:
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600',
      heroImage:
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=1200',
      clients: '150+ sites',
      stats: {
        projects: '200+',
        countries: '12+',
        satisfaction: '96%',
        growth: '+28%',
      },
      gradient: 'from-amber-600 to-orange-600',
      color: 'amber',
      description:
        'Industrial gases for mining operations, including oxygen enrichment, nitrogen inerting, and specialty gas applications.',
      fullDescription:
        'Our mining solutions enhance safety and productivity in underground and surface mining operations. We provide oxygen for enrichment in ventilation systems, nitrogen for inerting to prevent fires, and specialty gases for laboratory analysis. Our bulk gas supply systems ensure continuous operation even in remote locations.',
      applications: [
        'Oxygen Enrichment',
        'Nitrogen Inerting',
        'Coal Bed Methane Recovery',
        'Mine Ventilation',
        'Laboratory Analysis',
        'Explosives Manufacturing',
      ],
      products: [
        {
          name: 'Oxygen',
          description: 'For ventilation enrichment and safety',
        },
        { name: 'Nitrogen', description: 'For inerting and fire prevention' },
        { name: 'Calibration Gases', description: 'For gas detection systems' },
        { name: 'Specialty Mixtures', description: 'For laboratory analysis' },
      ],
      benefits: [
        'Enhanced mine safety',
        'Increased productivity',
        'Reduced downtime',
        'Improved air quality',
        'Compliance with regulations',
      ],
      caseStudy: {
        title: 'Deep Mine Achieves Zero Safety Incidents',
        description:
          'Implementation of our nitrogen inerting system eliminated fire risks in a deep coal mine, achieving 500 days without safety incidents.',
        metrics: ['0 Incidents', '100% Compliance', '+45% Safety Rating'],
      },
    },
    {
      id: 3,
      name: 'Medical',
      slug: 'medical',
      icon: HeartIcon,
      image:
        'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=600',
      heroImage:
        'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=1200',
      clients: '300+ hospitals',
      stats: {
        projects: '500+',
        countries: '10+',
        satisfaction: '99%',
        growth: '+45%',
      },
      gradient: 'from-emerald-600 to-teal-600',
      color: 'emerald',
      description:
        'Medical-grade gases for healthcare facilities, including oxygen, nitrous oxide, and medical air for patient care.',
      fullDescription:
        'We supply USP-grade medical gases to hospitals, clinics, and healthcare facilities. Our products include medical oxygen for respiratory therapy, nitrous oxide for anesthesia, medical air for patient ventilation, and specialty gas mixtures for laboratory diagnostics. We maintain the highest quality standards and regulatory compliance.',
      applications: [
        'Respiratory Therapy',
        'Anesthesia',
        'Patient Ventilation',
        'Laboratory Diagnostics',
        'Cryosurgery',
        'Medical Research',
      ],
      products: [
        {
          name: 'Medical Oxygen',
          description: 'USP-grade oxygen for respiratory care',
        },
        {
          name: 'Nitrous Oxide',
          description: 'For anesthesia and pain management',
        },
        { name: 'Medical Air', description: 'For patient ventilation' },
        { name: 'Carbon Dioxide', description: 'For laparoscopic surgery' },
      ],
      benefits: [
        'Compliance with USP standards',
        'Reliable 24/7 supply',
        'Emergency backup systems',
        'Traceability and documentation',
        'Staff training and support',
      ],
      caseStudy: {
        title: 'Regional Hospital Network Achieves 99.9% Uptime',
        description:
          'Our redundant supply system ensured continuous gas delivery to 15 hospitals during a major regional power outage.',
        metrics: ['99.9% Uptime', '0 Patient Impact', '24/7 Support'],
      },
    },
    {
      id: 4,
      name: 'Energy',
      slug: 'energy',
      icon: BoltIcon,
      image:
        'https://images.unsplash.com/photo-1473876637954-4b483d675aa9?auto=format&fit=crop&q=80&w=600',
      heroImage:
        'https://images.unsplash.com/photo-1473876637954-4b483d675aa9?auto=format&fit=crop&q=80&w=1200',
      clients: '100+ plants',
      stats: {
        projects: '150+',
        countries: '8+',
        satisfaction: '97%',
        growth: '+38%',
      },
      gradient: 'from-purple-600 to-pink-600',
      color: 'purple',
      description:
        'Gas solutions for the energy sector, including hydrogen for fuel cells, natural gas, and specialty gases for power generation.',
      fullDescription:
        'We support the evolving energy sector with gases for power generation, renewable energy, and emerging technologies. Our hydrogen solutions enable clean energy applications, while our nitrogen and CO2 are essential for enhanced oil recovery and carbon capture projects.',
      applications: [
        'Hydrogen Fuel Cells',
        'Natural Gas Processing',
        'Enhanced Oil Recovery',
        'Carbon Capture',
        'Power Generation',
        'Battery Manufacturing',
      ],
      products: [
        { name: 'Hydrogen', description: 'For fuel cells and clean energy' },
        { name: 'Nitrogen', description: 'For enhanced oil recovery' },
        { name: 'CO2', description: 'For carbon capture and storage' },
        { name: 'Helium', description: 'For cooling and leak detection' },
      ],
      benefits: [
        'Support for renewable energy',
        'Reduced carbon footprint',
        'Enhanced recovery rates',
        'Improved efficiency',
        'Compliance with environmental regulations',
      ],
      caseStudy: {
        title: 'Hydrogen Fueling Station Network Expansion',
        description:
          'Partnered with a major energy company to supply hydrogen for 50 new fueling stations, supporting the transition to zero-emission vehicles.',
        metrics: ['50 Stations', '1000+ Vehicles', 'Zero Emissions'],
      },
    },
    {
      id: 5,
      name: 'Construction',
      slug: 'construction',
      icon: WrenchScrewdriverIcon,
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
      heroImage:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
      clients: '500+ projects',
      stats: {
        projects: '1000+',
        countries: '20+',
        satisfaction: '95%',
        growth: '+25%',
      },
      gradient: 'from-red-600 to-rose-600',
      color: 'red',
      description:
        'Industrial gases for construction projects, including oxygen for cutting, acetylene for welding, and nitrogen for testing.',
      fullDescription:
        'We provide gases essential for construction projects of all sizes. Our solutions include oxygen and acetylene for cutting and welding, nitrogen for pressure testing pipelines, and CO2 for concrete curing. We deliver directly to job sites and offer portable cylinder solutions for remote locations.',
      applications: [
        'Steel Cutting & Welding',
        'Pipeline Testing',
        'Concrete Curing',
        'Demolition',
        'Bridge Construction',
        'High-rise Building',
      ],
      products: [
        { name: 'Oxygen', description: 'For cutting and welding steel' },
        { name: 'Acetylene', description: 'For high-temperature welding' },
        { name: 'Nitrogen', description: 'For pressure testing pipelines' },
        { name: 'CO2', description: 'For concrete curing' },
      ],
      benefits: [
        'On-site delivery',
        'Portable solutions',
        '24/7 availability',
        'Safety training',
        'Technical support',
      ],
      caseStudy: {
        title: 'Major Bridge Project Completed 2 Months Early',
        description:
          'Rapid gas delivery and technical support enabled a major infrastructure project to accelerate welding operations and finish ahead of schedule.',
        metrics: ['2 Months Early', '30% Faster Welding', '$5M Savings'],
      },
    },
  ];

  // Find industry by slug
  useEffect(() => {
    if (industryId) {
      const industry = industries.find((ind) => ind.slug === industryId);
      if (industry) {
        setSelectedIndustry(industry);
        setIsModalOpen(true);
      }
    }
  }, [industryId]);

  // Close modal and clear URL
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndustry(null);
    setActiveTab('overview');
    navigate('/industries');
  };

  // Handle industry click
  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setIsModalOpen(true);
    setActiveTab('overview');
    navigate(`/industries/${industry.slug}`);
  };

  // Render stars for satisfaction
  const renderStars = (satisfaction) => {
    const rating = parseInt(satisfaction) / 20; // Convert 95% to 4.75 stars
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <StarIconSolid key={i} className='w-4 h-4 text-yellow-400' />,
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <div key={i} className='relative'>
            <StarIconSolid className='w-4 h-4 text-yellow-400 opacity-50' />
            <div className='absolute inset-0 overflow-hidden w-1/2'>
              <StarIconSolid className='w-4 h-4 text-yellow-400' />
            </div>
          </div>,
        );
      } else {
        stars.push(<StarIcon key={i} className='w-4 h-4 text-gray-300' />);
      }
    }
    return stars;
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <style>{animationStyles}</style>

    <Navigation/>

      {/* Hero Section */}
      <div className='bg-[#ABCF42] text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up'>
              Industries We Serve
            </h1>
            <p className='text-xl text-blue-100 mb-8 animate-fade-in-up delay-100'>
              Comprehensive gas solutions tailored to the unique needs of each
              sector. From manufacturing to healthcare, we deliver excellence
              across industries.
            </p>
            <div className='flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200'>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
                <GlobeAltIcon className='w-5 h-5' />
                <span className='text-sm'>Global Presence</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
                <UsersIcon className='w-5 h-5' />
                <span className='text-sm'>1000+ Clients</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
                <ShieldCheckIcon className='w-5 h-5' />
                <span className='text-sm'>ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.id}
                onClick={() => handleIndustryClick(industry)}
                className='group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-fade-in-up'
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div
                  className={`relative h-48 bg-gradient-to-r ${industry.gradient} overflow-hidden`}>
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50'
                  />
                  <div className='absolute inset-0 bg-black/40'></div>
                  <div className='absolute bottom-4 left-4 right-4'>
                    <div className='flex items-center gap-2 text-white mb-2'>
                      <Icon className='w-6 h-6' />
                      <span className='text-sm font-medium'>
                        {industry.clients}
                      </span>
                    </div>
                    <h3 className='text-2xl font-bold text-white'>
                      {industry.name}
                    </h3>
                  </div>
                </div>
                <div className='p-6'>
                  <p className='text-gray-600 mb-4'>{industry.description}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      {renderStars(industry.stats.satisfaction)}
                    </div>
                    <span className='text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1'>
                      Learn More <ArrowRightIcon className='w-4 h-4' />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='bg-gray-100 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Industry Leaders Choose Trojan
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Over 25 years of excellence in providing industrial gas solutions
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center animate-fade-in-up delay-100'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <ShieldCheckIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Quality Assurance</h3>
              <p className='text-gray-600'>
                ISO 9001:2015 certified with rigorous quality control processes
              </p>
            </div>
            <div className='text-center animate-fade-in-up delay-200'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <TruckIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Reliable Delivery</h3>
              <p className='text-gray-600'>
                99.9% on-time delivery rate with 24/7 emergency support
              </p>
            </div>
            <div className='text-center animate-fade-in-up delay-300'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <AcademicCapIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Technical Expertise</h3>
              <p className='text-gray-600'>
                Dedicated engineering team with industry-specific knowledge
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className='bg-[#ABCF42] text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-4xl font-bold mb-2'>25+</div>
              <div className='text-sm text-blue-100'>Years of Excellence</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold mb-2'>1000+</div>
              <div className='text-sm text-blue-100'>Happy Clients</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold mb-2'>50+</div>
              <div className='text-sm text-blue-100'>Countries Served</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold mb-2'>99.9%</div>
              <div className='text-sm text-blue-100'>Safety Record</div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Detail Modal */}
      {isModalOpen && selectedIndustry && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4 py-8'>
            <div
              className='fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity'
              onClick={closeModal}></div>

            <div className='relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in'>
              <button
                onClick={closeModal}
                className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10 bg-white rounded-full p-1 shadow-md'>
                <XMarkIcon className='w-6 h-6' />
              </button>

              {/* Modal Header */}
              <div
                className={`bg-gradient-to-r ${selectedIndustry.gradient} text-white p-6 rounded-t-2xl`}>
                <div className='flex items-center gap-3 mb-4'>
                  <selectedIndustry.icon className='w-10 h-10' />
                  <span className='text-sm font-medium opacity-90'>
                    {selectedIndustry.clients}
                  </span>
                </div>
                <h2 className='text-3xl font-bold mb-2'>
                  {selectedIndustry.name}
                </h2>
                <p className='text-white/90'>{selectedIndustry.description}</p>
              </div>

              {/* Modal Content */}
              <div className='p-6'>
                {/* Tabs */}
                <div className='flex border-b border-gray-200 mb-6 overflow-x-auto'>
                  {[
                    'overview',
                    'applications',
                    'products',
                    'benefits',
                    'case-study',
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium transition whitespace-nowrap ${
                        activeTab === tab
                          ? `text-${selectedIndustry.color}-600 border-b-2 border-${selectedIndustry.color}-600`
                          : 'text-gray-500 hover:text-gray-700'
                      }`}>
                      {tab
                        .split('-')
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 mb-3'>
                        Industry Overview
                      </h3>
                      <p className='text-gray-600 leading-relaxed'>
                        {selectedIndustry.fullDescription}
                      </p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      {Object.entries(selectedIndustry.stats).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className='bg-gray-50 rounded-lg p-4 text-center'>
                            <div
                              className={`text-2xl font-bold text-${selectedIndustry.color}-600`}>
                              {value}
                            </div>
                            <div className='text-xs text-gray-500 capitalize mt-1'>
                              {key}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Key Applications
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      {selectedIndustry.applications.map((app, idx) => (
                        <div
                          key={idx}
                          className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                          <CheckCircleIcon
                            className={`w-5 h-5 text-${selectedIndustry.color}-500 flex-shrink-0`}
                          />
                          <span className='text-gray-700'>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Recommended Products
                    </h3>
                    <div className='space-y-3'>
                      {selectedIndustry.products.map((product, idx) => (
                        <div
                          key={idx}
                          className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition'>
                          <h4
                            className={`font-semibold text-${selectedIndustry.color}-600 mb-1`}>
                            {product.name}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {product.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Key Benefits
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      {selectedIndustry.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                          <CheckCircleIcon
                            className={`w-5 h-5 text-${selectedIndustry.color}-500 flex-shrink-0`}
                          />
                          <span className='text-gray-700'>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'case-study' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      {selectedIndustry.caseStudy.title}
                    </h3>
                    <p className='text-gray-600 mb-6 leading-relaxed'>
                      {selectedIndustry.caseStudy.description}
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      {selectedIndustry.caseStudy.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className={`bg-${selectedIndustry.color}-50 rounded-lg p-4 text-center border border-${selectedIndustry.color}-200`}>
                          <div
                            className={`text-lg font-bold text-${selectedIndustry.color}-600`}>
                            {metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className='mt-8 pt-6 border-t border-gray-200 flex gap-4'>
                  <Link
                    to='/products'
                    className={`flex-1 bg-[#ABCF42] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition text-center`}>
                    View Products
                  </Link>
                  <Link
                    to='/contact'
                    className='flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition text-center'>
                    Request Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4'>
                TROJAN
              </h3>
              <p className='text-gray-400 text-sm'>
                Powering industry with reliable gas solutions since 1985.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link to='/about' className='hover:text-white transition'>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to='/products' className='hover:text-white transition'>
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to='/industries'
                    className='hover:text-white transition'>
                    Industries
                  </Link>
                </li>
                <li>
                  <Link to='/contact' className='hover:text-white transition'>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Support</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link to='/help' className='hover:text-white transition'>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to='/sds' className='hover:text-white transition'>
                    Safety Data Sheets
                  </Link>
                </li>
                <li>
                  <Link to='/shipping' className='hover:text-white transition'>
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to='/returns' className='hover:text-white transition'>
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Connect</h4>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.682-5.282 14.2 14.2 0 001.565-6.192c.009-.21.009-.42.009-.63A9.93 9.93 0 0024 4.59a8.872 8.872 0 01-2.047.567z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm'>
            <p>
              &copy; {new Date().getFullYear()} Trojan Trading. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Industries;
