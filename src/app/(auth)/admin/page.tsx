"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Mail,
  Home,
  Plus,
  Edit,
  Eye,
  Settings,
} from "lucide-react";
import type { Project, AboutContent, ContactInfo } from "@/app/lib/types";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "overview", name: "Overview", icon: Home },
    { id: "projects", name: "Projects", icon: FolderOpen },
    { id: "content", name: "Content", icon: Edit },
    { id: "contact", name: "Contact", icon: Mail },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch projects
      const projectsResponse = await fetch("/api/projects");
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      }

      // Fetch about content
      const aboutResponse = await fetch("/api/content/about");
      if (aboutResponse.ok) {
        const aboutData = await aboutResponse.json();
        setAboutContent(aboutData);
      }

      // Fetch contact info
      const contactResponse = await fetch("/api/content/contact");
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        setContactInfo(contactData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickStats = () => {
    const stats = [
      {
        label: "Total Projects",
        value: projects.length,
        color: "text-galaxy-plasma",
      },
      {
        label: "Featured",
        value: projects.filter((p) => p.featured).length,
        color: "text-galaxy-aurora",
      },
      {
        label: "Completed",
        value: projects.filter((p) => p.status === "completed").length,
        color: "text-galaxy-stardust",
      },
      {
        label: "In Progress",
        value: projects.filter((p) => p.status === "in-progress").length,
        color: "text-galaxy-moonbeam",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="galaxy-card"
          >
            <div className="text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-galaxy-text-muted text-sm">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const ProjectsOverview = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-galaxy-text-primary">
          Recent Projects
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("projects")}
          className="galaxy-button flex items-center space-x-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </motion.button>
      </div>

      <div className="space-y-3">
        {projects.slice(0, 5).map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="galaxy-card flex items-center justify-between"
          >
            <div>
              <h4 className="text-galaxy-text-primary font-medium">
                {project.title}
              </h4>
              <p className="text-galaxy-text-muted text-sm">
                {project.description.slice(0, 60)}...
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    project.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : project.status === "in-progress"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
                {project.featured && (
                  <span className="px-2 py-1 rounded text-xs bg-galaxy-plasma/20 text-galaxy-plasma">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-galaxy-cosmic border border-galaxy-border rounded text-galaxy-text-primary"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-xs text-galaxy-text-muted">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-galaxy-cosmic border border-galaxy-border hover:bg-galaxy-starfield transition-colors"
                title="View Project"
              >
                <Eye className="w-4 h-4 text-galaxy-text-accent" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-galaxy-cosmic border border-galaxy-border hover:bg-galaxy-starfield transition-colors"
                title="Edit Project"
              >
                <Edit className="w-4 h-4 text-galaxy-text-accent" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ContentOverview = () => (
    <div className="space-y-6">
      {/* About Content Preview */}
      {aboutContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="galaxy-card"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-galaxy-text-primary">
              About Section
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("content")}
              className="p-2 rounded-lg bg-galaxy-cosmic border border-galaxy-border hover:bg-galaxy-starfield transition-colors"
            >
              <Edit className="w-4 h-4 text-galaxy-text-accent" />
            </motion.button>
          </div>
          <div>
            <h4 className="text-galaxy-text-primary font-medium">
              {aboutContent.title}
            </h4>
            <p className="text-galaxy-text-muted text-sm">
              {aboutContent.subtitle}
            </p>
            <p className="text-galaxy-text-muted text-sm mt-2">
              {aboutContent.description.slice(0, 100)}...
            </p>
            <div className="mt-3">
              <span className="text-xs text-galaxy-text-muted">
                Skills: {aboutContent.skills.slice(0, 3).join(", ")}
                {aboutContent.skills.length > 3 &&
                  ` +${aboutContent.skills.length - 3} more`}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Contact Info Preview */}
      {contactInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="galaxy-card"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-galaxy-text-primary">
              Contact Information
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("contact")}
              className="p-2 rounded-lg bg-galaxy-cosmic border border-galaxy-border hover:bg-galaxy-starfield transition-colors"
            >
              <Edit className="w-4 h-4 text-galaxy-text-accent" />
            </motion.button>
          </div>
          <div className="space-y-2">
            <p className="text-galaxy-text-primary">
              <span className="text-galaxy-text-muted">Email:</span>{" "}
              {contactInfo.email}
            </p>
            {contactInfo.phone && (
              <p className="text-galaxy-text-primary">
                <span className="text-galaxy-text-muted">Phone:</span>{" "}
                {contactInfo.phone}
              </p>
            )}
            <p className="text-galaxy-text-primary">
              <span className="text-galaxy-text-muted">Location:</span>{" "}
              {contactInfo.location}
            </p>
            <div className="flex space-x-2 mt-3">
              {contactInfo.socialLinks.linkedin && (
                <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                  LinkedIn
                </span>
              )}
              {contactInfo.socialLinks.github && (
                <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded">
                  GitHub
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <QuickStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProjectsOverview />
              <ContentOverview />
            </div>
          </div>
        );
      case "projects":
        return <ProjectsManager />;
      case "content":
        return <ContentManager />;
      case "contact":
        return <ContactManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <div>Tab content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-galaxy-void pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-galaxy-text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-galaxy-text-muted">
            Manage your portfolio content and projects
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-galaxy-cosmic rounded-lg p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-galaxy-plasma text-galaxy-text-primary shadow-lg"
                  : "text-galaxy-text-muted hover:text-galaxy-text-primary hover:bg-galaxy-starfield"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-plasma"></div>
            </div>
          ) : (
            renderTabContent()
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Placeholder components - we'll build these next
const ProjectsManager = () => (
  <div className="galaxy-card">
    <h2 className="text-xl font-semibold text-galaxy-text-primary mb-4">
      Projects Manager
    </h2>
    <p className="text-galaxy-text-muted">
      Full project management interface coming next!
    </p>
  </div>
);

const ContentManager = () => (
  <div className="galaxy-card">
    <h2 className="text-xl font-semibold text-galaxy-text-primary mb-4">
      Content Manager
    </h2>
    <p className="text-galaxy-text-muted">
      Edit hero section, about content, and more!
    </p>
  </div>
);

const ContactManager = () => (
  <div className="galaxy-card">
    <h2 className="text-xl font-semibold text-galaxy-text-primary mb-4">
      Contact Manager
    </h2>
    <p className="text-galaxy-text-muted">
      Manage contact information and social links!
    </p>
  </div>
);

const SettingsManager = () => (
  <div className="galaxy-card">
    <h2 className="text-xl font-semibold text-galaxy-text-primary mb-4">
      Settings
    </h2>
    <p className="text-galaxy-text-muted">
      Admin preferences and configuration!
    </p>
  </div>
);

export default Admin;
