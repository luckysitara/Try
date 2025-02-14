import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <p>&copy; 2024 Precious Udoessien. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

