import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface Module {
  id: string;
  title: string;
  lessons: string[];
  courseId: string;
  duration: string;
}

interface Course {
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
  }
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
  category?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  students: number;
}

const API_BASE_URL = "http://localhost:3000";

export default function CoursesPage() {
  const navigate = useNavigate();
  const searchParams = useParams();
  const categoryParam = searchParams.category;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(
    categoryParam
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/courses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();

        const transformedCourses = data.map((course: Course) => {
          const category =
            course.modules && course.modules.length > 0
              ? course.modules[0].title.split(" ")[0]
              : "General";

          const level =
            course.price < 5000
              ? "Beginner"
              : course.price < 10000
              ? "Intermediate"
              : "Advanced";

          const students = Math.floor(Math.random() * 1000) + 50;

          return {
            ...course,
            category,
            level,
            students,
          };
        });

        setCourses(transformedCourses);
        setFilteredCourses(transformedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  useEffect(() => {
    let result = courses;

    if (activeFilter) {
      result = result.filter(
        (course) =>
          course.category?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(result);

    if (activeFilter) {
      navigate(`/courses?category=${activeFilter}`, { replace: true });
    } else if (searchParams.category) {
      navigate("/courses");
    }
  }, [activeFilter, searchTerm, courses, navigate, searchParams]);

  const handleFilterClick = (category: string | null) => {
    setActiveFilter(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Explore Our Legal Courses</h1>
          <p className="text-xl max-w-3xl">
            Discover specialized courses designed to enhance your legal
            expertise, taught by experienced practitioners and respected
            academics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          {/* Category Filters */}
          <div className="flex overflow-x-auto pb-2 space-x-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              onClick={() => handleFilterClick(null)}
              className={activeFilter === null ? "bg-academy-teal" : ""}
            >
              All Courses
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => handleFilterClick(category)}
                className={
                  activeFilter === category
                    ? "bg-academy-teal whitespace-nowrap"
                    : "whitespace-nowrap"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <form onSubmit={handleSearch} className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-[300px]"
              />
            </form>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">
              Error loading courses
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try again
            </Button>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search term
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter(null);
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={{
                  ...course,
                  level: course.level || "Beginner",
                  category: course.category || "General",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
