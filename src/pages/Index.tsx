import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CourseCard from "@/components/CourseCard";
import InstructorCard from "@/components/InstructorCard";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { api } from "@/api/api";

interface Module {
  id: string;
  title: string;
  lessons: string[];
  courseId: string;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: {
    id: string;
    name: string;
    profileImageUrl?: string;
    profileSummary: string;
    about: string;
    featured?: boolean;
    areasOfPractice: string[];
    courtsOfPractice: string[];
    experienceHighlights: string[];
    pastRoles: {
      title: string;
      organization: string;
      duration: string;
    }[];
    keyClients: {
      name: string;
      description: string;
    }[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    technicalSkills: string[];
    languagesKnown: string[];
  };
  description: string;
  importance: string;
  duration: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  classesPerWeek: number;
  totalClasses: number;
  mode: string;
  modules: Module[];
  assessmentDetails: string;
  internshipDetails: string;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  level: "Beginner" | "Intermediate" | "Advanced";
  category?: string;
  students: number;
}

interface PastRole {
  title: string;
  responsibilities: string[];
}

interface Client {
  title: string;
  description?: string;
}

interface Education {
  degree: string;
  institution: string;
  duration?: string;
}

export interface Mentor {
  id: string;
  profileImageUrl?: string;
  name: string;
  profileSummary: string;
  about: string;
  areasOfPractice: string[];
  courtsOfPractice: string[];
  experienceHighlights: string[];
  pastRoles: PastRole[];
  keyClients: Client[];
  education: Education[];
  technicalSkills: string[];
  languagesKnown: string[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Recent Changes in Corporate Law",
    excerpt:
      "An analysis of the latest regulatory changes affecting corporate entities...",
    author: "Jane Smith, Esq.",
    date: "2023-05-15",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Corporate Law",
    content: "This is the full content of the blog post about corporate law.",
    featured: true,
  },
  {
    id: "2",
    title: "The Future of Legal Tech: AI and Automation",
    excerpt:
      "How artificial intelligence is transforming legal research and practice...",
    author: "Michael Johnson, J.D.",
    date: "2023-05-10",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Legal Technology",
    content:
      "This is the full content of the blog post about legal technology.",
    featured: true,
  },
];


export default function Index() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState({
    courses: true,
    mentors: true,
  });
  const [error, setError] = useState({
    courses: null,
    mentors: null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await api.getCourses();
        const mappedCourses = coursesData.map((course) => ({
          ...course,
          instructor: typeof course.instructor === "string"
            ? { id: course.instructor, name: "Unknown", profileSummary: "", about: "", areasOfPractice: [], courtsOfPractice: [], experienceHighlights: [], keyClients: [], education: [], technicalSkills: [], languagesKnown: [] }
            : course.instructor,
          level: course.level || "Beginner",
          category: course.category || "General",
          students: course.students || 0,
        })) as Course[];
        setCourses(mappedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError((prev) => ({
          ...prev,
          courses: err instanceof Error ? err.message : "Unknown error",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, courses: false }));
      }
    };

    const fetchMentors = async () => {
      try {
        const mentorsData = await api.getMentors();
        setMentors(mentorsData);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError((prev) => ({
          ...prev,
          mentors: err instanceof Error ? err.message : "Unknown error",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, mentors: false }));
      }
    };

    fetchCourses();
    fetchMentors();
  }, []);



  // console.l("Courses:", courses);
  // console.log("Mentors:", mentors);

  const featuredCourses = courses.filter((course) => course.featured);
  const featuredInstructors = mentors.filter((mentor) => mentor.featured);
  const featuredPosts = blogPosts.filter((post) => post.featured);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Advance Your Legal Career with Expert-Led Courses
              </h1>
              <p className="text-lg mb-8">
                The Ambitious Academy offers specialized legal education taught
                by practicing attorneys and renowned professors. Develop
                practical skills and deep knowledge for today's legal
                challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-academy-teal hover:bg-academy-teal/90 text-white px-8 py-6"
                >
                  <a href="/courses">Explore Courses</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-white text-white px-8 py-6"
                >
                  <a href="/about">About Us</a>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-academy-orange rounded-full opacity-30 blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-academy-teal rounded-full opacity-30 blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1454923634634-bd1614719a7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Legal professionals in discussion"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Courses</h2>
              <p className="text-gray-600 mt-2">
                Explore our most popular legal courses
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-academy-teal text-academy-teal hover:bg-academy-teal/10"
            >
              <a href="/courses">View All Courses</a>
            </Button>
          </div>

          {loading.courses ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
            </div>
          ) : error.courses ? (
            <div className="text-center py-12 text-red-500">
              <p>Error loading courses: {error.courses}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                 
                <CourseCard key={course.id} course={{ ...course, category: course.category || "General" }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Why Choose The Ambitious Academy
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Our specialized approach to legal education sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-academy-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Expert Practitioners
              </h3>
              <p className="text-gray-600">
                Learn from practicing attorneys and renowned professors with
                real-world experience.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-academy-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Practical Skills Focus
              </h3>
              <p className="text-gray-600">
                Curriculum designed to develop applicable skills for immediate
                use in legal practice.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-academy-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
              <p className="text-gray-600">
                Self-paced courses that fit your schedule and professional
                demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
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
                  className={`${
                    featuredInstructors.length === 2 && index === 0
                      ? "lg:col-start-2"
                      : ""
                  }`}
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Legal Insights Blog</h2>
              <p className="text-gray-600 mt-2">
                Expert analysis of current legal trends and developments
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-academy-teal text-academy-teal hover:bg-academy-teal/10"
            >
              <a href="/blog">View All Articles</a>
            </Button>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-academy-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Advance Your Legal Career?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of legal professionals who have enhanced their
              practice through The Ambitious Academy's specialized courses.
            </p>
            <SignedOut>
              <SignUpButton>
                <Button className="bg-academy-teal hover:bg-academy-teal/90 text-white px-8 py-4">
                  Sign Up Now
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button className="bg-academy-teal hover:bg-academy-teal/90 text-white px-8 py-4">
                <a href="/courses">Explore Courses</a>
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>
    </Layout>
  );
}
