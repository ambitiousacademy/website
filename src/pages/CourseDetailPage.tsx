
import { useState, useEffect } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, Users, BookOpen, Award, ArrowLeft, Briefcase, GraduationCap, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "react-router-dom"

interface Module {
  id: string
  title: string
  lessons: string[]
  courseId: string
  duration: string
}

interface Course {
  id: string
  title: string
  instructor: {
    id: string
    name: string
    profileImageUrl?: string
    profileSummary: string
    about: string
    featured?: boolean
    areasOfPractice: string[]
    courtsOfPractice: string[]
    experienceHighlights: string[]
    pastRoles: {
      title: string
      organization: string
      duration: string
      responsibilities: string[]
    }[]
    keyClients: {
      name: string
      description: string
    }[]
    education: {
      degree: string
      institution: string
      year: string
    }[]
    technicalSkills: string[]
    languagesKnown: string[]
  }
  description: string
  importance: string
  duration: string
  price: number
  discount?: number
  image: string
  rating: number
  classesPerWeek: number
  totalClasses: number
  mode: string
  modules: Module[]
  assessmentDetails: string
  internshipDetails: string
  createdAt: string
  updatedAt: string
}

interface PastRole {
  title: string
  responsibilities: string[]
}

interface Client {
  title: string
  description?: string
}

interface Education {
  degree: string
  institution: string
  duration?: string
}

interface Mentor {
  id: string
  profileImageUrl?: string
  name: string
  profileSummary: string
  about: string
  areasOfPractice: string[]
  courtsOfPractice: string[]
  experienceHighlights: string[]
  pastRoles: PastRole[]
  keyClients: Client[]
  education: Education[]
  technicalSkills: string[]
  languagesKnown: string[]
  createdAt: string
  updatedAt: string
}

const API_BASE_URL =  "http://localhost:3000"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [mentorLoading, setMentorLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch course details")
        }
        const data = await response.json()
        setCourse(data)
        setMentorLoading(false)
      } catch (err) {
        console.error("Error fetching course:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

 
  
  const finalPrice = course?.discount ? course.price - (course.price * course.discount) / 100 : course?.price

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
        </div>
      </Layout>
    )
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Course</h2>
          <p className="text-gray-600 mb-6">{error || "Course not found"}</p>
          <Button asChild>
            <a href="/courses">Back to Courses</a>
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Course Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/courses" className="inline-flex items-center text-gray-300 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-300" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-gray-300" />
                  <span>{course.classesPerWeek} classes per week</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-gray-300" />
                  <span>{course.totalClasses} total classes</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-gray-300" />
                  <span>Mode: {course.mode}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 font-medium">Instructor:</div>
                <div>{course.instructor.name}</div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg?height=200&width=400"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium">Price:</span>
                      {course.discount ? (
                        <div className="text-right">
                          <span className="text-gray-500 line-through block">₹{course.price}</span>
                          <span className="text-2xl font-bold text-academy-teal">₹{finalPrice}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-academy-teal">₹{course.price}</span>
                      )}
                    </div>
                    {course.discount && (
                      <div className="bg-academy-teal/10 text-academy-teal text-sm p-2 rounded mb-4">
                        Save {course.discount}% - Limited time offer!
                      </div>
                    )}
                  </div>
                  <Button className="w-full bg-academy-teal hover:bg-academy-teal/90 text-white mb-4">
                    Enroll Now
                  </Button>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-academy-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Full course access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-academy-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-academy-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Internship opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-academy-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lifetime access to materials</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="curriculum">
          <TabsList className="mb-8">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="importance">Importance</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="internship">Internship</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module, index) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-start">
                        <div className="bg-academy-teal/10 text-academy-teal font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-500">
                            {module.duration} • {module.lessons.length} lessons
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="pl-12 space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-xs">
                              {lessonIndex + 1}
                            </div>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="importance">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Why This Course Matters</h2>
              <div className="prose max-w-none">
                <p>{course.importance}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assessment">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Assessment Details</h2>
              <div className="prose max-w-none">
                <p>{course.assessmentDetails}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="internship">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Internship Opportunities</h2>
              <div className="prose max-w-none">
                <p>{course.internshipDetails}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="instructor">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Meet Your Instructor</h2>

              {mentorLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-academy-teal"></div>
                </div>
              ) : course.instructor ? (
                <div>
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="md:w-1/4">
                      <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                        <Avatar className="h-full w-full">
                          <AvatarImage
                            src={course.instructor.profileImageUrl || "/placeholder.svg?height=300&width=300"}
                            alt={course.instructor.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-4xl">{course.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Areas of Practice</h3>
                          <div className="flex flex-wrap gap-2">
                            {course.instructor.areasOfPractice.slice(0, 5).map((area, index) => (
                              <Badge key={index} variant="outline" className="bg-academy-teal/10 text-academy-teal">
                                {area}
                              </Badge>
                            ))}
                            {course.instructor.areasOfPractice.length > 5 && (
                              <Badge variant="outline" className="bg-gray-100">
                                +{course.instructor.areasOfPractice.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Courts of Practice</h3>
                          <ul className="text-sm space-y-1">
                            {course.instructor.courtsOfPractice.map((court, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-academy-teal rounded-full mr-2"></span>
                                {court}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-3/4">
                      <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                      <p className="text-gray-600 italic mb-4">{course.instructor.profileSummary}</p>

                      <div className="prose max-w-none mb-6">
                        <p>{course.instructor.about}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-academy-teal" />
                            Professional Experience
                          </h4>
                          <div className="space-y-4">
                            {course.instructor.pastRoles.map((role, index) => (
                              <div key={index} className="border-l-2 border-academy-teal/30 pl-4">
                                <h5 className="font-medium">{role.title}</h5>
                                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                                  {role.responsibilities.slice(0, 2).map((resp, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="w-1.5 h-1.5 bg-academy-teal rounded-full mr-2 mt-1.5"></span>
                                      {resp}
                                    </li>
                                  ))}
                                  {role.responsibilities.length > 2 && (
                                    <li className="text-academy-teal text-xs font-medium">
                                      +{role.responsibilities.length - 2} more responsibilities
                                    </li>
                                  )}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center">
                            <GraduationCap className="mr-2 h-5 w-5 text-academy-teal" />
                            Education
                          </h4>
                          <div className="space-y-3">
                            {course.instructor.education.map((edu, index) => (
                              <div key={index} className="border-l-2 border-academy-teal/30 pl-4">
                                <h5 className="font-medium">{edu.degree}</h5>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                                {edu.year && <p className="text-xs text-gray-500">{edu.year}</p>}
                              </div>
                            ))}
                          </div>

                          <h4 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                            <Globe className="mr-2 h-5 w-5 text-academy-teal" />
                            Languages
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.instructor.languagesKnown.map((lang, index) => (
                              <Badge key={index} variant="outline">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {course.instructor.keyClients && course.instructor.keyClients.length > 0 && (
                    <div className="mt-8 border-t pt-6">
                      <h4 className="text-lg font-semibold mb-4">Key Clients</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {course.instructor.keyClients.map((client, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium mb-1">{client.name}</h5>
                            {client.description && <p className="text-sm text-gray-600">{client.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Detailed information about {course.instructor.name} is not available at the moment.
                  </p>
                  <p className="text-sm text-gray-500">
                    The instructor for this course is a qualified legal professional with expertise in this subject
                    area.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
