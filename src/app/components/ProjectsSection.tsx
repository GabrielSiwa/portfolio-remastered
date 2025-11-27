"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { Fade } from "react-awesome-reveal";

// Helper function to get local video URL
function getLocalVideoUrl(url: string): string | null {
  if (!url) return null;

  // Check if it's a local video file path (starts with / or is a relative path)
  if (
    url.startsWith("/") ||
    url.includes(".mp4") ||
    url.includes(".mov") ||
    url.includes(".webm")
  ) {
    return url;
  }

  return null;
}

// Detect Google Drive share links and build an embeddable preview URL
function getGoogleDrivePreviewUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    // Common Drive share formats:
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // https://drive.google.com/open?id=FILE_ID
    if (u.hostname.includes("drive.google.com")) {
      // try to extract /d/ID/
      const parts = u.pathname.split("/");
      const dIndex = parts.indexOf("d");
      if (dIndex >= 0 && parts.length > dIndex + 1) {
        const id = parts[dIndex + 1];
        return `https://drive.google.com/file/d/${id}/preview`;
      }

      // query param id
      const id = u.searchParams.get("id");
      if (id) return `https://drive.google.com/file/d/${id}/preview`;
    }
  } catch {
    return null;
  }
  return null;
}

type Project = {
  id: string;
  title: string;
  short?: string;
  description?: string;
  image?: string;
  demoUrl?: string;
  cta?: { label?: string; url?: string } | null;
  detailsUrl?: string;
  videoUrl?: string;
  techStack?: string[];
  repositoryUrl?: string; // Add repository URL field
};

async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch("/projects.json");
    const parsed = await response.json();
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: unknown) => {
      const item = p as Record<string, unknown>;
      return {
        id: String(item.id ?? ""),
        title: String(item.title ?? "Untitled Project"),
        short: String(item.short ?? item.description ?? ""),
        description: String(item.description ?? ""),
        image: String(item.image ?? ""),
        demoUrl: String(item.demoUrl ?? ""),
        detailsUrl: String(item.detailsUrl ?? ""),
        repositoryUrl: String(item.repositoryUrl ?? ""),
        videoUrl: String(
          item.videoUrl ||
            (item.cta && typeof item.cta === "object"
              ? (item.cta as Record<string, unknown>).url
              : "") ||
            ""
        ),
        techStack: Array.isArray(item.techStack)
          ? (item.techStack as string[])
          : [],
        cta:
          item.cta && typeof item.cta === "object"
            ? {
                label: String(
                  (item.cta as Record<string, unknown>).label ?? ""
                ),
                url: String((item.cta as Record<string, unknown>).url ?? ""),
              }
            : null,
      };
    });
  } catch {
    return [];
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="text-center">Loading projects...</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 relative">
      <Fade triggerOnce direction="up" fraction={0.3}>
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Featured Projects
        </h1>
      </Fade>

      {projects.length === 0 ? (
        <p className="text-center text-galaxy-text-muted">
          No projects found. Add entries to public/projects.json
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {projects.map((project, index) => {
            const localVideoUrl = getLocalVideoUrl(project.videoUrl || "");

            return (
              <Fade
                key={project.id}
                triggerOnce
                direction="up"
                delay={index * 100}
                fraction={0.2}
                className="h-full"
              >
                <article className="bg-white/5 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                  {localVideoUrl ? (
                    <div className="w-full h-72 relative group flex-shrink-0">
                      <video
                        src={localVideoUrl}
                        className="w-full h-full object-cover group-hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:opacity-0 [&::-webkit-media-controls]:transition-opacity [&::-webkit-media-controls]:duration-300"
                        muted
                        loop
                        controls
                        onMouseEnter={(e) => {
                          e.currentTarget.play();
                          e.currentTarget.muted = false;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.muted = true;
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    // Check for a Google Drive preview URL
                    (() => {
                      const drivePreview = getGoogleDrivePreviewUrl(
                        project.videoUrl || ""
                      );
                      if (drivePreview) {
                        return (
                          <div className="w-full h-72 relative flex-shrink-0">
                            <iframe
                              src={drivePreview}
                              title={`${project.title} demo`}
                              className="w-full h-full"
                              allow="autoplay; encrypted-media"
                            />
                          </div>
                        );
                      }

                      return project.image ? (
                        <div className="w-full h-72 relative flex-shrink-0">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-72 bg-gradient-to-br from-galaxy-cosmic to-galaxy-starfield flex items-center justify-center flex-shrink-0">
                          <div className="flex flex-wrap gap-2 justify-center p-4">
                            {(project.techStack ?? [])
                              .slice(0, 4)
                              .map((tech, i) => (
                                <div
                                  key={i}
                                  className="w-12 h-12 bg-galaxy-border/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                                >
                                  {/* Tech icon or first letter */}
                                  <span className="text-xs font-bold">
                                    {tech.slice(0, 2)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })()
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="text-3xl font-bold mb-3">{project.title}</h2>
                    <p className="text-lg text-galaxy-text-muted mb-4">
                      {project.short || project.description}
                    </p>

                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded bg-white/5 text-galaxy-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 mt-auto pt-4">
                      {/* More Details Button */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="px-5 py-2 border border-galaxy-text-accent text-galaxy-text-accent rounded hover:bg-galaxy-text-accent hover:text-galaxy-nebula transition-colors"
                      >
                        More Details
                      </Link>
                      {/* Demo/CTA Button */}
                      {project.cta?.url && !localVideoUrl ? (
                        <Link
                          href={project.cta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 galaxy-button rounded"
                        >
                          {project.cta.label || "View Demo"}
                        </Link>
                      ) : project.demoUrl ? (
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 galaxy-button rounded"
                        >
                          Live Demo
                        </Link>
                      ) : null}

                      {/* GitHub Repository Button */}
                      {project.repositoryUrl && (
                        <Link
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 border border-gray-500 text-gray-300 rounded hover:bg-gray-500 hover:text-white transition-colors flex items-center gap-2"
                          title="View Repository"
                        >
                          <Github size={16} />
                          <span className="hidden sm:inline">Repository</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </Fade>
            );
          })}
        </div>
      )}
    </main>
  );
}
