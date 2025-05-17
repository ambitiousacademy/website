import InstructorCard from "@/components/InstructorCard"
import { useEffect, useState } from "react"
import { api } from "@/api/api"
import type { Mentor } from "./Index"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Layout from "@/components/Layout"

const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% / 2));
    }
  }
  
  .animate-scroll {
    animation: scroll 30s linear infinite;
  }
`

const AboutPage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [feedback, setFeedbacks] = useState([])
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  const [loading, setLoading] = useState({
    courses: true,
    mentors: true,
  })
  const [error, setError] = useState({
    courses: null,
    mentors: null,
  })

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackData = await api.getFeedbacks()
        setFeedbacks(feedbackData)
      } catch (err) {
        console.error("Error fetching feedbacks:", err)
        setError((prev) => ({
          ...prev,
          mentors: err instanceof Error ? err.message : "Unknown error",
        }))
      } finally {
        setLoading((prev) => ({ ...prev, mentors: false }))
      }
    }
    const fetchMentors = async () => {
      try {
        const mentorsData = await api.getMentors()
        setMentors(mentorsData)
      } catch (err) {
        console.error("Error fetching mentors:", err)
        setError((prev) => ({
          ...prev,
          mentors: err instanceof Error ? err.message : "Unknown error",
        }))
      } finally {
        setLoading((prev) => ({ ...prev, mentors: false }))
      }
    }
    fetchFeedback()
    fetchMentors()
  }, [])

  const featuredInstructors = mentors.filter((mentor) => mentor.featured)

  return (
    <Layout>
      <style>
        {scrollbarHideStyle}
      </style>

      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">About THE AMBITIOUS ACADEMY</h1>
          <p className="text-xl max-w-3xl">Your premier destination for skill development and academic excellence.</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Welcome to THE AMBITIOUS ACADEMY</h2>
              <p className="text-gray-600 mb-4">
                At THE AMBITIOUS ACADEMY, we are committed to being your premier destination for skill development and
                academic excellence. Our online learning platform is meticulously designed to serve individuals at
                various stages of their educational and professional journeys.
              </p>
              <p className="text-gray-600">
                We offer a comprehensive range of resources and services that help you achieve your goals and maximize
                your potential.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Legal professionals in discussion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg bg-academy-teal opacity-20 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-lg bg-academy-orange opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Offerings Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Offerings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="w-16 h-16 bg-academy-red/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-academy-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Certification Courses</h3>
              <p className="text-gray-600">
                Our diverse range of certification courses is crafted to enhance your career prospects. Whether you aim
                to upskill, reskill, or explore a new field, our courses meet industry standards and provide practical
                knowledge and skills. We offer specialized courses such as Law Certification Online and Skill
                Development Programs via various Skill Development Courses and Workshops.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="w-16 h-16 bg-academy-teal/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-academy-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Webinars and Seminars</h3>
              <p className="text-gray-600">
                Learning from experts is a core aspect of our educational philosophy. We host insightful webinars and
                seminars led by industry leaders and subject matter experts, providing up-to-date information, practical
                advice, and valuable insights to help you stay ahead in your field.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="w-16 h-16 bg-academy-orange/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-academy-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Educational Podcasts</h3>
              <p className="text-gray-600">
                Our educational podcasts cover a wide range of topics, offering an accessible way to enhance your
                knowledge and stay informed about the latest trends and best practices in various fields, including new
                government laws. Tune in to our podcasts for insights on free online certificate courses for law
                students and other relevant topics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Blogs and Articles</h3>
              <p className="text-gray-600">
                Our blog and article section is a treasure trove of information and insights. Covering a wide range of
                topics, our content provides multi-dimensional perspectives on various subjects. Whether you seek
                industry trends, academic advice, or personal development tips, our blogs and articles enrich your
                learning experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Freelancing Section</h3>
              <p className="text-gray-600">
                Our freelancing section connects freelancers with potential clients. Freelancers can create profiles,
                showcase their skills, and bid for projects in their niche. Clients can post job advertisements and find
                talented professionals to meet their needs, creating a dynamic and efficient marketplace.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Development & Internships</h3>
              <p className="text-gray-600">
                Our skill development programs provide practical skills required in today's job market. From technical
                to soft skills, we cover competencies that enhance your employability. We also offer internship programs
                that provide hands-on experience and exposure to real-world scenarios, helping you apply theoretical
                knowledge in practical settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Mission and Vision</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Empowering your journey to success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                At THE AMBITIOUS ACADEMY, our mission is to make high-quality education accessible and effective for
                everyone. We believe that education is the key to empowerment, and we are committed to providing the
                tools and resources necessary for individuals to achieve their ambitions.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Empowering Your Journey</h3>
              <p className="text-gray-600 mb-4">
                We understand that every learner has unique goals and aspirations. Whether you're aiming to enhance your
                skills, prepare for a challenging exam, expand your knowledge base, or find freelance opportunities, THE
                AMBITIOUS ACADEMY is here to support you every step of the way.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Join Us</h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Take the first step towards achieving your ambitions by joining THE AMBITIOUS ACADEMY. Our community of
              learners is diverse, motivated, and dedicated to excellence. By becoming a part of our academy, you'll
              gain access to top-notch educational resources, expert-led sessions, a supportive environment, and a
              vibrant freelancing marketplace that fosters growth and success.
            </p>
            <p className="text-gray-600 font-medium">
              Join us today and take a step closer to realizing your ambitions. Together, we can unlock your potential
              and pave the way for a brighter future.
            </p>
            <p className="text-gray-800 font-semibold mt-6">
              Welcome to THE AMBITIOUS ACADEMY, where your success story begins.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Expert Faculty</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Learn from experienced professionals and renowned academics
            </p>
          </div>

          {loading.mentors ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
            </div>
          ) : error.mentors ? (
            <div className="text-center py-12 text-red-500">
              <p>Error loading faculty: {error.mentors}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
              {featuredInstructors.map((mentor, index) => (
                <div
                  key={mentor.id}
                  className={`${featuredInstructors.length === 2 && index === 0 ? "lg:col-start-2" : ""}`}
                >
                  <InstructorCard
                    instructor={{
                      id: mentor.id,
                      name: mentor.name,
                      title: mentor.name,
                      bio: mentor.profileSummary,
                      image: mentor.profileImageUrl || "",
                      specializations: mentor.areasOfPractice,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-academy-teal text-academy-teal hover:bg-academy-teal/10"
            >
              <a href="/about#faculty">View All Faculty</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Students Say</h2>

          {loading.mentors ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
            </div>
          ) : error.mentors ? (
            <div className="text-center py-12 text-red-500">
              <p>Error loading feedback: {error.mentors}</p>
            </div>
          ) : (
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 space-x-6 scroll-smooth">
                <div className="flex animate-scroll space-x-6">
                  {/* First set of testimonials */}
                  {feedback.map((item, index) => (
                    <div
                      key={`original-${index}`}
                      className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 min-w-[300px] md:min-w-[350px] flex-shrink-0"
                    >
                      <div className="flex mb-6">
                        {[...Array(item.panelDiscussionRating || 5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-academy-orange fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6">"{item.feedbackText}"</p>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.collegeAndCourse || "Student"}</p>
                        {item.feedbackFor && <p className="text-xs text-gray-400 mt-1">For: {item.feedbackFor}</p>}
                      </div>
                    </div>
                  ))}

                  {/* Duplicate testimonials for infinite scroll effect */}
                  {feedback.map((item, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 min-w-[300px] md:min-w-[350px] flex-shrink-0"
                    >
                      <div className="flex mb-6">
                        {[...Array(item.panelDiscussionRating || 5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-academy-orange fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6">"{item.feedbackText}"</p>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.collegeAndCourse || "Student"}</p>
                        {item.feedbackFor && <p className="text-xs text-gray-400 mt-1">For: {item.feedbackFor}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Privacy Policy Section */}
      (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h2>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm space-y-6">
            {/* Introduction */}
            <div>
              <button
                onClick={() => toggleSection("intro")}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800"
              >
                Introduction
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openSection === "intro" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openSection === "intro" && (
                <p className="text-gray-600 mt-2">
                  Welcome to THE AMBITIOUS ACADEMY. We are committed to protecting your privacy...
                </p>
              )}
            </div>

            {/* Information We Collect */}
            <div>
              <button
                onClick={() => toggleSection("info")}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800"
              >
                Information We Collect
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openSection === "info" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openSection === "info" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Personal Information</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Name</li>
                      <li>Email Address</li>
                      <li>Contact Number</li>
                      <li>Payment Information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Non-Personal Information</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Browser Type</li>
                      <li>IP Address</li>
                      <li>Operating System</li>
                      <li>Website Usage Data</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* How We Use Your Information */}
            <div>
              <button
                onClick={() => toggleSection("usage")}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800"
              >
                How We Use Your Information
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openSection === "usage" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openSection === "usage" && (
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-4">
                  <li>
                    <span className="font-medium">To Provide and Manage Services:</span> Including registration,
                    account management, and processing payments.
                  </li>
                  <li>
                    <span className="font-medium">To Improve Our Services:</span> Using feedback and usage data to
                    enhance our offerings.
                  </li>
                  <li>
                    <span className="font-medium">To Communicate with You:</span> Sending updates, newsletters, and
                    responding to inquiries.
                  </li>
                  <li>
                    <span className="font-medium">To Ensure Security:</span> Protecting against unauthorized access and
                    ensuring secure transactions.
                  </li>
                </ul>
              )}
            </div>

            {/* Data Security */}
            <div>
              <button
                onClick={() => toggleSection("security")}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800"
              >
                Data Security
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openSection === "security" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openSection === "security" && (
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-4">
                  <li>
                    <span className="font-medium">Encryption:</span> All sensitive information, including payment
                    data, is encrypted during transmission via Secure Socket Layer (SSL) technology.
                  </li>
                  <li>
                    <span className="font-medium">Access Controls:</span> Personal data is accessible only to
                    authorized personnel.
                  </li>
                  <li>
                    <span className="font-medium">Regular Audits:</span> Periodic security audits to identify and
                    rectify vulnerabilities.
                  </li>
                </ul>
              )}
            </div>

            {/* Contact Us */}
            <div>
              <button
                onClick={() => toggleSection("contact")}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800"
              >
                Contact Us
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openSection === "contact" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openSection === "contact" && (
                <div className="text-gray-600 mt-4 space-y-2">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> theambitiousacademy.taa@gmail.com
                    <br />
                    <span className="font-medium">Phone:</span> +91-8818880220
                  </p>
                  <p>
                    By using our website, you consent to our Privacy Policy. Thank you for trusting THE AMBITIOUS
                    ACADEMY with your personal data.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-academy-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have enhanced their skills and knowledge through THE AMBITIOUS ACADEMY's
            specialized courses and resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/courses"
              className="inline-block bg-academy-teal hover:bg-academy-teal/90 text-white font-medium py-3 px-6 rounded-md"
            >
              Browse Courses
            </a>
            <a
              href="/contact"
              className="inline-block bg-white text-academy-teal border border-academy-teal font-medium py-3 px-6 rounded-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AboutPage
