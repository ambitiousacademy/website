import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-gray-700 font-medium hover:text-academy-teal">
        Home
      </Link>
      <Link to="/courses" className="text-gray-700 font-medium hover:text-academy-teal">
        Courses
      </Link>
      <Link to="/about" className="text-gray-700 font-medium hover:text-academy-teal">
        About
      </Link>
      <Link to="/blog" className="text-gray-700 font-medium hover:text-academy-teal">
        Blog
      </Link>
      <Link to="/contact" className="text-gray-700 font-medium hover:text-academy-teal">
        Contact
      </Link>
    </>
  );

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/815cd29c-446f-40f0-b61d-5257a5640d0e.png"
              alt="The Ambitious Academy Logo"
              className="h-10 w-auto"
            />
            <span className="ml-3 text-xl font-bold text-gray-900">The Ambitious Academy</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLinks />

            <SignedOut>
              <SignInButton>
                <Button className="bg-academy-teal text-white hover:bg-academy-teal/90">
                  Enroll Now
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton />
                <SignOutButton>
                  <Button variant="outline">Sign Out</Button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <NavLinks />
          </div>

          <div className="pt-4 border-t">
            <SignedOut>
              <SignInButton>
                <Button className="w-full bg-academy-teal text-white hover:bg-academy-teal/90">
                  Enroll Now
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center justify-between mt-4">
                <UserButton />
                <SignOutButton>
                  <Button variant="outline">Sign Out</Button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
