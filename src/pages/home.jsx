
import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Plus, Minus, ChevronRight } from "lucide-react";

const HomePage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Declared list of images
  const images = [
    "/images/person-getting.jpg",
    // url,
    "/images/group-children.jpg",
    "/images/child.jpg",
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img
              src="images/logo.png"
              alt="AguuraMuhinzi Logo"
              className="h-10"
            />
            <div className="hidden md:flex space-x-6 text-green-700 font-semibold">
              <a href="#" className="hover:text-green-800">Home</a>
              <a href="#" className="hover:text-green-800">About</a>
              <a href="#" className="hover:text-green-800">Services</a>
              <a href="#" className="hover:text-green-800">Projects</a>
              <a href="#" className="hover:text-green-800">Contact</a>
            </div>
          </div>
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 shadow-lg">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section - Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Green Overlay on One Side */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/60 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative text-center text-white max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn">
            AguuraMuhinzi
          </h1>
          <p className="text-xl md:text-2xl mb-6 animate-fadeIn delay-200">
            Connecting Local Farmers with Schools for a Sustainable Future
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
        </section>
   
      {/* About Us Section - Redesigned */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-green-500">
            <path d="M55.9,-60.8C70.2,-44.7,78.4,-25.8,79.7,-6.3C81,13.3,75.3,33.5,62.3,48C49.4,62.4,29.2,71.1,7.7,75.3C-13.9,79.6,-37,79.4,-57.1,69.5C-77.2,59.6,-94.4,40.1,-98.9,18.3C-103.4,-3.6,-95.2,-27.8,-80.1,-46.4C-65.1,-65,-42.1,-77.9,-20.1,-80.5C1.9,-83.1,41.6,-76.9,55.9,-60.8Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">Bridging Farmers and Schools for a Nourished Future</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="images/man.jpg" alt="Farmer" className="rounded-lg shadow-lg z-10 relative" />
              <img src="images/schoolFeeding.jpg" alt="School Garden" className="rounded-lg shadow-lg absolute -bottom-8 -right-8 w-2/3 border-4 border-white" />
              <div className="absolute -left-6 -top-6 w-24 h-24 bg-green-100 rounded-full"></div>
              <div className="absolute -right-6 -bottom-16 w-16 h-16 bg-green-200 rounded-full"></div>
            </div>
            
            <div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We connect <strong>local farmers</strong> with <strong>schools</strong>, ensuring a <strong>sustainable food supply</strong> and promoting <strong>better nutrition</strong> for students. By fostering direct partnerships, we create <strong>opportunities for farmers</strong> while improving <strong>school feeding programs</strong>.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-3xl font-bold mb-2">50+</div>
                  <p className="text-gray-700">Schools Partnered</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-3xl font-bold mb-2">200+</div>
                  <p className="text-gray-700">Local Farmers</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-3xl font-bold mb-2">10K+</div>
                  <p className="text-gray-700">Students Served</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-3xl font-bold mb-2">95%</div>
                  <p className="text-gray-700">Satisfaction Rate</p>
                </div>
              </div>
              
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - After About Us */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Strengths</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">Why Choose Us</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600">We bridge the gap between local farmers and school nutrition programs, creating sustainable partnerships that benefit communities.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left side - Image */}
              <div className="relative">
                <img 
                  src="images/vegetables.jpg" 
                  alt="Fresh vegetables" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-900 bg-opacity-30 flex items-center justify-center">
                  <a href="#" className="bg-white text-green-800 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 transition duration-300">
                    Watch Our Story
                  </a>
                </div>
              </div>
              
              {/* Right side - Text content */}
              <div className="p-10">
                <ul className="space-y-6">
                  {[
                    {
                      title: "Direct Farm-to-School Partnerships",
                      description: "We create direct supply chains between local farmers and schools, eliminating middlemen and ensuring fair compensation.",
                      icon: "🤝"
                    },
                    {
                      title: "Improved Student Nutrition",
                      description: "Our programs provide fresh, nutritious ingredients that improve the quality of school meals and student health.",
                      icon: "🥕"
                    },
                    {
                      title: "Environmental Sustainability",
                      description: "By sourcing locally, we reduce transportation emissions and promote sustainable farming practices.",
                      icon: "🌱"
                    },
                    {
                      title: "Community Economic Development",
                      description: "Our model strengthens local economies by supporting small-scale farmers and creating jobs.",
                      icon: "💰"
                    },
                    {
                      title: "Educational Opportunities",
                      description: "We facilitate farm visits, gardening programs, and nutrition education for students.",
                      icon: "📚"
                    }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4 text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">What We Offer</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fresh Vegetables", image: "images/vegetables.jpg", description: "Locally grown, organic vegetables directly from farmers." },
              { title: "Organic Products", image: "images/potatoes.jpg", description: "Healthy, pesticide-free products for better nutrition." },
              { title: "Dairy & Livestock", image: "images/cow.jpg", description: "Sustainable dairy and livestock farming support." },
            ].map((offer, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-64 object-cover transition duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-green-800">{offer.title}</h3>
                  <p className="text-gray-600 mt-3">{offer.description}</p>
                  <a href="#" className="inline-block mt-4 text-green-600 font-medium hover:text-green-700 transition duration-300">
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section - New */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Collaborations</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">Our Partners</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">We work with trusted organizations who share our vision for sustainable agriculture and improved nutrition for students.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center h-24">
                <img 
                  src={`images/wfp-logo.png`} 
                  alt={`Partner ${index}`} 
                  className="max-h-12 max-w-full opacity-60 hover:opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
              View All Partners
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Recently Completed Projects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Work</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">Recently Completed Projects</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={`images/project${item}.jpg`} 
                    alt={`Project ${item}`} 
                    className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-green-900 opacity-0 group-hover:opacity-50 transition duration-300 flex items-center justify-center">
                    <button className="bg-white text-green-800 font-medium py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                      View Project
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">School Garden Project {item}</h3>
                  <p className="text-gray-600 mb-4">
                    Established sustainable garden at local school, providing fresh produce for student meals.
                  </p>
                  <a href="#" className="text-green-600 font-medium hover:text-green-700 flex items-center">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section  */}
      <section className="py-24 bg-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/4 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-green-600">
            <path d="M30.5,-51.7C38.9,-41.3,44.5,-31.6,51.2,-20.7C57.9,-9.8,65.8,2.3,66.4,15.3C67,28.3,60.4,42.3,49.7,50.9C39,59.5,24.2,62.7,10.1,63.6C-3.9,64.5,-17.3,63.1,-28.6,57.5C-39.8,51.9,-49,42.1,-55.8,30.1C-62.7,18.1,-67.2,3.9,-66,-9.8C-64.8,-23.6,-57.9,-36.8,-47.5,-47.2C-37.1,-57.6,-23,-65.1,-9.2,-63.9C4.6,-62.7,22.1,-62,30.5,-51.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">Contact Us</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Map and Contact Info */}
              <div className="relative">
                <div className="h-full">
                  <img src="images/map-wfp.png" alt="Map" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-green-900 bg-opacity-70 p-10 flex flex-col justify-center text-white">
                  <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 mr-4 text-green-300" />
                      <div>
                        <h4 className="font-medium mb-1">Our Location</h4>
                        <p className="text-green-100">123 Farm Road, Kigali, Rwanda</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 mr-4 text-green-300" />
                      <div>
                        <h4 className="font-medium mb-1">Call Us</h4>
                        <p className="text-green-100">+250 781 234 567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="w-6 h-6 mr-4 text-green-300" />
                      <div>
                        <h4 className="font-medium mb-1">Email Us</h4>
                        <p className="text-green-100">contact@aguuramuhinzi.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h4 className="font-medium mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                        <a 
                          key={social} 
                          href="#" 
                          className="w-10 h-10 rounded-full bg-green-800 hover:bg-green-600 flex items-center justify-center transition duration-300"
                        >
                          <img src={`/api/placeholder/20/20`} alt={social} className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="p-10">
                <h3 className="text-2xl font-semibold text-green-900 mb-6">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="message">Your Message</label>
                    <textarea 
                      id="message"
                      rows="5" 
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our People</span>
            <h2 className="text-4xl font-bold mt-2 text-green-900">Meet Our Team</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { name: "John Doe", role: "Founder", image: "images/team1.jpg" },
              { name: "Jane Smith", role: "Agronomist", image: "images/team1.jpg" },
              { name: "Michael Brown", role: "Logistics", image: "images/team1.jpg" },
              { name: "Lucy White", role: "Coordinator", image: "images/team1.jpg" },
              { name: "James Green", role: "Marketing", image: "images/team1.jpg" },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover transition duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-green-900 opacity-0 group-hover:opacity-60 transition duration-300 flex items-center justify-center">
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                      {['facebook', 'twitter', 'linkedin'].map((social) => (
                        <a 
                          key={social} 
                          href="#" 
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-green-100 transition duration-200"
                        >
                          <img src={`/api/placeholder/15/15`} alt={social} className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-green-800 text-center">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Person with plants */}
            <div className="relative">
              <img 
                src="images/hands.jpg" 
                alt="Person holding plants" 
                className="rounded-lg shadow-xl max-w-md mx-auto"
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-4 px-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-center">Let's Talk</h3>
              </div>
            </div>
            
            {/* Right side - FAQs */}
            <div>
              <div className="mb-8">
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
                <h2 className="text-3xl font-bold mt-2 text-green-900">You've Any Questions</h2>
                <div className="w-16 h-1 bg-green-600 mt-4"></div>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    question: "What's kitchen transformation for impact?", 
                    answer: "Our kitchen transformation program helps schools update their facilities to better handle fresh, local produce while reducing food waste and improving nutrition."
                  },
                  { 
                    question: "Let's grow green and eat naturally", 
                    answer: "This is our core philosophy that embraces sustainable farming practices while promoting natural, unprocessed foods in school meals for healthier students and a healthier planet."
                  },
                  { 
                    question: "Best vegetables for your healthy food", 
                    answer: "We work with farmers to grow nutrient-dense vegetables like leafy greens, carrots, peppers, and tomatoes that are perfect for school meal programs and student nutrition."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <button 
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                      <ChevronRight 
                        className={`w-5 h-5 text-green-600 transition-transform duration-300 ${openFAQ === index ? 'transform rotate-90' : ''}`}
                      />
                    </button>
                    {openFAQ === index && (
                      <p className="mt-3 text-gray-600">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-900 text-white">
         <div className="container mx-auto px-6 py-12">
           <div className="grid md:grid-cols-4 gap-8">
            <div>
               <h3 className="text-lg font-semibold mb-4">About Us</h3>
               <p className="text-gray-300">Empowering farmers and communities through sustainable agriculture.</p>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
               <ul className="space-y-2 text-gray-300">
                 <li><a href="#" className="hover:text-white">Home</a></li>
                 <li><a href="#" className="hover:text-white">About</a></li>
                 <li><a href="#" className="hover:text-white">Services</a></li>
               </ul>
             </div>
             <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
               <p className="text-gray-300">123 Farm Road, Kigali</p>
               <p className="text-gray-300">contact@aguura.com</p>
             </div>
           </div>
         </div>
       </footer>
     </div>
   );
 };

 export default HomePage;