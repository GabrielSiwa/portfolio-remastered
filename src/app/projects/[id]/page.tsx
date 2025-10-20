import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type ProjectData = {
  id: string;
  title: string;
  short?: string;
  description: string;
  image?: string;
  videoUrl?: string;
  repositoryUrl?: string;
  cta?: {
    label: string;
    url: string;
  };
  detailsUrl?: string;
  techStack: string[];
  problem: string;
  solution: string;
  date: string;
};

// Helper function to load projects
async function loadProjects(): Promise<ProjectData[]> {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/projects.json`,
    { cache: "no-store" }
  );
  return response.json();
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projectsData = await loadProjects();
  return projectsData.map((project: ProjectData) => ({
    id: project.id, // Use the short ID directly (pots, eyemo, studdy, coffee-mates)
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const projectsData = await loadProjects();
  const project = projectsData.find((p: ProjectData) => p.id === params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Find project by exact ID match
  const projectsData = await loadProjects();
  const project = projectsData.find((p: ProjectData) => p.id === params.id);

  if (!project) {
    notFound();
  }

  // Helper to check if video is Google Drive
  const isGoogleDriveVideo = project.videoUrl?.includes("drive.google.com");

  // Helper to get Google Drive embed URL
  const getGoogleDriveEmbedUrl = (url: string) => {
    try {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
    } catch {
      return url;
    }
    return url;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-galaxy-dark to-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-galaxy-text-accent hover:text-galaxy-text-accent/80 mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-galaxy-text-accent bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            {project.description}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Media Section */}
        {project.videoUrl && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
            {isGoogleDriveVideo ? (
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={getGoogleDriveEmbedUrl(project.videoUrl)}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`${project.title} demo video`}
                />
              </div>
            ) : project.videoUrl.startsWith("/") ? (
              <video
                src={project.videoUrl}
                controls
                className="w-full"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-gray-900 to-black p-12 text-center hover:from-gray-800 hover:to-gray-900 transition-all group"
              >
                <div className="space-y-4">
                  <div className="text-6xl group-hover:scale-110 transition-transform">
                    📹
                  </div>
                  <span className="text-xl group-hover:text-galaxy-text-accent transition-colors">
                    View Video Demo →
                  </span>
                </div>
              </a>
            )}
          </div>
        )}

        {project.image && !project.videoUrl && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
            <div className="relative w-full h-[400px] sm:h-[500px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-red-400 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              The Challenge
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {project.problem}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-950/30 to-green-900/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-green-400 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              The Solution
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">🛠️</span>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-full text-sm sm:text-base font-medium hover:border-blue-400 hover:scale-105 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          {project.cta && (
            <a
              href={project.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base"
            >
              {project.cta.label}
            </a>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg flex items-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View Source Code
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
