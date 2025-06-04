"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, FileText, Brain, Lock, Highlighter, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.user.createUser);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (user) {
      // Create or check user in the database
      const handleUser = async () => {
        try {
          const result = await createUser({
            userName: user?.fullName ?? "",
            email: user?.primaryEmailAddress?.emailAddress ?? "",
            imageUrl: user?.imageUrl ?? "",
          });
          
          // Redirect to dashboard
          router.push("/dashboard");
          
          // Show appropriate welcome toast based on whether user is new or existing
          if (result?.isNewUser) {
            // New user welcome message
            toast.success(`Hello, ${user.fullName || "User"}!`, {
              duration: 5000,
            });
          } else {
            // Existing user welcome back message
            toast.success(`Welcome back, ${user.fullName || "User"}!`, {
              duration: 5000,
            });
          }
        } catch (error) {
          console.error("Error handling user:", error);
          // Still redirect to dashboard even if there's an error
          router.push("/dashboard");
          toast.success(`Welcome, ${user.fullName || "User"}!`, {
            duration: 5000,
          });
        }
      };
      
      handleUser();
    }
  }, [user, createUser, router]);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If user is logged in, don't render the landing page content
  // The useEffect will handle the redirection
  if (user) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.PNG"
              alt="PDF Note Taker Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="font-bold text-xl">PDF Note Taker</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => router.push("/sign-in")} 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => router.push("/sign-up")} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Transform Your PDF Documents with AI-Powered Notes
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Upload PDFs, create notes, and leverage AI to analyze and extract insights from your documents. The intelligent assistant you need for research, study, and document management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => {
                router.push("/sign-up");
                toast.info("Let's get you started with PDF Note Taker!", {
                  description: "Create an account to unlock all features.",
                });
              }} 
              className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8"
            >
              Start for Free
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg py-6 px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-2/3 w-full  relative">
          <div className="relative w-full h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
            <Image
              src={'/landpage.png'}
              alt="PDF Note Taker Interface"
              fill
              style={{ objectFit: "cover", objectPosition: "center center" }}
              className="rounded-xl"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">PDF Upload & Management</h3>
              <p className="text-gray-600">
                Easily upload and organize your PDF documents in a secure cloud environment. Access your files from anywhere, anytime.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Highlighter className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rich Text Editor</h3>
              <p className="text-gray-600">
                Create beautifully formatted notes with our intuitive editor. Highlight, format, and organize your thoughts alongside your PDFs.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Leverage Google's Gemini AI to analyze your documents. Select text and get instant insights, summaries, and explanations.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contextual Queries</h3>
              <p className="text-gray-600">
                Ask questions about your document and receive accurate answers based on the content. The AI understands the context of your PDFs.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
              <p className="text-gray-600">
                Your data is protected with Clerk's enterprise-grade authentication system. Enjoy peace of mind with secure login and data protection.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vector Database</h3>
              <p className="text-gray-600">
                Our app uses advanced vector embeddings to understand your documents at a deeper level, enabling more accurate AI responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Upload Your PDF</h3>
              <p className="text-gray-600">
                Simply upload your PDF document to our secure platform. Our system will process and prepare it for analysis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Create Notes</h3>
              <p className="text-gray-600">
                Use our intuitive editor to create notes alongside your PDF. Format, highlight, and organize your thoughts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Ask AI Questions</h3>
              <p className="text-gray-600">
                Select text from your document and ask the AI for insights, explanations, or summaries. Get instant, accurate responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Document Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, students, and professionals who are enhancing their productivity with our AI-powered PDF Note Taker.
          </p>
          <Button 
            onClick={() => {
              router.push("/sign-up");
              toast.info("You're making a great choice!", {
                description: "Join our community of productive researchers and students.",
              });
            }} 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg py-6 px-10"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.PNG"
                  alt="PDF Note Taker Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="font-bold text-xl">PDF Note Taker</span>
              </div>
              <p className="mt-2 text-gray-400">Powered by Next.js, Convex, and Google Gemini</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PDF Note Taker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}