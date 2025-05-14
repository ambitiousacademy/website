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
    instructor: string
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
    featured?: boolean
  }
  
  const API_BASE_URL = "http://localhost:3000"
  
  /**
   * API service for The Ambitious Academy
   */
  export const api = {
    /**
     * Fetch all courses
     * @returns Promise with array of courses
     */
    getCourses: async (): Promise<Course[]> => {
      const response = await fetch(`${API_BASE_URL}/courses`)
      if (!response.ok) {
        throw new Error("Failed to fetch courses")
      }
      const data = await response.json()
      return data
    },
  
    /**
     * Fetch a single course by ID
     * @param id Course ID
     * @returns Promise with course details
     */
    getCourse: async (id: string): Promise<Course> => {
      const response = await fetch(`${API_BASE_URL}/courses/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch course")
      }
      return await response.json()
    },
  
    /**
     * Fetch all mentors
     * @returns Promise with array of mentors
     */
    getMentors: async (): Promise<Mentor[]> => {
      const response = await fetch(`${API_BASE_URL}/mentors`)
      if (!response.ok) {
        throw new Error("Failed to fetch mentors")
      }
      const data = await response.json()
      return data
    },
  
    /**
     * Fetch a single mentor by ID
     * @param id Mentor ID
     * @returns Promise with mentor details
     */
    getMentor: async (id: string): Promise<Mentor> => {
      const response = await fetch(`${API_BASE_URL}/mentors/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch mentor")
      }
      return await response.json()
    },
  }
  