import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { BookOpen, Award, Users } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding and information */}
      <div className="hidden md:flex md:w-4/6 items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <Link to="/" className="flex items-center mb-12">
            <img
              src="/lovable-uploads/815cd29c-446f-40f0-b61d-5257a5640d0e.png"
              alt="The Ambitious Academy Logo"
              className="h-12 w-auto"
            />
            <span className="ml-3 text-xl font-bold text-white">The Ambitious Academy</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community of Legal Professionals
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Create your account to access specialized legal education taught by practicing attorneys
            and renowned professors.
          </p>

          <div className="space-y-6 mt-12">
            <div className="flex items-start space-x-2">
              <div className="bg-academy-teal/20 p-2 rounded-full">
                <BookOpen className="h-6 w-6 text-academy-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-start text-white ">Expert-Led Courses</h3>
                <p className="text-gray-300">Learn from practicing attorneys and legal experts</p>
              </div>
            </div>

            <div className="flex items-start  space-x-4">
              <div className="bg-academy-orange/20 p-2 rounded-full">
                <Award className="h-6 w-6 text-academy-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-start text-white">Practical Skills Focus</h3>
                <p className="text-gray-300">
                  Develop applicable skills for immediate use in legal practice
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-academy-teal/20 p-2 rounded-full">
                <Users className="h-6 w-6 text-academy-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-start text-white">Supportive Community</h3>
                <p className="text-gray-300">Connect with peers and mentors in the legal field</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-700  mx-auto text-center">
            <p className="text-sm text-gray-400">
              "The Ambitious Academy has been instrumental in advancing my legal career. The courses
              are practical, relevant, and taught by true experts in the field."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="mt-4 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                  DD
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Mr. Devashish Dwivedi</p>
                  <p className="text-sm text-gray-400">Co-Founder</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                  PV
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Mr. Prabudh Vyas</p>
                  <p className="text-sm text-gray-400">Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:w-2/6 items-center justify-center p-6 bg-white">
        {/* Mobile logo */}
        <div className="md:hidden flex items-center mb-8">
          <img
            src="/lovable-uploads/815cd29c-446f-40f0-b61d-5257a5640d0e.png"
            alt="The Ambitious Academy Logo"
            className="h-10 w-auto"
          />
          <span className="ml-3 text-xl font-bold text-gray-900">The Ambitious Academy</span>
        </div>

        <div className="w-full max-w-md flex items-center justify-center flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">SignUp to Your Account</h2>
            <p className="text-gray-600 mt-2">
              Join thousands of legal professionals advancing their careers
            </p>
          </div>

          <SignIn />

          <div className="mt-12 text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-academy-teal">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-academy-teal">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
