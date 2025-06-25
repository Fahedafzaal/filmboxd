import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import { Box, Typography } from "@mui/material"

// Dropdown component for authenticated users
const UserDropdown = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const dropdownItems = [
    { id: "1", name: "Home", link: "/" },
    { id: "2", name: "Films", link: "/films" },
    { id: "3", name: "Members", link: "/members" },
    { id: "4", name: "Reviews", link: "/reviews" },
  ]

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setShowDropdown(true)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setShowDropdown(false)
    }, 150) // Small delay to prevent accidental closing
    setTimeoutId(id)
  }

  return (
    <div className="relative">
      {/* User trigger */}
      <div
        className="flex items-center space-x-2 cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
          <span className="text-xs font-bold text-white">{user.username[0].toUpperCase()}</span>
        </div>
        <Link 
          to={`/profile/${user.id}`}
          className="text-sm font-bold text-brand-text hover:text-white uppercase tracking-wider"
        >
          {user.username}
        </Link>
        <svg 
          className={`w-3 h-3 text-brand-text group-hover:text-white transition-all duration-200 ${showDropdown ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <div
          className="absolute top-full right-0 mt-1 w-48 bg-brand-bg-secondary border border-brand-border rounded-sm shadow-lg z-50 animate-in fade-in duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-2">
            {/* Profile section */}
            <div className="px-4 py-2 border-b border-brand-border">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{user.username[0].toUpperCase()}</span>
                </div>
                <Link 
                  to={`/profile/${user.id}`}
                  className="text-xs font-bold text-white uppercase tracking-wider hover:text-brand-accent"
                >
                  {user.username}
                </Link>
              </div>
            </div>

            {/* Profile link */}
            <Link 
              to={`/profile/${user.id}`}
              className="block px-4 py-2 text-xs text-brand-text hover:text-white hover:bg-brand-accent/10 transition-all duration-150"
            >
              Profile
            </Link>

            {/* Navigation items */}
            {dropdownItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="block px-4 py-2 text-xs text-brand-text hover:text-white hover:bg-brand-accent/10 transition-all duration-150"
              >
                {item.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-brand-border my-1"></div>

            {/* Settings */}
            <Link 
              to="/settings"
              className="block px-4 py-2 text-xs text-brand-text hover:text-white hover:bg-brand-accent/10 transition-all duration-150"
            >
              Settings
            </Link>

            {/* Sign out */}
            <button 
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile dropdown component
const MobileDropdown = ({ user, onLogout, isOpen, onToggle }) => {
  const dropdownRef = useRef()
  const buttonRef = useRef()

  const dropdownItems = [
    { id: "1", name: "Home", link: "/" },
    { id: "2", name: "Films", link: "/films" },
    { id: "3", name: "Members", link: "/members" },
    { id: "4", name: "Reviews", link: "/reviews" },
  ]

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onToggle()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onToggle])

  return (
    <>
      {/* Mobile menu button */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="md:hidden p-2 text-brand-text hover:text-white transition-colors"
        aria-label="Toggle mobile menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-brand-bg-secondary border-b border-brand-border md:hidden z-50 shadow-lg"
        >
          <div className="px-4 py-2">
            {/* User info */}
            <div className="flex items-center space-x-3 py-3 border-b border-brand-border">
              <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center">
                <span className="text-sm font-bold text-white">{user.username[0].toUpperCase()}</span>
              </div>
              <div>
                <Link 
                  to={`/profile/${user.id}`}
                  className="text-sm font-bold text-white uppercase tracking-wider"
                  onClick={onToggle}
                >
                  {user.username}
                </Link>
              </div>
            </div>

            {/* Navigation items */}
            <div className="py-2">
              <Link 
                to={`/profile/${user.id}`}
                className="block py-2 text-sm text-brand-text hover:text-white transition-colors"
                onClick={onToggle}
              >
                Profile
              </Link>
              {dropdownItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="block py-2 text-sm text-brand-text hover:text-white transition-colors"
                  onClick={onToggle}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/settings"
                className="block py-2 text-sm text-brand-text hover:text-white transition-colors"
                onClick={onToggle}
              >
                Settings
              </Link>
              <button 
                onClick={() => {
                  onLogout()
                  onToggle()
                }}
                className="block w-full text-left py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMobileMenuOpen(false)
  }

  const menuLinks = [
    { id: 1, name: "FILMS", href: "/films" },
    { id: 2, name: "LISTS", href: "/lists" },
    { id: 3, name: "MEMBERS", href: "/members" },
    { id: 4, name: "JOURNAL", href: "/journal" },
  ]

  return (
    <nav className={`w-full z-20 h-[72px] border-b border-brand-border relative ${user ? 'bg-brand-nav-auth' : 'bg-brand-bg'}`}>
      <div className="max-w-4xl mx-auto flex h-full items-center justify-between px-4">
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', gap: 0.5, mr: 1 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: 'secondary.main', borderRadius: '50%' }} />
              <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%' }} />
              <Box sx={{ width: 12, height: 12, bgcolor: '#3b82f6', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', letterSpacing: 2 }}>
              Filmboxd
            </Typography>
          </Link>
        </Box>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {user ? (
              // --- AUTHENTICATED NAV ---
              <>
                {menuLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      to={link.href} 
                      className="text-xs font-bold text-brand-text hover:text-white transition-colors tracking-wider"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li className="ml-4">
                  <UserDropdown user={user} onLogout={handleLogout} />
                </li>
              </>
            ) : (
              // --- NON-AUTHENTICATED NAV ---
              <>
                <li><Link to="/login" className="text-sm font-semibold text-brand-text hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-sm font-semibold text-brand-text hover:text-white transition-colors">Create Account</Link></li>
                {menuLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      to={link.href} 
                      className="text-xs font-bold text-brand-text hover:text-white transition-colors tracking-wider"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>
        
        {/* Search Form */}
        <form className="relative flex items-center">
          <input
            type="text"
            placeholder="Search films..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-brand-bg-secondary h-8 w-40 rounded-full pl-4 pr-10 text-sm text-brand-text-bright placeholder-brand-text-dark focus:outline-none focus:ring-2 focus:ring-brand-action"
          />
          {/* Search Icon */}
          <svg className="absolute right-3 h-4 w-4 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* Mobile Menu */}
        {user && (
          <MobileDropdown 
            user={user} 
            onLogout={handleLogout} 
            isOpen={isMobileMenuOpen} 
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        )}
      </div>
    </nav>
  )
}
